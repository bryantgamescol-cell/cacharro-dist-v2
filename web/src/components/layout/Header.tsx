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

import Navbar from "./Navbar";

function Header() {
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

        <Navbar />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <TextField
            size="small"
            placeholder="Buscar productos..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
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