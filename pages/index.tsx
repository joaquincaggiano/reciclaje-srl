import { useEffect, useContext } from "react";
import { UiContext } from "@/context";
import { NextPage } from "next";
import dynamic from "next/dynamic";

import { useServices } from "@/hooks/useServices";

const DynamicMainLayout = dynamic(() =>
  import("../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicCardServicesHome = dynamic(() =>
  import("../components/services").then((mod) => mod.CardServicesHome)
);
const DynamicModalSubscribe = dynamic(() =>
  import("../components/mailchimp").then((mod) => mod.ModalSubscribe)
);
const DynamicDescriptionHome = dynamic(() =>
  import("../components/home/DescriptionHome").then(
    (mod) => mod.DescriptionHome
  )
);
const DynamicProductSlideCarrousel = dynamic(() =>
  import("../components/products").then((mod) => mod.ProductSlideCarrousel)
);

import { FullScreenLoading } from "@/components/ui";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { content } from "@/utils";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";

const images = [
  "https://ik.imagekit.io/e2ouoknyw/BannersTodoRec/frente1.jpg",
  "https://ik.imagekit.io/e2ouoknyw/BannersTodoRec/adentro4.jpg",
  "https://ik.imagekit.io/e2ouoknyw/BannersTodoRec/adentro2.jpg",
];

const HomePage: NextPage = () => {
  const { services, isLoading } = useServices("/services");
  const { toggleModalOpen } = useContext(UiContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const wasModalOpen = sessionStorage.getItem("openModal");
      if (wasModalOpen !== "true") {
        toggleModalOpen();
        sessionStorage.setItem("openModal", "true");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DynamicMainLayout
      title={content.home.title}
      metaHeader={content.home.metaHeader}
    >
      <DynamicModalSubscribe />

      <Typography
        variant="h1"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        {content.home.title}
      </Typography>

      <DynamicProductSlideCarrousel images={images} height="600px" />

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

        <DynamicDescriptionHome />
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
            return <DynamicCardServicesHome service={svc} key={i} />;
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
    </DynamicMainLayout>
  );
};

export default HomePage;
