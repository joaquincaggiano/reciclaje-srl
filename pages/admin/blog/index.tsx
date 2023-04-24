import { MainLayout } from "@/components/layouts";

import { useRouter } from "next/router";
import NextLink from "next/link";
import axios from "axios";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IBlogSchema } from "@/interfaces";

import  CardMedia from "@mui/material/CardMedia";
import Link  from "@mui/material/Link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import  Box from "@mui/material/Box";
import AddOutlined from "@mui/icons-material/AddOutlined";

const Blog = () => {
  const { data, error } = useSWR<IBlogSchema[]>("/api/admin/blog");
  const router = useRouter();

  if (!data && !error) return <></>;

  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "Imagen",
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img[0]}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Titulo",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <NextLink href={`/admin/blog/${row.title}`} passHref legacyBehavior>
            <Link underline="always">{row.title}</Link>
          </NextLink>
        );
      },
    },
    { field: "info", headerName: "Información", width: 450 },
    { field: "description", headerName: "Descripción", width: 450 },
    {
      field: "Borrar",
      headerName: "Borrar",
      width: 100,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Button
            onClick={() => deleteBlog(row.id, row.img)}
            color="error"
            sx={{ "&:hover": { color: "#ffff", backgroundColor: "#d32f2f" } }}
          >
            Borrar
          </Button>
        );
      },
    },
  ];

  const rows = data!.map((blog) => {
    return {
      id: blog._id,
      title: blog.title,
      img: blog.images,
      info: blog.info,
      description: blog.description,
    };
  });

  const deleteBlog = async (id: string, img: string[]) => {
    try {
      //@ts-ignore
      const blogToDelete = await axios.delete(`/api/admin/blog?id=${id}`);

      if (blogToDelete.status === 200) {
        img.map(async (eachImage) => {
          const imageName = eachImage.replace(
            "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/",
            ""
          );
          await axios.post("/api/admin/deleteImageFromS3", {
            key: `${imageName}`,
          });
        });
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout title="Blog-Dashboard" metaHeader="Administración del Blog">
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/blog/new"
          sx={{ color: "white", backgroundColor: "#008f39" }}
        >
          Crear blog
        </Button>
      </Box>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Blog;
