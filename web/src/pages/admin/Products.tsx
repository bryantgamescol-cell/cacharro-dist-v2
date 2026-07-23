import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useProducts } from "../../hooks/useProducts";
import ProductTable from "../../components/admin/products/ProductTable";

function Products() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    error
  } = useProducts({
    search
  });

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

  return (

    <Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Productos
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/admin/products/new")
          }
        >
          Nuevo producto
        </Button>

      </Box>

      <TextField
        fullWidth
        label="Buscar producto..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{
          mb: 4
        }}
      />

      <ProductTable
        products={data?.data || []}
      />

    </Box>

  );

}

export default Products;