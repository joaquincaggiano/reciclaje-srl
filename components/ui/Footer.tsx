import NextLink from "next/link";
import {
  Box,
  IconButton,
  // Link,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  EmailOutlined,
  LocalPhoneOutlined,
} from "@mui/icons-material";

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
          flexWrap: "wrap",
        }}
      >
        <Grid item>
          <IconButton>
            <NextLink href="/" passHref legacyBehavior>
              {/* <HomeOutlined sx={{ fontSize: 100 }} /> */}
              <Typography sx={{ fontSize: 70 }}>LOGO</Typography>
            </NextLink>
          </IconButton>
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <TextField
            sx={{ backgroundColor: "white", width: "60%", borderRadius: "8px" }}
            color="info"
            type="email"
            label="Correo"
            variant="filled"
          />
          <Button
            sx={{ backgroundColor: "white", height: "55px", '&:hover': {backgroundColor: "#4caf50",
            color: "white"} }}
            color="secondary"
          >
            Suscribirse
          </Button>
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{flexDirection: {xs: "column", sm: "row"}}}
        >
          <Box display="flex" justifyContent="center" alignItems="center" sx={{mr: 3}}>
            <IconButton>
              <LocalPhoneOutlined color="info" />
            </IconButton>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              341-1234567
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton>
              <EmailOutlined color="info" />
            </IconButton>
            <Typography
              variant="button"
              sx={{ fontSize: "20px", color: "white" }}
            >
              alguien@gmail.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};
