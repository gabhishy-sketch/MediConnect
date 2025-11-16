import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0"
    },
    secondary: {
      main: "#00acc1"
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: { textTransform: "none" }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;