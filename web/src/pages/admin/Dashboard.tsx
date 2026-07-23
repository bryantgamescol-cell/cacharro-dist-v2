import {
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Typography
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PaidIcon from "@mui/icons-material/Paid";
import WarehouseIcon from "@mui/icons-material/Warehouse";

import { useDashboard } from "../../hooks/useDashboard";

function Dashboard() {

  const { data, isLoading, error } = useDashboard();

  if (isLoading)
    return <CircularProgress />;

  if (error)
    return (
      <Alert severity="error">
        Error cargando dashboard
      </Alert>
    );

  const stats = data.data;

  const cards = [

    {
      title: "Productos",
      value: stats.products,
      icon: <Inventory2Icon fontSize="large" />
    },

    {
      title: "Categorías",
      value: stats.categories,
      icon: <CategoryIcon fontSize="large" />
    },

    {
      title: "Usuarios",
      value: stats.users,
      icon: <PersonIcon fontSize="large" />
    },

    {
      title: "Stock Bajo",
      value: stats.lowStock,
      icon: <WarningAmberIcon fontSize="large" />
    },

    {
      title: "Unidades",
      value: stats.inventoryUnits,
      icon: <WarehouseIcon fontSize="large" />
    },

    {
      title: "Valor Inventario",
      value:
        "$" +
        stats.inventoryValue.toLocaleString("es-CO"),
      icon: <PaidIcon fontSize="large" />
    }

  ];

  return (

    <>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        {cards.map((card) => (

          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
          >

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <div>

                <Typography
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {card.value}
                </Typography>

              </div>

              {card.icon}

            </Paper>

          </Grid>

        ))}

      </Grid>

    </>

  );

}

export default Dashboard;