import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[700],
    },
    info: {
      main: "#ffff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "green",
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 24,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "text",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 8,
          fontSize: "20px",
          ":hover": {
            backgroundColor: "rgba(255,255,255, 1)",
            transition: "all 0.3s ease-in-out",
            color: "#388e3c"
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "5px 5px 5px 0px rgb(48,212,33)",
          borderRadius: "10px",
          ":hover": {
            boxShadow: "0px 0px 5px 6px rgba(48,212,33,0.75)",
          }
        },
      },
    },
  },
});
