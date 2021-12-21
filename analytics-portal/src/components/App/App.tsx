import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.overview} element={<Overview />} />
              <Route path={routes.details} element={<Details />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </AnimatePresence>
        </AnalyticsProvider>
      </StyledApp>
    </Router>
  );
}

export default App;
