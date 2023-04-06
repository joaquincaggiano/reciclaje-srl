import { MainLayout } from "@/components/layouts";

import NextLink from "next/link";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IServiceSchema } from "@/interfaces";
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
        <NextLink href={`/admin/services/${row.title}`} passHref legacyBehavior>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "description", headerName: "Descripción", width: 700 },
];

const Services = () => {
  const { data, error } = useSWR<IServiceSchema[]>("/api/admin/services");

  if (!data && !error) return <></>;

  const rows = data!.map((service) => {
    return {
      id: service._id,
      title: service.title,
      img: service.images[0],
      description: service.description,
    };
  });

  return (
    <MainLayout
      title="Services-Dashboard"
      metaHeader="Administración de los servicios"
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/services/new"
          sx={{ color: "white", backgroundColor: "#008f39" }}
        >
          Crear servicio
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

export default Services;
