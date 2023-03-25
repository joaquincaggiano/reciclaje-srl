import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "../../utils";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { EmailOutlined, LocalPhoneOutlined } from "@mui/icons-material";

const ContactPage: NextPage = () => {
  return (
    <MainLayout
      title={content.contact.title}
      metaHeader={content.contact.metaHeader}
    >
      <Typography variant="h1" textAlign="center" sx={{mb:4}}>{content.contact.title}</Typography>

      <Grid
        container
        display="flex"
        justifyContent="space-evenly"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Grid item>
          <Typography variant="subtitle1">
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
              <IconButton sx={{ border: "1px solid #008f39", mr: 1 }}>
                <LocalPhoneOutlined color="primary" />
              </IconButton>

              <Typography>{content.contact.datosContacto.whatsapp}</Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <IconButton sx={{ border: "1px solid #3C99DC", mr: 1 }}>
                <EmailOutlined sx={{ color: "#3C99DC" }} />
              </IconButton>

              <Typography>{content.contact.datosContacto.email}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.5300291294314!2d-60.64673352873913!3d-32.97820004482624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7abbc8c011071%3A0x4a32208737d1a0af!2sValdes%201163%2C%20S2000%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1674076905543!5m2!1ses!2sar"
            width="100%"
            height="450"
            loading="lazy"
          ></iframe>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ContactPage;
