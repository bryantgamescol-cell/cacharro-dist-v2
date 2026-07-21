import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from "@mui/material";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";

function Products() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;

  const { data, isLoading, error } = useProducts({
    category
  });

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

      <Typography
        variant="h3"
        fontWeight={700}
        mb={5}
      >
        {category
          ? "Productos de la categoría"
          : "Todos los productos"}
      </Typography>

      <Grid container spacing={4}>

        {data?.data?.length === 0 && (

          <Grid size={12}>

            <Typography
              textAlign="center"
            >
              No hay productos disponibles.
            </Typography>

          </Grid>

        )}

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

            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8
                }
              }}
            >

              <CardMedia
                component="img"
                height="220"
                image={
                  product.image ||
                  "https://placehold.co/600x400?text=Producto"
                }
                alt={product.name}
              />

              <CardContent>

                <Typography
                  color="primary"
                >
                  {product.category?.name}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  mt={1}
                >
                  {product.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={1}
                >
                  {product.brand?.name}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt={3}
                >

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

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="primary"
                  >
                    $
                    {product.salePrice.toLocaleString("es-CO")}
                  </Typography>

                </Stack>

              </CardContent>

              <CardActions>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    navigate(`/productos/${product.id}`)
                  }
                >
                  Ver producto
                </Button>

              </CardActions>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Container>

  );

}

export default Products;