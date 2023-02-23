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

interface Props {
  product: IProductSchema;
}


export const ProductCard: FC<Props> = ({ product }) => {
  // const imageUrl = product.images.map(url => {
  //   const url1 = url?.replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com", "https://ik.imagekit.io/e2ouoknyw")
  //   return url1
  // })
  // console.log("Image url", imageUrl)
  // console.log("products image", product.images[0]?.replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com", "https://ik.imagekit.io/e2ouoknyw"))
  // const url1 = product.images[0]?.replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com", "https://ik.imagekit.io/e2ouoknyw")

  // const imageURL = `https://ik.imagekit.io/e2ouoknyw/product/${product._id}`
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
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
