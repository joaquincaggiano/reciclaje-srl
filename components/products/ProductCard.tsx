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
