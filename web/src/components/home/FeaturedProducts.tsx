import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@mui/material";

import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";

function FeaturedProducts() {

  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography align="center">
        Error cargando productos.
      </Typography>
    );
  }

  const products = data?.data?.slice(0, 4) || [];

  return (
    <Box
      sx={{
        py: 8,
        background: "#F4F7FB"
      }}
    >
      <Container maxWidth="xl">

        <Typography
          variant="h4"
          fontWeight={700}
          mb={5}
        >
          Productos destacados
        </Typography>

        <Grid container spacing={4}>

          {products.map((product: any) => (

            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}
            >

              <ProductCard
                id={product.id}
                image={
                  product.image ||
                  "https://placehold.co/600x400?text=Producto"
                }
                name={product.name}
                description={product.description}
                category={product.category?.name || "Sin categoría"}
                stock={product.stock}
                purchasePrice={product.purchasePrice}
                salePrice={product.salePrice}
              />

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default FeaturedProducts;