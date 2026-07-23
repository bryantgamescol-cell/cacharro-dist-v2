import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { useDeleteProduct } from "../../../hooks/useDeleteProduct";

type Props = {
  products: any[];
};

function ProductTable({ products }: Props) {

  const navigate = useNavigate();

  const deleteMutation = useDeleteProduct();

  const columns: GridColDef[] = [

    {
      field: "image",
      headerName: "Imagen",
      width: 90,

      renderCell: (params) => (

        <Avatar
          variant="rounded"
          src={
            params.row.image
              ? `${import.meta.env.VITE_API_URL}${params.row.image}`
              : ""
          }
          sx={{
            width: 50,
            height: 50
          }}
        />

      )

    },

    {
      field: "name",
      headerName: "Producto",
      flex: 1
    },

    {
      field: "category",
      headerName: "Categoría",
      flex: 1,

      valueGetter: (_, row) =>
        row.category?.name
    },

    {
      field: "purchasePrice",
      headerName: "Compra",
      width: 120,

      valueFormatter: (value) =>
        "$" +
        Number(value).toLocaleString("es-CO")
    },

    {
      field: "salePrice",
      headerName: "Venta",
      width: 120,

      valueFormatter: (value) =>
        "$" +
        Number(value).toLocaleString("es-CO")
    },

    {
      field: "stock",
      headerName: "Stock",
      width: 120,

      renderCell: (params) => (

        <Chip
          color={
            params.row.stock <= 5
              ? "error"
              : "success"
          }
          label={params.row.stock}
        />

      )

    },

    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,

      sortable: false,

      renderCell: (params) => (

        <Box>

          <Tooltip title="Editar">

            <IconButton
              color="primary"
              onClick={() =>
                navigate(
                  `/admin/products/${params.row.id}/edit`
                )
              }
            >

              <EditIcon />

            </IconButton>

          </Tooltip>

          <Tooltip title="Eliminar">

            <IconButton
              color="error"
              onClick={async () => {

                const result = await Swal.fire({

                  title: "¿Eliminar producto?",

                  text: "Esta acción no se puede deshacer.",

                  icon: "warning",

                  showCancelButton: true,

                  confirmButtonText: "Eliminar",

                  cancelButtonText: "Cancelar"

                });

                if (!result.isConfirmed) return;

                deleteMutation.mutate(params.row.id);

              }}
            >

              <DeleteIcon />

            </IconButton>

          </Tooltip>

        </Box>

      )

    }

  ];

  return (

    <DataGrid
      autoHeight
      rows={products}
      columns={columns}
      getRowId={(row) => row.id}
      pageSizeOptions={[5, 10, 20, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10
          }
        }
      }}
    />

  );

}

export default ProductTable;