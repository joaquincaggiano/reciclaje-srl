import {
  ChangeEvent,
  useEffect,
  FC,
  useRef,
  useState,
  useContext,
} from "react";
import { GetStaticProps } from "next";
import {GetStaticPaths} from 'next'
import dynamic from 'next/dynamic';


import { UiContext } from "@/context/ui";

import { useRouter } from "next/router";

import { IProductSchema } from "../../../interfaces";

import { dbAllProductsByTitle, dbProducts } from "@/database";

import { useForm } from "react-hook-form";

import axios from "axios";

import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";

import {capitalize} from "@mui/material/utils";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import  Chip  from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import  Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
import  Divider  from "@mui/material/Divider";
import  CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import FormLabel from "@mui/material/FormLabel";

import {MainLayout} from '../../../components/layouts'

const DynamicMainLayout = dynamic(() =>
  import("../../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicModalCancelChanges = dynamic(() =>
  import("../../../components/admin/ModalCancelChanges").then((mod) => mod.ModalCancelChanges)
);

import { Product } from "@/models";

const validCategories = ["Polietileno", "Molienda"];
const validColors = [
  "Blanco",
  "Gris",
  "Negro",
  "Transparente",
  "Caramelo",
  "Amarillo",
  "Verde",
  "Azul",
  "Rojo",
];

interface FormData {
  _id?: string;
  title: string;
  images: string[];
  colors: string[];
  category: string;
}

const NewProductPage: FC = () => {
  const router = useRouter();
  const { toggleModalCancelChange } = useContext(UiContext);

  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [stateUrl, setStateUrl] = useState<string>("");

  const s3URL = "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/"

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const message = "no te vayas plis";

    const routeChangeStart = (url: string) => {
      setStateUrl(url);
      if (router.asPath !== url && unsavedChanges) {
        toggleModalCancelChange();
        throw "Abort route change. Please ignore this error.";
      }
    };

    const beforeunload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        toggleModalCancelChange();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", beforeunload);
    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      router.events.off("routeChangeStart", routeChangeStart);
    };
   
  }, [unsavedChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No se han seleccionado archivos");
      return;
    }

    try {
      const formData = new FormData();

      if(getValues("title")) {
        formData.append(
          "type",
          `products/${getValues("title").replaceAll(" ", "-").toLowerCase()}`
        );
      }
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`images`, e.target.files[i]);
        const { data } = await axios.post("/api/admin/upload", formData);

        const imageKitURL = data.url.replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/products/", "https://ik.imagekit.io/e2ouoknyw/ProductTodoRec/");
        
        if(!getValues("images")) {
          setValue("images", [imageKitURL], {
            shouldValidate: true,
          });
        } else{
          setValue("images", [...getValues("images"), imageKitURL], {
            shouldValidate: true,
          });
        }
        setUnsavedChanges(true);
      }
    } catch (error) {
      console.log("error en catch selectFiles", error);
    }
  };

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("title", e.target.value, { shouldValidate: true });
// console.log("getvaluestitle", getValues("title"))
    // if (getValues("title")) {
    //   setUnsavedChanges(false);
    // } else {
    //   setUnsavedChanges(true);
    // }
  };

  const onChangeColor = (color: string) => {
    const currentColors = getValues("colors");
    if(!currentColors){
      setValue("colors", [color], { shouldValidate: true });  
    }else {
      setValue("colors", [...currentColors, color], { shouldValidate: true });  
      
      if (currentColors?.includes(color)) {
      setValue(
        "colors",
        currentColors.filter((c) => c !== color),
        { shouldValidate: true }
      );
      }
    }
  };

  const onDeleteImage = async (image: string) => {
    const imageName = image.replace(
      "https://ik.imagekit.io/e2ouoknyw/ProductTodoRec/",
      "products/"
    );
    
    await axios.post("/api/admin/deleteImageFromS3", {
      key: imageName,
    });
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
    console.log("images de getValues despues del delete", getValues("images"))
  };

  const deleteUnsavedChanges = async () => {
    try {
      setUnsavedChanges(false);
      const productName = getValues("title").replaceAll(" ", "-").toLowerCase();

      const { data } = await axios.post("/api/admin/getFiles", {
        name: productName,
        type: "products"
      });

      // const imagesInDB = product.images.map((oneImage) => {
      //   return oneImage.replace(s3URL, "");
      // });

      // const imagesInS3 = data.objects.filter(
      //   (img: string) => !imagesInDB.includes(img)
      // );

      await data.objects.map((eachImage: string) => {
        axios.post("/api/admin/deleteImageFromS3", {
          key: eachImage,
        });
      });

      router.push(stateUrl || "/");

      toggleModalCancelChange();
    } catch (error) {
      console.log("ALGO SALIÓ MAL");
      throw new Error("No se pudieron borrar las imagenes");
    }
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return;
    setIsSaving(true);
    try {
      setUnsavedChanges(false);
      const { data } = await axios({
        url: "/api/admin/products",
        method: "POST",
        data: form,
      });
      router.replace("/admin/products");
      
      setIsSaving(false);
     
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <MainLayout
      title="new"
      metaHeader={
      "Crear Producto"
      }
    >
      {/*//@ts-ignore*/}
      <DynamicModalCancelChanges deleteUnsavedChanges={deleteUnsavedChanges} />
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Crear Producto
          </Typography>
          <BorderColorOutlined />
        </Box>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px", color: "white", backgroundColor: "#008f39" }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
              onChange={(e) => handleTitleChange(e)}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Categoría</FormLabel>
              <RadioGroup
                row
                defaultValue="Polietileno"
                onChange={(e) =>
                  setValue("category", e.target.value, { shouldValidate: true })
                }
              >
                {validCategories.map((category) => (
                  <FormControlLabel
                    key={category}
                    value={category}
                    control={<Radio color="secondary" />}
                    label={capitalize(category)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Colores</FormLabel>
              {validColors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox />
                  }
                  label={color}
                  onChange={() => onChangeColor(color)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Imagenes */}
          <Grid item xs={12} sm={6}>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormGroup>
                <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => selectFile(e)}
                />

                <Button
                  color="secondary"
                  fullWidth
                  startIcon={<UploadOutlined />}
                  sx={{ mb: 3, color: "white", backgroundColor: "#008f39" }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={
                    getValues("title")?.trim().length === 0 ? true : false
                  }
                >
                  Cargar imagen
                </Button>
              </FormGroup>

              <Chip
                label="Es necesario al menos 1 imagen"
                color="error"
                variant="outlined"
                sx={{
                  display: !getValues("images") || getValues("images").length === 0 ? "flex" : "none",
                }}
              />
              <Chip
                label="Es necesario incluir un título para subir una imagen"
                color="error"
                variant="outlined"
                sx={{
                  display:
                    !getValues("title") ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {getValues("images")?.map((img) => {
                  return (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia
                          component="img"
                          className="fadeIn"
                          image={img}
                          alt={"Product Image"}
                        />

                        <CardActions>
                          <Button
                            fullWidth
                            color="error"
                            onClick={() => onDeleteImage(img)}
                          >
                            Borrar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};

export default NewProductPage;
