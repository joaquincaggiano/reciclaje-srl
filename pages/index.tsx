import { MainLayout } from "../components/layouts";
import { content } from "@/utils";
import { Carrousel } from "@/components/ui";
import { Typography, Divider } from "@mui/material";
import { NextPage } from "next";

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
      
    </MainLayout>
  );
};

export default HomePage;
