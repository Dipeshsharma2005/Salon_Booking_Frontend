import { createTheme } from "@mui/material";

export const greenLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#019031", // green
    },
    secondary: {
      main: "#EAF0F1", // light gray
    },
      background: {
        default: "#ffffff",
        paper: "#f2f6fd", // light background
    },
  },
});

export const greenDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#019031", // same green
    },
    secondary: {
      main: "#EAF0F1", // can adjust if too light
    },
    background: {
      default: "#010101", // dark background
      paper: "#1E1E1E",
    },
  },
});
