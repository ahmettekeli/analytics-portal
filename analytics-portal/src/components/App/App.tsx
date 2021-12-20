import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledApp } from "./App.styles";
import Home from "../../views/Home/Home";
import Overview from "../../views/Overview/Overview";
import Details from "../../views/Details/Details";
import Header from "../Header/Header";
import AnalyticsProvider from "../../context/Store";
import { routes } from "../../constants";

function App() {
  return (
    <Router>
      <StyledApp>
        <Header />
        <AnalyticsProvider>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.overview} element={<Overview />} />
            <Route path={routes.details} element={<Details />} />
          </Routes>
        </AnalyticsProvider>
      </StyledApp>
    </Router>
  );
}

export default App;
