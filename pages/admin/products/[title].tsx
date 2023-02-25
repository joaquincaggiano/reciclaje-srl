import { ChangeEvent, useEffect, FC, useRef, useState } from "react";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";

import { MainLayout } from "../../../components/layouts";
import { IProductSchema } from "../../../interfaces";

import { dbProducts } from "@/database";

import { useForm } from "react-hook-form";

import axios from "axios";

import {
  BorderColorOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
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

interface Props {
  product: IProductSchema;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  // const [file, setFile] = useState<File | null>();
  const [file, setFile] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string[]>([""]);
  const [imageName, setImageName] = useState<string>("");

  useEffect(() => {
    if (getValues("title") !== undefined) {
      const productName = getValues("title").replaceAll(" ", "-").toLowerCase();
      setImageName(`product/${productName}/${Date.now()}`);
      setImagePreview([...getValues("images")])
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: product });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const BUCKET_URL = "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/";

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("E TARGET FILES", e.target.files)
    if (!e?.target.files) {
      return;
    }

    // toFix: Si subis dos imagenes a la vez se suben con el mismo path
    try {
      let arrayDeFiles = []
      for (let i = 0; i < e.target.files.length; i++) {
        // let fileIteration = e.target.files.item(i)
        console.log("ONE FILE",e.target.files[i])
        arrayDeFiles.push(e.target.files[i])
        // setImagePreview(URL.createObjectURL(e.target.files[i]));
        setFile(arrayDeFiles);
      }

      const urls = arrayDeFiles.map(oneFile => {
        return URL.createObjectURL(oneFile)
      })
      console.log("URLS", urls)
      setImagePreview([...imagePreview, ...urls])

    } catch (error) {
      console.log(error)
    }
    // setFile(e.target.files[0]);
    // setImagePreview(URL.createObjectURL(e.target.files[0]));
    // setValue("images", [...getValues("images"), BUCKET_URL + imageName], {
    //   shouldValidate: true,
    // });
  };

  // console.log("FILE", file)
  console.log("getValues", getValues("images"))
  console.log("imagepreview", imagePreview)

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("title", e.target.value, { shouldValidate: true });
    const productName = e.target.value.replaceAll(" ", "-").toLowerCase();
    setImageName(`product/${productName}/${Date.now()}`);
  };

  const onChangeColor = (color: string) => {
    const currentColors = getValues("colors");

    if (currentColors.includes(color)) {
      return setValue(
        "colors",
        currentColors.filter((c) => c !== color),
        { shouldValidate: true }
      );
    }
    setValue("colors", [...currentColors, color], { shouldValidate: true });
  };

  const onDeleteImage = (image: string) => {
    setImagePreview(imagePreview.filter((img) => img !== image))
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
    setFile(null);
  };

  const uploadFile = async () => {
    let { data } = await axios.post("/api/s3/uploadFile", {
      name: imageName,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setFile(null);
  };

  const onSubmit = async (form: FormData) => {
    
    if (form.images.length < 1) return;
    setIsSaving(true);
    setValue("images", [...getValues("images"), BUCKET_URL + imageName], {
      shouldValidate: true,
    });
    try {
      const { data } = await axios({
        url: "/api/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      uploadFile();
      router.replace("/admin/products");
      if (!form._id) {
        router.replace(`/admin/products/${form.title}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <MainLayout
      title={product.title}
      metaHeader={
        router.asPath === "/admin/products/new"
          ? "Crear producto"
          : "Editar producto"
      }
    >
      {router.asPath === "/admin/products/new" ? (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Crear Producto
          </Typography>
          <BorderColorOutlined />
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Editar Producto
          </Typography>
          <BorderColorOutlined />
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px", color: "white", backgroundColor: "#4caf50" }}
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
                value={getValues("category")}
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
                    <Checkbox checked={getValues("colors").includes(color)} />
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
                  name="images"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  // onChange={(e) => selectFile(e)}
                  onChange={selectFile}
                />

                <Button
                  color="secondary"
                  fullWidth
                  startIcon={<UploadOutlined />}
                  sx={{ mb: 3, color: "white", backgroundColor: "#4caf50" }}
                  // onClick={uploadFile}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Cargar imagen
                </Button>
              </FormGroup>

              {
              // !imagePreview ||
                imagePreview.length === 0 && (
                  <Chip
                    label="Es necesario al menos 1 imagen"
                    color="error"
                    variant="outlined"
                    sx={{
                      display: getValues("images").length < 1 ? "flex" : "none",
                    }}
                  />
                )}

              {/*imagePreview ||*/
                (imagePreview.length !== 0 && (
                  <Grid container spacing={2}>
                    {imagePreview.map((img, i) => {
                      // console.log("IMG", img)
                      return (
                        <Grid item xs={4} sm={3} key={i}>
                          <Card>
                            <CardMedia
                              component="img"
                              className="fadeIn"
                              image={img}
                              alt={img}
                            />

                            <CardActions>
                              <Button
                                fullWidth
                                color="error"
                                onClick={() => onDeleteImage(img)}
                                sx={{'&:hover': {backgroundColor: "#d32f2f", color: "#ffff"}}}
                              >
                                Borrar
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
            </Box>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { title = "" } = query;

  let product: IProductSchema | null;

  if (title === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    // tempProduct.images = ["img1.jpg"];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductByTitle(title.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
