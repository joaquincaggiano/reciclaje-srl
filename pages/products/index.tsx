import { useState } from 'react';
import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";

import { useProducts } from "@/hooks";

import { FullScreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";

const ProductsPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  const [imageUrl, setImageUrl] = useState("")

  // console.log("products", products)

  function getImageUrl(url: string){
    return setImageUrl(url)
  }
  console.log("imageUrl",imageUrl)

  return (
    <MainLayout
      title={content.products.title}
      metaHeader={content.products.metaHeader}
      imageFullUrl={imageUrl}
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h1">{content.products.title}</Typography>
            <Typography variant="h6">
              {content.products.productDescription}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />

          <ProductList products={products} getImageUrl={getImageUrl}/>
        </>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
