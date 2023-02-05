import { MainLayout } from "@/components/layouts";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IServiceSchema } from "@/interfaces";
import { CardMedia, Grid } from "@mui/material";

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
  { field: "title", headerName: "Titulo", width: 300 },
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
