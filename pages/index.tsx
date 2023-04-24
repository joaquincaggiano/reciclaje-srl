import { useEffect, useContext, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";

import { useServices } from "@/hooks/useServices";

import { MainLayout } from "../components/layouts";
import { CardServicesHome } from "@/components/services";
import { ModalSubscribe } from "@/components/mailchimp";
import { DescriptionHome } from "../components/home/DescriptionHome";

import { Carrousel, FullScreenLoading } from "@/components/ui";
import { Typography, Divider, Grid, Button, Box, Link } from "@mui/material";
import { content } from "@/utils";
import { UiContext } from "@/context";
import { LocationOnOutlined } from "@mui/icons-material";

const HomePage: NextPage = () => {
  const { services, isLoading } = useServices("/services");
  const { toggleModalOpen } = useContext(UiContext);
  // const [wasModalOpen, setWasModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const wasModalOpen = sessionStorage.getItem("openModal");
      if (wasModalOpen !== "true") {
        toggleModalOpen();
        sessionStorage.setItem("openModal", "true");
      }
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-line react-hooks/exhaustive-deps
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

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", my: 4, fontSize: "34px" }}
        >
          {content.home.descriptionTitle}
        </Typography>

        <DescriptionHome />
      </Box>

      <Divider sx={{ mt: 5 }} />

      <Typography
        variant="h2"
        sx={{ textAlign: "center", my: 4, fontSize: "34px" }}
      >
        {content.services.title}
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Grid
          container
          spacing={4}
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          // sx={{ flexDirection: { xs: "column", sm: "row" }, flexWrap: "wrap" }}
        >
          {services.map((svc, i) => {
            return <CardServicesHome service={svc} key={i} />;
          })}
        </Grid>
      )}

      <Divider sx={{ my: 5 }} />

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="h2"
          sx={{ textAlign: "center", my: 4, fontSize: "34px", mr: 1 }}
        >
          Ubicación
        </Typography>

        <LocationOnOutlined sx={{ fontSize: "34px", color: "#008f39" }} />
      </Box>

      
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.558514688312!2d-60.701267024422755!3d-32.96266357358659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7aceb45a2f071%3A0x9f0aa68dff077896!2sTte.%20Agneta%202917%2C%20S2010DFC%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1682124906147!5m2!1ses!2sar"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>
    </MainLayout>
  );
};

export default HomePage;
