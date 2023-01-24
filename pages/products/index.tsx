import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// database sin conexion a mongo
import { seedDatabase } from "@/database";

const ProductsPage: NextPage = () => {
  return (
    <MainLayout
      title={content.products.title}
      metaHeader={content.products.metaHeader}
    >
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

      <Grid container spacing={4}>
        {seedDatabase.initialData.products.map((product, i) => {
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
                    <Box display="flex" justifyContent="space-evenly" alignItems="center">
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
        })}
      </Grid>
    </MainLayout>
  );
};

export default ProductsPage;
