import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "./Navbar";

function Header() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  // 🔎 Buscar productos
  const handleSearch = (value: string) => {

    setSearch(value);

    const params = new URLSearchParams();

    const category = searchParams.get("category");

    if (category) {
      params.set("category", category);
    }

    if (value.trim()) {
      params.set("search", value.trim());
    }

    navigate(`/productos?${params.toString()}`);
  };

  // 📱 Abrir WhatsApp
  const handleWhatsApp = () => {

    const phone = "573022879646";

    const message = encodeURIComponent(
      "Hola, estoy interesado en los productos de TodoMax Distribución. ¿Me pueden brindar información?"
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    );
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#ffffff"
      }}
    >

      <Toolbar
        sx={{
          maxWidth: 1400,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        {/* LOGO / NOMBRE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              backgroundColor: "#16B7F5"
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#041B44"
            }}
          >
            TodoMax
          </Typography>

        </Box>

        {/* NAVBAR */}
        <Navbar />

        {/* BUSCADOR + WHATSAPP */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          {/* 🔎 BUSCADOR */}
          <TextField
            size="small"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar productos..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          {/* 📱 WHATSAPP */}
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsApp}
            sx={{
              backgroundColor: "#25D366",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1EBE5B"
              }
            }}
          >
            WhatsApp
          </Button>

        </Box>

      </Toolbar>

    </AppBar>
  );
}

export default Header;