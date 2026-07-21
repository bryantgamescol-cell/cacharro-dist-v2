import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const menu = [
  { name: "Inicio", path: "/" },
  { name: "Productos", path: "/productos" },
  { name: "Contacto", path: "/contacto" }
];

function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center"
      }}
    >
      {menu.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            color: "#041B44",
            fontWeight: 600,
            textTransform: "none",
            fontSize: 15
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
}

export default Navbar;