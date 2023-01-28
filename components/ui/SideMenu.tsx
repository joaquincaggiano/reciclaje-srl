import {
  AccountCircleOutlined,
  CategoryOutlined,
  DashboardOutlined,
  LoginOutlined,
  NewspaperOutlined,
  PhoneOutlined,
  PrecisionManufacturing,
  VpnKeyOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { useContext } from "react";
import { UiContext } from "../../context/ui";

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 1 }}>
        <List>
          <ListItem button sx={{display: {xs: "flex", md: "none"}}}>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem button sx={{display: {xs: "flex", md: "none"}}}>
            <ListItemIcon>
              <PrecisionManufacturing />
            </ListItemIcon>
            <ListItemText primary={"Servicios"} />
          </ListItem>

          <ListItem button sx={{display: {xs: "flex", md: "none"}}}>
            <ListItemIcon>
              <NewspaperOutlined />
            </ListItemIcon>
            <ListItemText primary={"Novedades"} />
          </ListItem>

          <ListItem button sx={{display: {xs: "flex", md: "none"}}}>
            <ListItemIcon>
              <PhoneOutlined />
            </ListItemIcon>
            <ListItemText primary={"Contacto"} />
          </ListItem>

          <Divider sx={{display: {xs: "flex", md: "none"}}}/>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ingresar"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PrecisionManufacturing />
            </ListItemIcon>
            <ListItemText primary={"Servicios"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <NewspaperOutlined />
            </ListItemIcon>
            <ListItemText primary={"Blog"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
