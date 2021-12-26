import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import capitalize from "lodash/capitalize";
import { StyledLink } from "../Card/Card.styles";
import { StyledBreadcrumbs } from "./Breadcrumbs.styles";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <StyledBreadcrumbs aria-label="breadcrumb" data-testid="Breadcrumbs">
      <StyledLink to="/">Home</StyledLink>
      {pathnames.map((value, index) => {
        value = capitalize(value);
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <StyledLink key={to} to={to}>
            {value}
          </StyledLink>
        );
      })}
    </StyledBreadcrumbs>
  );
}

export default Breadcrumbs;
