import { MainLayout } from "@/components/layouts";

import NextLink from "next/link";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IBlogSchema } from "@/interfaces";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Imagen",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <CardMedia
          component="img"
          alt={row.titile}
          className="fadeIn"
          image={row.img}
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
];

const Blog = () => {
  const { data, error } = useSWR<IBlogSchema[]>("/api/admin/blog");

  if (!data && !error) return <></>;

  const rows = data!.map((blog) => {
    return {
      id: blog._id,
      title: blog.title,
      img: blog.images[0],
      info: blog.info,
      description: blog.description,
    };
  });

  return (
    <MainLayout title="Blog-Dashboard" metaHeader="Administración del Blog">

      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/blog/new"
          sx={{ color: "white", backgroundColor: "#4caf50" }}
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
