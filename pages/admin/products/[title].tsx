import { ChangeEvent, FC, useRef, useState } from "react";
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
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  
  const BUCKET_URL = "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/";
  
  const router = useRouter();
  console.log(router.asPath);

  // const fileInputRef = useRef<HTMLInputElement>(null);
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files){ return };
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");
    const imageName = "product/" + product._id;

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

    setUploadedFile(BUCKET_URL + imageName);
    setFile(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: product });

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

  // const onFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     return;
  //   }

  //   try {
  //     for (const file of e.target.files) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const { data } = await axios.post<{ message: string }>(
  //         "/api/admin/upload",
  //         formData
  //       );
  //       setValue("images", [...getValues("images"), data.message], {
  //         shouldValidate: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onDeleteImage = (image: string) => {
  //   setValue(
  //     "images",
  //     getValues("images").filter((img) => img !== image),
  //     { shouldValidate: true }
  //   );
  // };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return;

    setIsSaving(true);

    try {
      const { data } = await axios({
        url: "/api/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

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
                // ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={ {marginBottom: "20px"}
                  // { display: "none" }
                }
               
                onChange={(e)=> selectFile(e)}
              />
              
              {file && 
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3, color: "white", backgroundColor: "#4caf50" }}
              onClick={uploadFile}
              >
                Cargar imagen
              </Button>
              }
              </FormGroup>
        {/* {uploadingStatus && <p>{uploadingStatus}</p>}
        {uploadedFile && <img src={uploadedFile} />} */}

              <Chip
                label="Es necesario al menos 1 imagen"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues("images").length < 1 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
    tempProduct.images = ["img1.jpg"];
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
// function setUploadingStatus(arg0: string) {
//   throw new Error("Function not implemented.");
// }

