import {
  ChangeEvent,
  FC,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";
import dynamic from 'next/dynamic'
import { GetServerSideProps } from "next";
import { UiContext } from "@/context/ui";

import { useRouter } from "next/router";

import { IBlogSchema } from "../../../interfaces";
import { Blog } from "@/models";

import { dbBlogs } from "@/database";

import { useForm } from "react-hook-form";

import axios from "axios";

import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import  Chip  from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import  Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
import  Divider  from "@mui/material/Divider";
import  CardMedia from "@mui/material/CardMedia";

import {MainLayout} from '../../../components/layouts'

// const DynamicMainLayout = dynamic(() =>
//   import("../../../components/layouts").then((mod) => mod.MainLayout)
// );
const DynamicModalCancelChanges = dynamic(() =>
  import("../../../components/admin").then((mod) => mod.ModalCancelChanges)
);

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
  const { toggleModalCancelChange } = useContext(UiContext);
  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [stateUrl, setStateUrl] = useState<string>("");

  const s3URL = "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/"

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: blog });

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
 
  }, [unsavedChanges]);   // eslint-disable-line react-hooks/exhaustive-deps

  const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No se han seleccionado archivos");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "type",
        `blog/${getValues("title").replaceAll(" ", "-").toLowerCase()}`
      );

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`images`, e.target.files[i]);
        const { data } = await axios.post("/api/admin/upload", formData);

        const imageKitURL = data.url.replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/blog/", "https://ik.imagekit.io/e2ouoknyw/BlogTodoRec/")

        setValue("images", [...getValues("images"), imageKitURL], {
          shouldValidate: true,
        });
        setUnsavedChanges(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("title", e.target.value, { shouldValidate: true });

    if (blog.title === getValues("title")) {
      setUnsavedChanges(false);
    } else {
      setUnsavedChanges(true);
    }
  };
  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("info", e.target.value, { shouldValidate: true });

    if (blog.info === getValues("info")) {
      setUnsavedChanges(false);
    } else {
      setUnsavedChanges(true);
    }
  };
  const handleDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("description", e.target.value, { shouldValidate: true });

    if (blog.description === getValues("description")) {
      setUnsavedChanges(false);
    } else {
      setUnsavedChanges(true);
    }
  };

  function compareArrays(arr1: string[], arr2: string[]) {
    if (arr1.length === arr2.length) {
      return arr1.every(function (element, index) {
        if (element === arr2[index]) {
          setUnsavedChanges(false);
        } else {
          setUnsavedChanges(true);
        }
      });
    } else {
      return setUnsavedChanges(true);
    }
  }

  const onDeleteImage = async (image: string) => {
    const imageName = image.replace(
      "https://ik.imagekit.io/e2ouoknyw/BlogTodoRec/",
      "blog/"
    );
    await axios.post("/api/admin/deleteImageFromS3", {
      key: imageName,
    });
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );

    compareArrays(blog.images, getValues("images"));
  };

  const deleteUnsavedChanges = async () => {
    try {
      setUnsavedChanges(false);
      const blogName = blog.title.replaceAll(" ", "-").toLowerCase();

      const { data } = await axios.post("/api/admin/getFiles", {
        name: blogName,
        type: "blog"
      });

      const imagesInDB = blog.images.map((oneImage) => {
        return oneImage.replace(s3URL, "");
      });

      const imagesInS3 = data.objects.filter(
        (img: string) => !imagesInDB.includes(img)
      );

      await imagesInS3.map((eachImage: string) => {
        axios.post("/api/admin/deleteImageFromS3", {
          key: eachImage,
        });
      });

      router.push(stateUrl || "https://www.todorec.com.ar/");

      toggleModalCancelChange();
    } catch (error) {
      throw new Error("No se pudieron borrar las imagenes");
    }
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return;

    setIsSaving(true);

    try {
      setUnsavedChanges(false);
      const { data } = await axios({
        url: "/api/admin/blog",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      router.replace(`/admin/blog`);

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
      {/*//@ts-ignore*/}
      <DynamicModalCancelChanges deleteUnsavedChanges={deleteUnsavedChanges} />

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

            <TextField
              label="Información"
              variant="filled"
              value={getValues("info") || ""}
              fullWidth
              multiline
              maxRows={3}
              sx={{ mb: 1 }}
              {...register("info", {
                required: "Este campo es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
              error={!!errors.info}
              helperText={errors.info?.message}
              onChange={(e) => handleInfoChange(e)}
            />

            <TextField
              label="Descripción"
              variant="filled"
              value={getValues("description") || ""}
              fullWidth
              multiline
              maxRows={3}
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              onChange={(e) => handleDescriptionChange(e)}
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
                sx={{ mb: 3, color: "white", backgroundColor: "#008f39" }}
                onClick={() => fileInputRef.current?.click()}
                disabled={getValues("title").trim().length === 0 ? true : false}
              >
                Cargar imagen
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={(e) => selectFile(e)}
              />

              <Chip
                label="Es necesario al menos 1 imagen"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues("images").length < 1 ? "flex" : "none",
                }}
              />
              <Chip
                label="Es necesario incluir un título para subir una imagen"
                color="error"
                variant="outlined"
                sx={{
                  display:
                    getValues("title").trim().length === 0 ? "flex" : "none",
                }}
              />
              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
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
                        >
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
    // tempBlog.images = ["img1.jpg"];
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
