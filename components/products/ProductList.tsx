import { FC } from "react";
import { ProductCard } from ".";
import { IProductSchema } from "@/interfaces";
import { Grid } from "@mui/material";

interface Props {
  products: IProductSchema[];
  getImageUrl: (url: string) => void;
}

export const ProductList: FC<Props> = ({ products, getImageUrl }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product, i) => {
        return (
          <ProductCard product={product} key={i} getImageUrl={getImageUrl}/>
        );
      })}
    </Grid>
  );
};
