import { ThemeProvider, createTheme } from "@mui/material/styles";
import LaunchesList from "./components/LaunchesList";
import Hero from "./components/Hero";
import FetchLaunches from "./components/FetchLaunches";

const theme = createTheme({
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
