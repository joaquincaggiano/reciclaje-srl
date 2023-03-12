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

// interface MyFileResponse {
//   fields: string;
//   files: File[];
//   imagesPath: string[]
// }

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  // const [imageName, setImageName] = useState<string>("");

  useEffect(() => {
    if (getValues("title") !== undefined) {
      // const productName = getValues("title").replace(" ", "-").toLowerCase();
      // setImageName(`product/${productName}/${Date.now()}`);
      setImagePreview([...getValues("images")]);
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

  //////////////////////PRUEBA DE SUBIR ARCHIVOS MULTIPLES//////////////////

  const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No se han seleccionado archivos");
      return;
    }

    try {
      const urls: string[] = [];
      const formData = new FormData();

      formData.append(
        "productName",
        `product/${getValues("title")
          .replaceAll(" ", "-")
          .toLowerCase()}/${Date.now()}`
      );

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`images`, e.target.files[i]);
        urls.push(URL.createObjectURL(e.target.files[i]));
        const response = await axios.post("/api/admin/uploadPrueba", formData);
        console.log("response", response);
      }
      setImagePreview((current) => [...current, ...urls]);
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  // const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
  //   // para tener en cuenta: capaz hay que borrar la imagen que se suba al formdata si apretamos en el boton de borrar de la imagen

  //   if (!e.target.files || e.target.files.length === 0) {
  //     // todo: make a new throw error
  //     console.error("No se han seleccionado archivos");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     const urls: string[] = [];
  //     formData.append(
  //       "productName",
  //       getValues("title").replaceAll(" ", "-").toLowerCase()
  //     );

  //     for (let i = 0; i < e.target.files.length; i++) {
  //       formData.append(`images${i}`, e.target.files[i]);
  //       urls.push(URL.createObjectURL(e.target.files[i]));
  //     }

  //     setImagePreview((current) => [...current, ...urls]);

  //     const response = await axios.post("/api/admin/upload", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (response) {
  //       setFile(response);
  //       console.log("Imágenes cargadas exitosamente", response);
  //     } else {
  //       console.error("Error al cargar las imágenes");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("title", e.target.value, { shouldValidate: true });
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
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
    setImagePreview(imagePreview.filter((img) => img !== image));
  };

  // const uploadFile = async () => {
  //   try {
  //     for (const key in file.data.files) {
  //       // console.log("Un File en Upload", file?.data.files[key])
  //       let { data } = await axios.post("/api/s3/uploadFile", {
  //         data: file?.data.files[key],
  //         name: `product/${file?.data.fields.productName}/${file?.data.files[key].newFilename}`,
  //       });
  //       console.log("DATA DEL UPLOADFILE FUNCTION", data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const eachFile = file.data.files.map(async (oneFile: File, i: number) => {
  //   //aca falta un método o algo, esta raro
  //   let { data } = await axios.post("/api/s3/uploadFile", {
  //     data: oneFile,
  //     name: file.data.imagesPath[i],
  //   });
  //   console.log(data);
  // });
  // eachFile();

  // const url = data.url;
  // let { data: newData } = await axios.put(url, file, {
  //   headers: {
  //     "Content-type": file?.type,
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // });
  // setFile(null);
  // };

  const onSubmit = async (form: FormData) => {
    // const currentImages = getValues("images");
    // const imagesPaths = file.data.imagesPath.map(
    //   (path: string) => BUCKET_URL + path
    // );

    // setValue("images", [...currentImages, ...imagesPaths], {
    //   shouldValidate: true,
    // });

    if (form.images.length < 1) return;
    setIsSaving(true);
    try {
      const { data } = await axios({
        url: "/api/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      // uploadFile();
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
                  // name="images"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => selectFile(e)}
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

              {imagePreview.length === 0 && (
                <Chip
                  label="Es necesario al menos 1 imagen"
                  color="error"
                  variant="outlined"
                  sx={{
                    display: imagePreview.length < 1 ? "flex" : "none",
                  }}
                />
              )}

              {imagePreview && (
                <Grid container spacing={2}>
                  {imagePreview.map((img) => {
                    return (
                      <Grid item xs={4} sm={3} key={img}>
                        <Card>
                          <CardMedia
                            component="img"
                            className="fadeIn"
                            image={img}
                            alt={"sds"}
                          />

                          <CardActions>
                            <Button
                              fullWidth
                              color="error"
                              onClick={() => onDeleteImage(img)}
                              // onClick={() => setFile(null)}
                            >
                              Borrar
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
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
