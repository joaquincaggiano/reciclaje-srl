import NextLink from "next/link";
import { Box, IconButton, Link, Button, Grid, TextField, Typography } from "@mui/material";
import { EmailOutlined, HomeOutlined, LocalPhoneOutlined } from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#4caf50", minHeight: "150px" }}>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >

        <Grid item>
          <IconButton>
            <NextLink href="/" passHref legacyBehavior>
              <HomeOutlined sx={{ fontSize: 100 }} />
            </NextLink>
          </IconButton>
        </Grid>

        <Grid item>
          <TextField helperText="Correo" />
        </Grid>

        <Grid item alignItems="center">
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton>
              <LocalPhoneOutlined />
            </IconButton>
            <Typography>341-1234567</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton>
              <EmailOutlined />
            </IconButton>
            <Typography>alguien@gmail.com</Typography>
          </Box>
        </Grid>

      </Grid>
    </footer>
  );
};
