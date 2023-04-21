import NextLink from "next/link";
import {
  Box,
  IconButton,
  Grid,
  Typography,
  CardMedia,
  Link,
} from "@mui/material";
import { EmailOutlined, LocalPhoneOutlined } from "@mui/icons-material";

import { Subscribe } from "../mailchimp";
import { content } from "@/utils";

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
                image="/todo-rec-logo-2.png"
                alt="Logo Todo-Rec"
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Subscribe />
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mr: 3 }}
          >
            <IconButton>
              <LocalPhoneOutlined sx={{color: "white"}} />
            </IconButton>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              {content.contact.datosContacto.whatsapp}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton>
              <EmailOutlined sx={{color: "white"}} />
            </IconButton>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              {content.contact.datosContacto.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};
