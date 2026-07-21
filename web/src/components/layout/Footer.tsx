import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#041B44",
        color: "#fff",
        mt: 8,
        py: 5,
        textAlign: "center"
      }}
    >
      <Typography variant="body1">
        © 2026 TodoMax Distribuciones
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;