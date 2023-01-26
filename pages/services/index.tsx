import { MainLayout } from "@/components/layouts";
import { NextPage } from "next";

import { content } from "@/utils";
import { useServices } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const ServicesPage: NextPage = () => {

  const {services, isLoading} = useServices("/services")

  return (
    <MainLayout title={content.services.title} metaHeader={content.services.metaHeader}>
        {isLoading ? <FullScreenLoading/> : (
          <Grid container spacing={4}>
          {services.map((service, i) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                key={i}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.images[0]}
                      alt={service.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.title}
                      </Typography>
                      <Typography variant="body1">
                        {service.description}
                      </Typography>
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
        )}
    </MainLayout>
  )
}

export default ServicesPage;