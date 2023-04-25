import { MainLayout } from "@/components/layouts";
import { TableComponent } from "@/components/admin";

import useSWR from "swr";

import { IProductSchema } from "@/interfaces";


import Button from "@mui/material/Button";
import  Box from "@mui/material/Box";

import AddOutlined from "@mui/icons-material/AddOutlined";

export interface dataProducts {
  id: string;
  images: string[];
  title: string;
  category: string;
  colors: string;
}

const Products = () => {
  const { data, error } = useSWR<IProductSchema[]>("/api/admin/product");

  if (!data && !error) return <></>;

  const dataProducts:dataProducts[] = data!.map((product) => {
    const colores = product.colors.join(", ");
    return {
      id: product._id,
      images: product.images,
      title: product.title,
      category: product.category,
      colors: colores,
    };
  });



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

   
      <TableComponent data={dataProducts} typeS3="product" urlKit="ProductTodoRec"/>

    </MainLayout>
  );
};

export default Products;
