import { ChangeEvent, FC, useRef, useState } from "react";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";

import { MainLayout } from "../../../components/layouts";
import { IServiceSchema } from "../../../interfaces";
import { Service } from "@/models";

import { dbServices } from "@/database";

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

interface FormData {
  _id?: string;
  title: string;
  images: string[];
  description: string;
}

interface Props {
  service: IServiceSchema;
}

const ServiceAdminPage: FC<Props> = ({ service }) => {
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  // const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: service });

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
        url: "/api/admin/services",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      if (!form._id) {
        router.replace(`/admin/services/${form.title}`);
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
      title={service.title}
      metaHeader={
        router.asPath === "/admin/services/new"
          ? "Crear servicio"
          : "Editar servicio"
      }
    >
      {router.asPath === "/admin/services/new" ? (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Crear servicio
          </Typography>
          <BorderColorOutlined />
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Editar servicio
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

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            {/* <Divider sx={{ my: 1 }} /> */}

          </Grid>

          {/* Imagenes */}
          <Grid item xs={12} sm={6}>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3, color: "white", backgroundColor: "#4caf50" }}
                // onClick={() => fileInputRef.current?.click()}
              >
                Cargar imagen
              </Button>

              {/* <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={onFilesSelected}
              /> */}

              <Chip
                label="Es necesario al menos 1 imagen"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues("images").length < 1 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {service.images.map((img) => (
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

  let service: IServiceSchema | null;

  if (title === "new") {
    const tempService = JSON.parse(JSON.stringify(new Service()));
    delete tempService._id;
    tempService.images = ["img1.jpg"];
    service = tempService;
  } else {
    service = await dbServices.getServiceByTitle(title.toString());
  }

  if (!service) {
    return {
      redirect: {
        destination: "/admin/services",
        permanent: false,
      },
    };
  }

  return {
    props: {
      service,
    },
  };
};

export default ServiceAdminPage;
