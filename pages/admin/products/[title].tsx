import {
  useEffect,
  FC,
  useRef,
  useState,
  useContext,
} from "react";
import { GetServerSideProps } from "next";

import { UiContext } from "@/context/ui";

import { useRouter } from "next/router";

import { MainLayout } from "../../../components/layouts";
import { IProductSchema } from "../../../interfaces";

import { dbProducts } from "@/database";

import { ModalCancelChanges } from "@/components/admin/ModalCancelChanges";

import useFormHook from "@/hooks/useFormHook";

import axios from "axios";

import {
  BorderColorOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {Box,	Button,	capitalize,	Card,	CardActions,	CardMedia,	Checkbox,	Chip,	Divider,	FormControl,	FormControlLabel,	FormGroup,	FormLabel,	Grid,	Radio,	RadioGroup,	TextField,	Typography} from '@mui/material';
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
	const { toggleModalCancelChange } =
		useContext(UiContext);

  const [	handleSubmit,
		register,
    errors,
		setValue,
		getValues,
    unsavedChanges,
    setUnsavedChanges, 
    handleTitleChange,
    isSaving,
    deleteUnsavedChanges,
    onChangeColor,
    onDeleteImage,
    selectFile,
    stateUrl] = useFormHook(product)
// const form = new FormData;
// console.log("TYPE OF GET VALUES", getValues("colors"))

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const message = "no te vayas plis";

  //   const routeChangeStart = (url: string) => {
  //     //@ts-ignore
  //     setStateUrl(url);
  //     if (router.asPath !== url && unsavedChanges) {
  //       toggleModalCancelChange();
  //       throw "Abort route change. Please ignore this error.";
  //     }
  //   };

  //   const beforeunload = (e: BeforeUnloadEvent) => {
  //     if (unsavedChanges) {
  //       e.preventDefault();
  //       toggleModalCancelChange();
  //       e.returnValue = message;
  //       return message;
  //     }
  //   };

  //   window.addEventListener("beforeunload", beforeunload);
  //   router.events.on("routeChangeStart", routeChangeStart);

  //   return () => {
  //     window.removeEventListener("beforeunload", beforeunload);
  //     router.events.off("routeChangeStart", routeChangeStart);
  //   };
  // }, [unsavedChanges]);

  return (
    <MainLayout
      title={product.title}
      metaHeader={
        router.asPath === "/admin/products/new"
          ? "Crear producto"
          : "Editar producto"
      }
    >
      {/*//@ts-ignore*/}
      <ModalCancelChanges props={product}/>

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
      
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit()}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px", color: "white", backgroundColor: "#4caf50" }}
            type="submit"
            /* @ts-ignore */
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
              /* @ts-ignore */
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              /* @ts-ignore */
              error={!!errors.title}
              /* @ts-ignore */
              helperText={errors.title?.message}
              /* @ts-ignore */
              onChange={(e) => handleTitleChange(e)}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Categoría</FormLabel>
              <RadioGroup
                row
                /*@ts-ignore*/
                value={getValues("category")}
                onChange={(e) =>
                /*@ts-ignore*/
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
                /*@ts-ignore*/
                    <Checkbox checked={getValues("colors").includes(color)} />
                  }
                  label={color}
                /*@ts-ignore*/
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
                  //@ts-ignore
                  onChange={(e) => selectFile(e)}
                />

                <Button
                  color="secondary"
                  fullWidth
                  startIcon={<UploadOutlined />}
                  sx={{ mb: 3, color: "white", backgroundColor: "#4caf50" }}
                  
                  onClick={() => fileInputRef.current?.click()}
                >
                  Cargar imagen
                </Button>
              </FormGroup>

              <Chip
                label="Es necesario al menos 1 imagen"
                color="error"
                variant="outlined"
                sx={{
                /*@ts-ignore*/
                  display: getValues("images").length < 1 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
              {/*@ts-ignore*/}
                {getValues("images").map((img) => {
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
                /*@ts-ignore*/
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { title = "" } = query;

  let product: IProductSchema | null;

  if (title === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
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
