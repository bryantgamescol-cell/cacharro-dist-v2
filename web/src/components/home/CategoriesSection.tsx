import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@mui/material";

import CategoryCard from "./CategoryCard";
import { useCategories } from "../../hooks/useCategories";

function CategoriesSection() {

  const { data, isLoading, error } = useCategories();

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
        Error cargando categorías.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        py: 8
      }}
    >
      <Container maxWidth="xl">

        <Typography
          variant="h4"
          fontWeight={700}
          mb={5}
        >
          Categorías destacadas
        </Typography>

        <Grid container spacing={3}>

          {data?.data?.map((category: any) => (

            <Grid
              key={category.id}
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}
            >

              <CategoryCard
                id={category.id}
                title={category.name}
                icon="📦"
              />

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default CategoriesSection;