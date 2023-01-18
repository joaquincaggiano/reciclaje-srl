import { NextPage } from "next";

import { MainLayout } from "../components/layouts";
import { CardServices } from "@/components/services";

import { Carrousel } from "@/components/ui";
import { Typography, Divider, Box } from "@mui/material";
import { content } from "@/utils";

const HomePage: NextPage = () => {
  return (
    <MainLayout
      title={content.home.title}
      pageDescription={content.home.pageDescription}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Título
      </Typography>

      <Carrousel />

      <Divider sx={{ mt: 5 }} />

      <Typography variant="h2" sx={{ textAlign: "center", my: 2 }}>
        Descripción general de la empresa
      </Typography>

      <Typography variant="body1">
        Dolore proident veniam ad adipisicing qui mollit voluptate pariatur
        cupidatat. Reprehenderit do consectetur voluptate id enim mollit eiusmod
        mollit aute amet nisi. Exercitation labore fugiat in labore aliquip enim
        culpa officia. Sint aliquip velit labore aliqua cillum. Enim aliqua
        dolor dolor anim excepteur magna ea et dolore ullamco voluptate esse
        occaecat proident. Elit irure Lorem aute excepteur esse nulla
        reprehenderit ea duis Lorem excepteur et labore. Labore non aliquip
        irure non incididunt incididunt magna anim sit do tempor quis.Laborum in
        dolor dolor dolore duis ea exercitation sit ut veniam est. Dolore eu
        reprehenderit sit consectetur sint sint in proident commodo laborum qui.
        Deserunt est qui qui dolore. Consequat consectetur nulla in pariatur.
        Laboris cillum velit enim laboris ea nulla veniam magna occaecat. Quis
        sit exercitation qui duis ex elit qui voluptate minim tempor ipsum
        nostrud.
      </Typography>

      <Divider sx={{ mt: 5 }} />

      <Typography variant="h2" sx={{ textAlign: "center", my: 2 }}>
        Servicios
      </Typography>

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ flexDirection: { xs: "column", sm: "row", flexWrap: "wrap" } }}
      >
        <CardServices
          title="Servicio 1"
          description="Pequeña descripción servicio 1"
          image="https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium"
        />
        <CardServices
          title="Servicio 2"
          description="Pequeña descripción servicio 2"
          image="https://pbs.twimg.com/media/CWgztjyUsAAWLFm?format=jpg&name=medium"
        />
        <CardServices
          title="Servicio 3"
          description="Pequeña descripción servicio 3"
          image="https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium"
        />
      </Box>

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
