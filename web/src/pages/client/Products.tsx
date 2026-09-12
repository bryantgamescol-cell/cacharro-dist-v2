import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@mui/material";

import {
  useSearchParams
} from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/home/ProductCard";

function Products() {

  const [searchParams] = useSearchParams();

  // 📂 Categoría seleccionada
  const category =
    searchParams.get("category") || undefined;

  // 🔎 Texto de búsqueda
  const search =
    searchParams.get("search") || undefined;

  const {
    data,
    isLoading,
    error
  } = useProducts({
    category,
    search
  });

  // ⏳ Cargando
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

  // ❌ Error
  if (error) {
    return (
      <Typography align="center">
        Error al cargar productos.
      </Typography>
    );
  }

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 6
      }}
    >

      {/* TÍTULO */}
      <Typography
        variant="h3"
        fontWeight={700}
        mb={5}
      >

        {search
          ? `Resultados para "${search}"`
          : category
            ? "Productos de la categoría"
            : "Todos los productos"}

      </Typography>

      {/* PRODUCTOS */}
      <Grid
        container
        spacing={4}
      >

        {/* SIN PRODUCTOS */}
        {data?.data?.length === 0 && (

          <Grid size={12}>

            <Typography
              textAlign="center"
              sx={{
                py: 5
              }}
            >
              {search
                ? `No encontramos productos para "${search}".`
                : "No hay productos disponibles."}
            </Typography>

          </Grid>

        )}

        {/* LISTA DE PRODUCTOS */}
        {data?.data?.map((product: any) => (

          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3
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

              category={
                product.category?.name ||
                "Sin categoría"
              }

              stock={product.stock}

              purchasePrice={
                product.purchasePrice
              }

              salePrice={
                product.salePrice
              }

            />

          </Grid>

        ))}

      </Grid>

    </Container>

  );
}

export default Products;