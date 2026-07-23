import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import api from "../../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function login() {

    try {

      setLoading(true);

      setError("");

      const { data } = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/admin/dashboard");

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Credenciales incorrectas"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Container
      maxWidth="sm"
      sx={{
        mt: 10
      }}
    >

      <Paper
        sx={{
          p: 5,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >

          Panel Administrativo

        </Typography>

        {error && (

          <Alert
            severity="error"
            sx={{
              mb: 3
            }}
          >
            {error}
          </Alert>

        )}

        <TextField
          fullWidth
          label="Correo"
          margin="normal"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          margin="normal"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <Box mt={4}>

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            onClick={login}
          >
            {loading
              ? "Ingresando..."
              : "Ingresar"}
          </Button>

        </Box>

      </Paper>

    </Container>

  );

}

export default Login;