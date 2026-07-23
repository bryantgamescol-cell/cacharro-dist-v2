import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../../services/api";

import { useCategories } from "../../../hooks/useCategories";
import { useBrands } from "../../../hooks/useBrands";
import { useSuppliers } from "../../../hooks/useSuppliers";
import { useCreateProduct } from "../../../hooks/useCreateProduct";
import { useUploadProductImage } from "../../../hooks/useUploadProductImage";

function ProductForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const editing = Boolean(id);

  const { data: categories } = useCategories();

  const { data: brands } = useBrands();

  const { data: suppliers } = useSuppliers();

  const createProduct = useCreateProduct();

  const uploadImage = useUploadProductImage();

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [form, setForm] = useState({

    name: "",

    description: "",

    purchasePrice: "",

    salePrice: "",

    stock: "",

    sku: "",

    barcode: "",

    categoryId: "",

    brandId: "",

    supplierId: "",

    image: ""

  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    setImagePreview(URL.createObjectURL(file));

  };

  useEffect(() => {

    if (!editing) return;

    const loadProduct = async () => {

      try {

        setLoading(true);

        const { data } = await api.get(
          `/products/${id}`
        );

        const product = data;

        setForm({

          name: product.name,

          description:
            product.description || "",

          purchasePrice:
            String(product.purchasePrice),

          salePrice:
            String(product.salePrice),

          stock:
            String(product.stock),

          sku:
            product.sku || "",

          barcode:
            product.barcode || "",

          categoryId:
            product.categoryId,

          brandId:
            product.brandId,

          supplierId:
            product.supplierId || "",

          image:
            product.image || ""

        });

        if (product.image) {

          setImagePreview(
            `${import.meta.env.VITE_API_URL}${product.image}`
          );

        }

      } catch {

        Swal.fire({

          icon: "error",

          title: "Producto no encontrado"

        });

        navigate("/admin/products");

      } finally {

        setLoading(false);

      }

    };

    loadProduct();

  }, [editing, id]);
    const handleSubmit = async () => {

    try {

      if (
        !form.name ||
        !form.purchasePrice ||
        !form.salePrice ||
        !form.stock ||
        !form.categoryId ||
        !form.brandId
      ) {

        return Swal.fire({

          icon: "warning",

          title: "Completa todos los campos obligatorios"

        });

      }

      let image = form.image;

      if (selectedImage) {

        const response =
          await uploadImage.mutateAsync(selectedImage);

        image = response.path;

      }

      const body = {

        ...form,

        image,

        purchasePrice: Number(form.purchasePrice),

        salePrice: Number(form.salePrice),

        stock: Number(form.stock)

      };

      if (editing) {

        await api.put(`/products/${id}`, body);

      } else {

        await createProduct.mutateAsync(body);

      }

      Swal.fire({

        icon: "success",

        title: editing
          ? "Producto actualizado"
          : "Producto creado",

        timer: 1800,

        showConfirmButton: false

      });

      navigate("/admin/products");

    } catch (error: any) {

      Swal.fire({

        icon: "error",

        title: "Error",

        text:
          error.response?.data?.message ||
          "No fue posible guardar"

      });

    }

  };

  if (loading) {

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

  return (

    <Paper
      sx={{
        p: 4,
        borderRadius: 4
      }}
    >

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >

        {editing
          ? "Editar producto"
          : "Nuevo producto"}

      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={12}>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Precio compra"
            name="purchasePrice"
            type="number"
            value={form.purchasePrice}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Precio venta"
            name="salePrice"
            type="number"
            value={form.salePrice}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Código de barras"
            name="barcode"
            value={form.barcode}
            onChange={handleChange}
          />

        </Grid>
                <Grid size={{ xs: 12, md: 4 }}>

          <TextField
            fullWidth
            select
            label="Categoría"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >

            <MenuItem value="">
              Seleccione...
            </MenuItem>

            {categories?.data?.map((category: any) => (

              <MenuItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <TextField
            fullWidth
            select
            label="Marca"
            name="brandId"
            value={form.brandId}
            onChange={handleChange}
          >

            <MenuItem value="">
              Seleccione...
            </MenuItem>

            {brands?.data?.map((brand: any) => (

              <MenuItem
                key={brand.id}
                value={brand.id}
              >
                {brand.name}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <TextField
            fullWidth
            select
            label="Proveedor"
            name="supplierId"
            value={form.supplierId}
            onChange={handleChange}
          >

            <MenuItem value="">
              Ninguno
            </MenuItem>

            {suppliers?.data?.map((supplier: any) => (

              <MenuItem
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

        <Grid size={12}>

          <Stack
            direction={{
              xs: "column",
              md: "row"
            }}
            spacing={3}
            alignItems="center"
          >

            <Avatar
              src={imagePreview}
              variant="rounded"
              sx={{
                width: 150,
                height: 150
              }}
            />

            <Button
              component="label"
              variant="outlined"
              size="large"
            >

              Seleccionar imagen

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

            </Button>

          </Stack>

        </Grid>

        <Grid size={12}>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >

            <Button
              variant="outlined"
              onClick={() =>
                navigate("/admin/products")
              }
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={
                createProduct.isPending ||
                uploadImage.isPending
              }
            >

              {editing
                ? "Actualizar producto"
                : "Guardar producto"}

            </Button>

          </Stack>

        </Grid>

      </Grid>

    </Paper>

  );

}

export default ProductForm;