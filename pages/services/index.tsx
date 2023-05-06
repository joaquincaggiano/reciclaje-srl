import { NextPage } from "next";
import dynamic from "next/dynamic";

import { content } from "@/utils";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { MainLayout } from "../../components/layouts";
import useSWR from "swr";
import { IServiceSchema } from "@/interfaces";

const DynamicServicesList = dynamic(() =>
  import("../../components/services").then((mod) => mod.ServicesList)
);
const DynamicFullScreenLoading = dynamic(() =>
  import("../../components/ui").then((mod) => mod.FullScreenLoading)
);

const ServicesPage: NextPage = () => {
  const { data, error } = useSWR<IServiceSchema[]>("/api/services");

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  return (
    <MainLayout
      title={content.services.title}
      metaHeader={content.services.metaHeader}
    >
      {!error && !data ? (
        <DynamicFullScreenLoading />
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h1" textAlign="center">
              {content.services.title}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />

          <DynamicServicesList services={data!} />
        </>
      )}
    </MainLayout>
  );
};

export default ServicesPage;
