import { NextPage } from "next";
import NextLink from "next/link";
import dynamic from 'next/dynamic'
import { content } from "../../utils";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import  Box from "@mui/material/Box";
import  Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";

const DynamicMainLayout = dynamic(() =>
  import("../../components/layouts").then((mod) => mod.MainLayout)
);

const ContactPage: NextPage = () => {
  return (
    <DynamicMainLayout
      title={content.contact.title}
      metaHeader={content.contact.metaHeader}
    >
      <Typography variant="h1" textAlign="center" sx={{ mb: 4 }}>
        {content.contact.title}
      </Typography>

      <Grid
        container
        display="flex"
        justifyContent="space-evenly"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Grid item>
          <Typography variant="subtitle1" sx={{ fontSize: "22px" }}>
            {content.contact.metaHeader}
          </Typography>

          <Divider />

          <Box display="flex" flexDirection="column" alignItems="baseline">
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ my: 2 }}
            >
              <NextLink
                href={`https://wa.me/${content.contact.datosContacto.whatsapp}`}
                passHref
                legacyBehavior
                replace={true}
              >
                <a target="_blank" rel="noopener noreferrer">
                  <IconButton sx={{ border: "1px solid #008f39", mr: 1 }}>
                    <LocalPhoneOutlined color="primary" />
                  </IconButton>
                </a>
              </NextLink>

              <Typography fontSize="20px">
                {content.contact.datosContacto.whatsapp}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <NextLink
                href={`https://mail.google.com/mail/?view=cm&to=${content.contact.datosContacto.email}&su=Consulta%20sobre%20servicios`}
                passHref
                legacyBehavior
                replace={true}
              >
                <a target="_blank" rel="noopener noreferrer">
                  <IconButton sx={{ border: "1px solid #3C99DC", mr: 1 }}>
                    <EmailOutlined sx={{ color: "#3C99DC" }} />
                  </IconButton>
                </a>
              </NextLink>
              <Typography fontSize="20px">
                {content.contact.datosContacto.email}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.558514688312!2d-60.701267024422755!3d-32.96266357358659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7aceb45a2f071%3A0x9f0aa68dff077896!2sTte.%20Agneta%202917%2C%20S2010DFC%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1682124906147!5m2!1ses!2sar"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </Grid>
      </Grid>
    </DynamicMainLayout>
  );
};

export default ContactPage;
