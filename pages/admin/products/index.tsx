import dynamic from 'next/dynamic';

import useSWR from "swr";

import { IProductSchema } from "@/interfaces";


import Button from "@mui/material/Button";
import  Box from "@mui/material/Box";

import AddOutlined from "@mui/icons-material/AddOutlined";

import {MainLayout} from '../../../components/layouts'

const DynamicMainLayout = dynamic(() =>
  import("../../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicTableComponent = dynamic(() =>
  import("../../../components/admin").then((mod) => mod.TableComponent)
);

export interface dataProducts {
  id: string;
  images: string[];
  title: string;
  category: string;
  colors: string;
}

const Products = () => {
  const { data, error } = useSWR<IProductSchema[]>("/api/admin/products");

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

   
      <DynamicTableComponent data={dataProducts} typeS3="products" urlKit="ProductTodoRec"/>

    </MainLayout>
  );
};

export default Products;
