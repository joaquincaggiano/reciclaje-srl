import { MainLayout } from "@/components/layouts";
import { NextPage } from "next";

import { content } from "@/utils";
import { useServices } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const ServicesPage: NextPage = () => {
  const { services, isLoading } = useServices("/services");

  return (
    <MainLayout
      title={content.services.title}
      metaHeader={content.services.metaHeader}
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
            <Typography variant="h1">{content.services.title}</Typography>
            <Typography variant="h6">
              {content.services.serviceDescription}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />
          <Grid container spacing={4}>
            {services.map((service, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  // sm={6}
                  // md={4}
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                  key={i}
                >
                  <Card
                    sx={{
                      width: "100%",
                      boxShadow: "0px 0px 0px 0px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{ textAlign: "center", fontSize: "30px" }}
                      >
                        {service.title}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      height="500"
                      image={service.images[0]}
                      alt={service.title}
                    />
                    <CardContent>
                      <Typography variant="body1" sx={{ fontSize: "20px" }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </MainLayout>
  );
};

export default ServicesPage;
