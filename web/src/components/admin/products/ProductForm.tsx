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

  /*
  |--------------------------------------------------------------------------
  | CAMBIAR CAMPOS
  |--------------------------------------------------------------------------
  */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]: e.target.value

    }));

  };

  /*
  |--------------------------------------------------------------------------
  | SELECCIONAR IMAGEN
  |--------------------------------------------------------------------------
  */

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    /*
    |----------------------------------------------------------------------
    | Validar tamaño
    |----------------------------------------------------------------------
    */

    if (file.size > 5 * 1024 * 1024) {

      Swal.fire({

        icon: "warning",

        title: "Imagen demasiado grande",

        text: "La imagen no puede superar los 5 MB."

      });

      return;

    }

    /*
    |----------------------------------------------------------------------
    | Validar tipo
    |----------------------------------------------------------------------
    */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

      Swal.fire({

        icon: "warning",

        title: "Formato no permitido",

        text: "Solo se permiten imágenes JPG, PNG o WEBP."

      });

      return;

    }

    /*
    |----------------------------------------------------------------------
    | Guardamos archivo
    |----------------------------------------------------------------------
    */

    setSelectedImage(file);

    /*
    |----------------------------------------------------------------------
    | Previsualización local
    |----------------------------------------------------------------------
    */

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

  };

  /*
  |--------------------------------------------------------------------------
  | CARGAR PRODUCTO CUANDO ESTAMOS EDITANDO
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!editing) return;

    const loadProduct = async () => {

      try {

        setLoading(true);

        const { data } = await api.get(
          `/products/${id}`
        );

        const product = data;

        /*
        |------------------------------------------------------------------
        | Cargar información del producto
        |------------------------------------------------------------------
        */

        setForm({

          name:
            product.name || "",

          description:
            product.description || "",

          purchasePrice:
            String(product.purchasePrice ?? ""),

          salePrice:
            String(product.salePrice ?? ""),

          stock:
            String(product.stock ?? ""),

          sku:
            product.sku || "",

          barcode:
            product.barcode || "",

          categoryId:
            product.categoryId || "",

          brandId:
            product.brandId || "",

          supplierId:
            product.supplierId || "",

          image:
            product.image || ""

        });

        /*
        |------------------------------------------------------------------
        | MUY IMPORTANTE:
        |
        | product.image ahora debe ser la URL de Cloudinary.
        |
        | NO agregamos /uploads.
        |------------------------------------------------------------------
        */

        if (product.image) {

          setImagePreview(
            product.image
          );

        }

      } catch (error) {

        console.error(
          "Error cargando producto:",
          error
        );

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

  }, [editing, id, navigate]);

  /*
  |--------------------------------------------------------------------------
  | GUARDAR PRODUCTO
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async () => {

    try {

      /*
      |--------------------------------------------------------------------
      | VALIDACIONES
      |--------------------------------------------------------------------
      */

      if (
        !form.name ||
        !form.purchasePrice ||
        !form.salePrice ||
        !form.stock ||
        !form.categoryId ||
        !form.brandId
      ) {

        await Swal.fire({

          icon: "warning",

          title:
            "Completa todos los campos obligatorios"

        });

        return;

      }

      /*
      |--------------------------------------------------------------------
      | IMAGEN ACTUAL
      |
      | Si estamos editando y no seleccionamos otra imagen,
      | conservamos la URL que ya estaba guardada.
      |--------------------------------------------------------------------
      */

      let image = form.image;

      /*
      |--------------------------------------------------------------------
      | SI SE SELECCIONÓ UNA NUEVA IMAGEN
      |
      | Primero la subimos a Cloudinary.
      |--------------------------------------------------------------------
      */

      if (selectedImage) {

        const response =
          await uploadImage.mutateAsync(
            selectedImage
          );

        /*
        |------------------------------------------------------------------
        | AQUÍ ESTÁ EL CAMBIO IMPORTANTE
        |
        | Guardamos directamente la URL de Cloudinary.
        |------------------------------------------------------------------
        */

        image = response.url;

      }

      /*
      |--------------------------------------------------------------------
      | DATOS DEL PRODUCTO
      |--------------------------------------------------------------------
      */

      const body = {

        ...form,

        image,

        purchasePrice:
          Number(form.purchasePrice),

        salePrice:
          Number(form.salePrice),

        stock:
          Number(form.stock)

      };

      console.log(
        "Producto que se enviará:",
        body
      );

      /*
      |--------------------------------------------------------------------
      | ACTUALIZAR
      |--------------------------------------------------------------------
      */

      if (editing) {

        await api.put(
          `/products/${id}`,
          body
        );

      }

      /*
      |--------------------------------------------------------------------
      | CREAR
      |--------------------------------------------------------------------
      */

      else {

        await createProduct.mutateAsync(
          body
        );

      }

      /*
      |--------------------------------------------------------------------
      | MENSAJE DE ÉXITO
      |--------------------------------------------------------------------
      */

      await Swal.fire({

        icon: "success",

        title: editing
          ? "Producto actualizado"
          : "Producto creado",

        timer: 1800,

        showConfirmButton: false

      });

      /*
      |--------------------------------------------------------------------
      | VOLVER A PRODUCTOS
      |--------------------------------------------------------------------
      */

      navigate("/admin/products");

    } catch (error: any) {

      console.error(
        "Error guardando producto:",
        error
      );

      Swal.fire({

        icon: "error",

        title: "Error",

        text:
          error.response?.data?.message ||
          "No fue posible guardar el producto"

      });

    }

  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | FORMULARIO
  |--------------------------------------------------------------------------
  */

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

      <Grid
        container
        spacing={3}
      >

        {/* NOMBRE */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

        </Grid>

        {/* STOCK */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />

        </Grid>

        {/* DESCRIPCIÓN */}

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

        {/* PRECIO COMPRA */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="Precio compra"
            name="purchasePrice"
            type="number"
            value={form.purchasePrice}
            onChange={handleChange}
          />

        </Grid>

        {/* PRECIO VENTA */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="Precio venta"
            name="salePrice"
            type="number"
            value={form.salePrice}
            onChange={handleChange}
          />

        </Grid>

        {/* SKU */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />

        </Grid>

        {/* CÓDIGO DE BARRAS */}

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >

          <TextField
            fullWidth
            label="Código de barras"
            name="barcode"
            value={form.barcode}
            onChange={handleChange}
          />

        </Grid>

        {/* CATEGORÍA */}

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

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

            {Array.isArray(categories?.data) &&
              categories.data.map(
                (category: any) => (

                  <MenuItem
                    key={category.id}
                    value={category.id}
                  >

                    {category.name}

                  </MenuItem>

                )
              )}

          </TextField>

        </Grid>

        {/* MARCA */}

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

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

            {Array.isArray(brands?.data) &&
              brands.data.map(
                (brand: any) => (

                  <MenuItem
                    key={brand.id}
                    value={brand.id}
                  >

                    {brand.name}

                  </MenuItem>

                )
              )}

          </TextField>

        </Grid>

        {/* PROVEEDOR */}

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

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

            {Array.isArray(suppliers?.data) &&
              suppliers.data.map(
                (supplier: any) => (

                  <MenuItem
                    key={supplier.id}
                    value={supplier.id}
                  >

                    {supplier.name}

                  </MenuItem>

                )
              )}

          </TextField>

        </Grid>

        {/* IMAGEN */}

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

            <Box>

              <Button
                component="label"
                variant="outlined"
                size="large"
              >

                Seleccionar imagen

                <input
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImage}
                />

              </Button>

              {selectedImage && (

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                >

                  {selectedImage.name}

                </Typography>

              )}

            </Box>

          </Stack>

        </Grid>

        {/* BOTONES */}

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

              {uploadImage.isPending
                ? "Subiendo imagen..."
                : editing
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