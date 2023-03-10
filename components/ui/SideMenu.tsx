import { useContext } from "react";
import { AuthContext, UiContext } from "@/context";

import { useRouter } from "next/router";

import {
  AccountCircleOutlined,
  CategoryOutlined,
  DashboardOutlined,
  GroupOutlined,
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

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { logOut, isLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  const logOutUser = () => {
    toggleSideMenu();
    logOut();
    router.push("/");
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 1 }}>
        <List>
          {!isLoggedIn && (
            <>
              <ListItem button onClick={() => navigateTo("/auth/login")}>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ingresar"} />
              </ListItem>

              <Divider />
            </>
          )}
          <ListItem
            button
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => navigateTo("/products")}
          >
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => navigateTo("/services")}
          >
            <ListItemIcon>
              <PrecisionManufacturing />
            </ListItemIcon>

            <ListItemText primary={"Servicios"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => navigateTo("/blog")}
          >
            <ListItemIcon>
              <NewspaperOutlined />
            </ListItemIcon>
            <ListItemText primary={"Novedades"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => navigateTo("/contact")}
          >
            <ListItemIcon>
              <PhoneOutlined />
            </ListItemIcon>
            <ListItemText primary={"Contacto"} />
          </ListItem>

          <Divider sx={{ display: { xs: "flex", md: "none" } }} />

          {isLoggedIn && (
            <>
              {/* <ListItem button onClick={() => navigateTo("/profile")}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem> */}

              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo("/admin/dashboard")}>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/products")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/services")}>
                <ListItemIcon>
                  <PrecisionManufacturing />
                </ListItemIcon>
                <ListItemText primary={"Servicios"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/users")}>
                <ListItemIcon>
                  <GroupOutlined />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/blog")}>
                <ListItemIcon>
                  <NewspaperOutlined />
                </ListItemIcon>
                <ListItemText primary={"Blog"} />
              </ListItem>
              <Divider />

              <ListItem button onClick={logOutUser}>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
