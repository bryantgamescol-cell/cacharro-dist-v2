import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LogoutIcon from "@mui/icons-material/Logout";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

function AdminLayout() {

  const navigate = useNavigate();

  const location = useLocation();

  const menu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard"
    },
    {
      text: "Productos",
      icon: <Inventory2Icon />,
      path: "/admin/products"
    },
    {
      text: "Categorías",
      icon: <CategoryIcon />,
      path: "/admin/categories"
    },
    {
      text: "Marcas",
      icon: <LocalOfferIcon />,
      path: "/admin/brands"
    },
    {
      text: "Proveedores",
      icon: <LocalShippingIcon />,
      path: "/admin/suppliers"
    },
    {
      text: "Inventario",
      icon: <WarehouseIcon />,
      path: "/admin/inventory"
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>

      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "#fff",
          color: "#222",
          boxShadow: 1
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Cacharro Dist
          </Typography>

          <Avatar>B</Avatar>

        </Toolbar>

      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#1E293B",
            color: "#fff"
          }
        }}
      >

        <Toolbar>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Cacharro Dist
          </Typography>

        </Toolbar>

        <Divider />

        <List>

          {menu.map((item) => (

            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >

              <ListItemIcon
                sx={{
                  color: "#fff"
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
              />

            </ListItemButton>

          ))}

        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Divider />

        <List>

          <ListItemButton>

            <ListItemIcon
              sx={{
                color: "#fff"
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText
              primary="Cerrar sesión"
            />

          </ListItemButton>

        </List>

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F4F6F9",
          minHeight: "100vh",
          p: 4
        }}
      >

        <Toolbar />

        <Outlet />

      </Box>

    </Box>
  );
}

export default AdminLayout;