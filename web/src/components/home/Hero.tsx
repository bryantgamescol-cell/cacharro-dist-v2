import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg,#041B44 0%,#0F4FA8 100%)",
        color: "#fff",
        py: 10
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2
              }}
            >
              Todo para tu negocio
            </Typography>

            <Typography
              sx={{
                fontSize: 20,
                opacity: .9,
                mb: 4
              }}
            >
              Encuentra productos de excelente calidad para surtir tu tienda,
              negocio o empresa.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Inventory2Icon />}
              >
                Ver catálogo
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: "#fff",
                  borderColor: "#fff"
                }}
              >
                Contactar
              </Button>
            </Box>

          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >

            <Box
              sx={{
                width: 380,
                height: 380,
                borderRadius: 5,
                background: "#ffffff22",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 120
              }}
            >
                📦
            </Box>

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;