import { FC } from "react";
import { IProductSchema } from "@/interfaces";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { ProductCarrousel } from ".";

interface Props {
  product: IProductSchema;
}

export const ProductCard: FC<Props> = ({ product }) => {
  console.log("PRODUCT IMAGES",product.images)
  // const url1 = product.images[0]?.replace(
  //   "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com",
  //   "https://ik.imagekit.io/e2ouoknyw/tr:w-200,h-200"
  // );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Card sx={{ width: 345, minHeight: 350 }}>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            height="200"
            // sx={{width: 200}}
            // width="200"
            image={url1}
            alt={product.title}
          /> */}
          <ProductCarrousel productImages={product.images}/>
          <CardContent sx={{height: "140px"}}>
            <Typography gutterBottom variant="h2" component="div">
              {product.title}
            </Typography>
            <Typography variant="body1">Colores disponibles:</Typography>
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {product.colors.map((color, i) => {
                return <Typography key={i}>{color}</Typography>;
              })}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Compartir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
