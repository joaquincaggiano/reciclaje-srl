import { ChangeEvent, FC, useRef, useState } from "react";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";

import { MainLayout } from "../../../components/layouts";
import { IBlogSchema } from "../../../interfaces";
import { Blog } from "@/models";

import { dbBlogs } from "@/database";

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
  Card,
  CardActions,
  CardMedia,
  Chip,
  Divider,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface FormData {
  _id?: string;
  title: string;
  images: string[];
  description: string;
  info: string;
}

interface Props {
  blog: IBlogSchema;
}

const BlogAdminPage: FC<Props> = ({ blog }) => {
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  // const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: blog });

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
        url: "/api/admin/blog",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      if (!form._id) {
        router.replace(`/admin/blog/${form.title}`);
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
      title={blog.title}
      metaHeader={
        router.asPath === "/admin/blog/new" ? "Crear blog" : "Editar blog"
      }
    >
      {router.asPath === "/admin/blog/new" ? (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Crear blog
          </Typography>
          <BorderColorOutlined />
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography variant="h1" sx={{ mr: 1 }}>
            Editar blog
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
              label="Información"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("info", {
                required: "Este campo es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
              error={!!errors.info}
              helperText={errors.info?.message}
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
                {blog.images.map((img) => (
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

  let blog: IBlogSchema | null;

  if (title === "new") {
    const tempBlog = JSON.parse(JSON.stringify(new Blog()));
    delete tempBlog._id;
    tempBlog.images = ["img1.jpg"];
    blog = tempBlog;
  } else {
    blog = await dbBlogs.getBlogByTitle(title.toString());
  }

  if (!blog) {
    return {
      redirect: {
        destination: "/admin/blog",
        permanent: false,
      },
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export default BlogAdminPage;
