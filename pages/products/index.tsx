import { useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

import { content } from "@/utils";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { MainLayout } from "../../components/layouts";
import useSWR from "swr";
import { IProductSchema } from "@/interfaces";

const DynamicProductList = dynamic(() =>
  import("../../components/products").then((mod) => mod.ProductList)
);
const DynamicFullScreenLoading = dynamic(() =>
  import("../../components/ui").then((mod) => mod.FullScreenLoading)
);

const ProductsPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { data, error } = useSWR<IProductSchema[]>("/api/products");

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  function getImageUrl(url: string) {
    return setImageUrl(url);
  }

  return (
    <MainLayout
      title={content.products.title}
      metaHeader={content.products.metaHeader}
      imageFullUrl={imageUrl}
    >
      {!error && !data ? (
        <DynamicFullScreenLoading />
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h1" textAlign="center">
              {content.products.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
              {content.products.productDescription}{" "}
              {content.contact.datosContacto.whatsapp}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />

          <DynamicProductList products={data!} getImageUrl={getImageUrl} />
        </>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
