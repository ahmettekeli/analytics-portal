import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { StyledHeader } from "./Header.styles";

function Header() {
  return (
    <StyledHeader data-testid="Header">
      <Breadcrumbs />
    </StyledHeader>
  );
}

export default Header;
