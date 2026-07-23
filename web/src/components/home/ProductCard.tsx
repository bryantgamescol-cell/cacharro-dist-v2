import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box
} from "@mui/material";

type Props = {
  id: string;
  image?: string;
  name: string;
  description?: string;
  category: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
};

function ProductCard({
  id,
  image,
  name,
  description,
  category,
  stock,
  purchasePrice,
  salePrice
}: Props) {

  const apiUrl =
    import.meta.env.VITE_API_URL.replace("/api", "");

  const imageUrl = image
    ? `${apiUrl}${image}`
    : "https://placehold.co/600x400?text=Sin+Imagen";

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: ".25s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8
        }
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={imageUrl}
        alt={name}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mb={2}
        >
          <Chip
            label={category}
            color="primary"
            size="small"
          />

          <Chip
            label={`Stock ${stock}`}
            color={stock > 0 ? "success" : "error"}
            size="small"
          />
        </Stack>

        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Precio de compra
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
          >
            ${purchasePrice.toLocaleString()}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={2}
          >
            Precio sugerido
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            ${salePrice.toLocaleString()}
          </Typography>

          <Button
            component={Link}
            to={`/productos/${id}`}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: 3
            }}
          >
            Ver detalles
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;