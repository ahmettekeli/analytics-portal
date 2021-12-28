import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledApp } from "./App.styles";
import AnalyticsProvider from "../../context/Store";
import Details from "../../pages/Details/Details";
import Header from "../../components/Header/Header";
import Home from "../../pages/Home/Home";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import Overview from "../../pages/Overview/Overview";
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
            <Route path={routes.notFound} element={<NotFound404 />} />
            <Route element={<NotFound404 />} />
          </Routes>
        </AnalyticsProvider>
      </StyledApp>
    </Router>
  );
}

export default App;
