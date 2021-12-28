import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import capitalize from "lodash/capitalize";
import * as S from "./Breadcrumbs.styles";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <S.StyledBreadcrumbs aria-label="breadcrumb" data-testid="Breadcrumbs">
      <S.StyledLink to="/">Home</S.StyledLink>
      {pathnames.map((value, index) => {
        value = capitalize(value);
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="textPrimary" key={to}>
            {value}
          </Typography>
        ) : (
          <S.StyledLink key={to} to={to}>
            {value}
          </S.StyledLink>
        );
      })}
    </S.StyledBreadcrumbs>
  );
}

export default Breadcrumbs;
