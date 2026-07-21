import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
};

function ProductCard({
  id,
  image,
  name,
  category,
  stock,
  price
}: Props) {

  const navigate = useNavigate();

  return (

    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8
        }
      }}
    >

      <CardActionArea
        onClick={() => navigate(`/productos/${id}`)}
      >

        <CardMedia
          component="img"
          height="220"
          image={
            image ||
            "https://placehold.co/600x400?text=Producto"
          }
          alt={name}
        />

      </CardActionArea>

      <CardContent>

        <Typography
          color="primary"
          fontWeight={600}
        >
          {category}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={700}
          mt={1}
        >
          {name}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >

          <Chip
            color={
              stock > 0
                ? "success"
                : "error"
            }
            label={
              stock > 0
                ? `${stock} disponibles`
                : "Agotado"
            }
          />

          <Typography
            variant="h6"
            fontWeight={700}
            color="primary"
          >
            ${price.toLocaleString("es-CO")}
          </Typography>

        </Stack>

      </CardContent>

      <CardActions>

        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            navigate(`/productos/${id}`)
          }
        >
          Ver producto
        </Button>

      </CardActions>

    </Card>

  );

}

export default ProductCard;