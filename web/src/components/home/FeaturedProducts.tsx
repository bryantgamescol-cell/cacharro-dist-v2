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
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography>
        Error cargando productos.
      </Typography>
    );
  }

  // Mostrar solo los primeros 4 productos
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
                category={product.category?.name}
                stock={product.stock}
                price={product.salePrice}
              />

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default FeaturedProducts;