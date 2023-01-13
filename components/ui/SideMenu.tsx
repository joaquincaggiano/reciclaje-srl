import { CategoryOutlined, NewspaperOutlined, PhoneOutlined, PrecisionManufacturing } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const SideMenu = () => {
  return (
    <Drawer
      open={true}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      // onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 3 }}>
        <List>
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
            <ListItemText primary={"Novedades"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PhoneOutlined />
            </ListItemIcon>
            <ListItemText primary={"Contacto"} />
          </ListItem>

        </List>
      </Box>
    </Drawer>
  );
};
