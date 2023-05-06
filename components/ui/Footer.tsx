import NextLink from "next/link";
import dynamic from "next/dynamic";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";

import { content } from "@/utils";
import { Divider } from "@mui/material";

const DynamicNavbar = dynamic(() =>
  import("../../components/mailchimp").then((mod) => mod.Subscribe)
);

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#008f39", minHeight: "150px" }}>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Grid item>
          <NextLink href="/" passHref legacyBehavior>
            <Link>
              <CardMedia
                component="img"
                height="200"
                image="https://ik.imagekit.io/e2ouoknyw/BannersTodoRec/todo-rec-logo-2.png"
                alt="Logo Todo-Rec"
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid
          item
          display="flex"
          // flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <DynamicNavbar />
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", sm: "row", lg: "column" } }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mr: 3, mb: {xs: 2, sm: 0, lg: 2} }}
          >
            <NextLink
              href={`https://wa.me/${content.contact.datosContacto.whatsapp}`}
              passHref
              legacyBehavior
              replace={true}
            >
              <a target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    border: "1px solid #ffff",
                    mr: 1,
                    "&:hover": { backgroundColor: "#ffffff83" },
                  }}
                >
                  <LocalPhoneOutlined sx={{ color: "#ffff" }} />
                </IconButton>
              </a>
            </NextLink>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              {content.contact.datosContacto.whatsapp}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <NextLink
              href={`https://mail.google.com/mail/?view=cm&to=${content.contact.datosContacto.email}&su=Consulta%20sobre%20servicios`}
              passHref
              legacyBehavior
              replace={true}
            >
              <a target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    border: "1px solid #ffff",
                    mr: 1,
                    "&:hover": { backgroundColor: "#ffffff83" },
                  }}
                >
                  <EmailOutlined sx={{ color: "#ffff" }} />
                </IconButton>
              </a>
            </NextLink>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              {content.contact.datosContacto.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{ mt: 3 }}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Divider sx={{ width: "100%" }} />

        <Typography
          variant="h6"
          sx={{
            color: "#000000",
            p: 2,
            fontSize: { xs: "16px" },
            textAlign: "center",
          }}
        >
          © 2023 |{" "}
          <NextLink href="https://github.com/CataQuarleri" passHref legacyBehavior>
            <Link sx={{color: "black"}} target="_blank" rel="noreferrer">
              Cata Quarleri
            </Link>
          </NextLink>{" "}
          -{" "}
          <NextLink href="https://github.com/joaquincaggiano" passHref legacyBehavior>
            <Link sx={{color: "black"}} target="_blank" rel="noreferrer">
              Joaquín Caggiano
            </Link>
          </NextLink>
        </Typography>
      </Box>
    </footer>
  );
};
