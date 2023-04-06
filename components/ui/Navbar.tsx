import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Link,
  Button,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";


import { useContext } from 'react';
import { UiContext } from '../../context/ui';

export const Navbar = () => {
  const { asPath } = useRouter();

  const { toggleSideMenu } = useContext( UiContext );

  return (
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link sx={{ mr: "10px", color: "white", fontSize: "20px" }}>TODO-REC</Link>
        </NextLink>

        <Box flex={1} />

        <Box className="fadeIn" sx={{ display: { xs: "none", sm: "flex" } }}>
          <NextLink href="/" passHref legacyBehavior>
            <Link sx={{ mr: "10px" }}>
              <Button color={asPath === "/" ? "primary" : "info"}>
                Inicio
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/products" passHref legacyBehavior>
            <Link sx={{ mr: "10px" }}>
              <Button color={asPath === "/products" ? "primary" : "info"}>
                Productos
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/services" passHref legacyBehavior>
            <Link sx={{ mr: "10px" }}>
              <Button color={asPath === "/services" ? "primary" : "info"}>
                Servicios
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/blog" passHref legacyBehavior>
            <Link sx={{ mr: "10px" }}>
              <Button color={asPath === "/blog" ? "primary" : "info"}>
                Novedades
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/about-us" passHref legacyBehavior>
            <Link sx={{ mr: "10px" }}>
              <Button color={asPath === "/about-us" ? "primary" : "info"}>
                Nosotros
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/contact" passHref legacyBehavior>
            <Link>
              <Button color={asPath === "/contact" ? "primary" : "info"}>
                Contacto
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton
          size="large"
          color="info"
          onClick={toggleSideMenu}
        >
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
