import { MainLayout } from "@/components/layouts";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import axios from "axios";

import { IProductSchema } from "@/interfaces";
import { CardMedia, Grid, Link, Box, Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const Products = () => {
  const { data, error } = useSWR<IProductSchema[]>("/api/admin/products");
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
          <NextLink
            href={`/admin/products/${row.title}`}
            passHref
            legacyBehavior
          >
            <Link underline="always">{row.title}</Link>
          </NextLink>
        );
      },
    },
    { field: "colors", headerName: "Colores", width: 300 },
    { field: "category", headerName: "Categoria" },
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

  const rows = data!.map((product) => {
    const colores = product.colors.join(", ");
    return {
      id: product._id,
      title: product.title,
      img: product.images,
      category: product.category,
      colors: colores,
    };
  });

  const deleteBlog = async (id: string, img: string[]) => {
    try {
      //@ts-ignore
      const blogToDelete = await axios.delete(`/api/admin/products?id=${id}`);

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
    <MainLayout
      title="Products-Dashboard"
      metaHeader="Administración de los productos"
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
          sx={{ color: "white", backgroundColor: "#008f39" }}
        >
          Crear producto
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

export default Products;
