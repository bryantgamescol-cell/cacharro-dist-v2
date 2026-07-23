import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";

function ProductDetail() {

  const { id } = useParams();

  const { data: product, isLoading } = useProduct(id!);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography align="center">
        Producto no encontrado
      </Typography>
    );
  }

  const apiUrl =
    (import.meta.env.VITE_API_URL || "http://localhost:3000/api")
      .replace("/api", "");

  const imageUrl = product.image
    ? `${apiUrl}${product.image}`
    : "https://placehold.co/600x600?text=Producto";

  return (

    <Container
      maxWidth="lg"
      sx={{
        py: 6
      }}
    >

      <Grid
        container
        spacing={5}
      >

        <Grid
          size={{
            xs: 12,
            md: 5
          }}
        >

          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4
            }}
          >

            <img
              src={imageUrl}
              alt={product.name}
              width="100%"
              style={{
                borderRadius: 12,
                objectFit: "cover"
              }}
            />

          </Paper>

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 7
          }}
        >

          <Typography
            variant="h3"
            fontWeight={700}
          >
            {product.name}
          </Typography>

          <Box mt={3}>

            <Chip
              color={
                product.stock > 0
                  ? "success"
                  : "error"
              }
              label={
                product.stock > 0
                  ? `${product.stock} disponibles`
                  : "Agotado"
              }
            />

          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 3,
              flexWrap: "wrap"
            }}
          >

            <Paper
              elevation={2}
              sx={{
                p: 3,
                flex: 1
              }}
            >

              <Typography color="text.secondary">
                Precio de compra
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                $
                {product.purchasePrice.toLocaleString("es-CO")}
              </Typography>

            </Paper>

            <Paper
              elevation={2}
              sx={{
                p: 3,
                flex: 1
              }}
            >

              <Typography color="text.secondary">
                Precio de venta
              </Typography>

              <Typography
                color="primary"
                variant="h4"
                fontWeight={700}
              >
                $
                {product.salePrice.toLocaleString("es-CO")}
              </Typography>

            </Paper>

          </Box>

          <Typography
            mt={5}
            fontWeight={700}
          >
            Marca
          </Typography>

          <Typography>
            {product.brand?.name}
          </Typography>

          <Typography
            mt={3}
            fontWeight={700}
          >
            Categoría
          </Typography>

          <Typography>
            {product.category?.name}
          </Typography>

          <Typography
            mt={4}
            fontWeight={700}
          >
            Descripción
          </Typography>

          <Typography color="text.secondary">
            {product.description}
          </Typography>

          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{
              mt: 5,
              px: 5,
              py: 1.5,
              borderRadius: 3
            }}
          >
            Solicitar cotización
          </Button>

        </Grid>

      </Grid>

    </Container>

  );

}

export default ProductDetail;