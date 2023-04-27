import { NextPage } from "next";
import dynamic from "next/dynamic";

import { content } from "@/utils";
import { useServices } from "@/hooks";

import  Box from "@mui/material/Box";
import  Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";

const DynamicMainLayout = dynamic(() =>
  import("../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicServicesList = dynamic(() =>
import("../../components/services").then((mod) => mod.ServicesList)
);
const DynamicFullScreenLoading = dynamic(() =>
import("../../components/ui").then((mod) => mod.FullScreenLoading)
);



const ServicesPage: NextPage = () => {
  const { services, isLoading } = useServices("/services");

  return (
    <DynamicMainLayout
      title={content.services.title}
      metaHeader={content.services.metaHeader}
    >
      {isLoading ? (
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
            <Typography variant="h1" textAlign="center">{content.services.title}</Typography>
            <Typography variant="h6" sx={{textAlign: "center", mt: 2}}>
              {content.services.serviceDescription}
            </Typography>
          </Box>

          <Divider sx={{ mb: 5 }} />

          <DynamicServicesList services={services} />
        </>
      )}
    </DynamicMainLayout>
  );
};

export default ServicesPage;
