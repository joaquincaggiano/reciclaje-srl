import { FC } from 'react';
import { IProductSchema } from "@/interfaces";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { ProductCarrousel } from ".";
import classes from "../../styles/products/TypeColor.module.css";
import { CircleRounded } from "@mui/icons-material";

interface Props {
  product: IProductSchema;
  getImageUrl: (url: string) => void;
}

export const ProductCard: FC<Props> = ({ product, getImageUrl }) => {
  
  const shareFunction = () => {
    const awsUrl = product.images[0].replace("https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/", "")
    const optimizedUrl = `https://ik.imagekit.io/e2ouoknyw/${awsUrl}`
    getImageUrl(optimizedUrl)
  }

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
          <ProductCarrousel productImages={product.images} />
          <CardContent sx={{ height: "140px" }}>
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
                return (
                  <Tooltip className={classes[`${color.toLowerCase()}`]} key={i} title={color}>
                    <IconButton>
                      <CircleRounded sx={{border: "1px solid black", borderRadius: "50%"}}/>
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={shareFunction}>
            Compartir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
