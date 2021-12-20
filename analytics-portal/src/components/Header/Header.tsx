import { useLocation } from "react-router-dom";
import { StyledHeader } from "./Header.styles";
import { StyledLink } from "../Card/Card.styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import capitalize from "lodash/capitalize";

function Header() {
  //TODO dynamic router breadcrumbs impl.
  const { pathname } = useLocation();
  console.log({ pathname });
  console.log(pathname.split("/"));
  return (
    <StyledHeader>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink to={pathname}>
          {capitalize(pathname.substring(1))}
        </StyledLink>
      </Breadcrumbs>
    </StyledHeader>
  );
}

export default Header;
