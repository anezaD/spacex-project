import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LaunchesList from "./components/LaunchesList";
import Hero from "./components/Hero";
import FetchLaunches from "./components/FetchLaunches";

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#6c757d",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  customStyles: {
    centerPosition: {
      display: "flex",
      justifyContent: "center",
      marginTop: "4rem",
      marginBottom: "4rem",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Hero />
      <FetchLaunches>
        {(filteredLaunches) => <LaunchesList launches={filteredLaunches} />}
      </FetchLaunches>
    </ThemeProvider>
  );
}

export default App;
