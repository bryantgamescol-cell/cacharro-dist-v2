import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  icon: string;
};

function CategoryCard({
  id,
  title,
  icon
}: Props) {

  const navigate = useNavigate();

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)"
        }
      }}
    >

      <CardActionArea
        onClick={() =>
          navigate(`/productos?category=${id}`)
        }
      >

        <CardContent
          sx={{
            py: 5,
            textAlign: "center"
          }}
        >

          <Box
            sx={{
              fontSize: 55,
              mb: 2
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {title}
          </Typography>

        </CardContent>

      </CardActionArea>

    </Card>
  );
}

export default CategoryCard;