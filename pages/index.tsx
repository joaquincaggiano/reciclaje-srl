import { useEffect, useContext } from 'react';
import { UiContext } from "@/context";
import { NextPage } from "next";

import { useServices } from "@/hooks/useServices";

import { MainLayout } from "../components/layouts";
import { CardServicesHome } from "@/components/services";
import { ModalSubscribe } from "@/components/mailchimp";

import { Carrousel, FullScreenLoading } from "@/components/ui";
import { Typography, Divider, Grid } from "@mui/material";
import { content } from "@/utils";


const HomePage: NextPage = () => {
  const { services, isLoading } = useServices("/services");
  const {toggleModalOpen} = useContext(UiContext)

  useEffect(() => {
    setTimeout(() => {
      toggleModalOpen()
    }, 2000)
  }, []);

  return (
    <MainLayout title={content.home.title} metaHeader={content.home.metaHeader}>
      <ModalSubscribe />

      <Typography
        variant="h1"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        {content.home.title}
      </Typography>

      <Carrousel />

      <Divider sx={{ mt: 5 }} />

      <Typography
        variant="h2"
        sx={{ textAlign: "center", my: 2, fontSize: "34px" }}
      >
        {content.home.descriptionTitle}
      </Typography>

      <Typography variant="body1">{content.home.descriptionInfo}</Typography>

      <Divider sx={{ mt: 5 }} />

      <Typography
        variant="h2"
        sx={{ textAlign: "center", my: 2, fontSize: "34px" }}
      >
        {content.services.title}
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Grid
          container
          spacing={4}
          sx={{ flexDirection: { xs: "column", sm: "row" }, flexWrap: "wrap" }}
        >
          {services.map((svc, i) => {
            return (
              <CardServicesHome
                title={svc.title}
                description={svc.description}
                image={svc.images[0]}
                key={i}
              />
            );
          })}
        </Grid>
      )}

      <Divider sx={{ mt: 5 }} />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.5300291294314!2d-60.64673352873913!3d-32.97820004482624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7abbc8c011071%3A0x4a32208737d1a0af!2sValdes%201163%2C%20S2000%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1674076905543!5m2!1ses!2sar"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>
    </MainLayout>
  );
};

export default HomePage;
