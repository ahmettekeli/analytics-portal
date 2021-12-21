import { useLocation } from "react-router-dom";
import { StyledHeader } from "./Header.styles";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Header() {
  //TODO dynamic router breadcrumbs impl.
  const { pathname } = useLocation();
  console.log({ pathname });
  console.log(pathname.split("/"));
  return (
    <StyledHeader>
      <Breadcrumbs />
    </StyledHeader>
  );
}

export default Header;
