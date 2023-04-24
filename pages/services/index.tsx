import { NextPage } from "next";

import { MainLayout } from "@/components/layouts";
import { ServicesList } from "@/components/services";

import { content } from "@/utils";
import { useServices } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";
import  Box from "@mui/material/Box";
import  Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";


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
            <Typography variant="h1" textAlign="center">{content.services.title}</Typography>
            <Typography variant="h6" sx={{textAlign: "center", mt: 2}}>
              {content.services.serviceDescription}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />

          <ServicesList services={services} />
        </>
      )}
    </MainLayout>
  );
};

export default ServicesPage;
