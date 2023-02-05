import { MainLayout } from "@/components/layouts";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IProductSchema } from "@/interfaces";
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
  { field: "colors", headerName: "Colores", width: 300 },
  { field: "category", headerName: "Categoria" },
];

const Products = () => {
  const { data, error } = useSWR<IProductSchema[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => {
    const colores = product.colors.join(", ");
    return {
      id: product._id,
      title: product.title,
      img: product.images[0],
      category: product.category,
      colors: colores,
    };
  });

  return (
    <MainLayout
      title="Products-Dashboard"
      metaHeader="Administración de los productos"
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

export default Products;
