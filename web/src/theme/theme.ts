import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    primary: {
      main: "#16B7F5"
    },

    secondary: {
      main: "#041B44"
    },

    background: {

      default: "#F4F7FB",

      paper: "#FFFFFF"

    }

  },

  shape: {

    borderRadius: 12

  },

  typography: {

    fontFamily: "'Poppins', sans-serif"

  }

});

export default theme;