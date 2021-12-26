import { StyledHeader } from "./Header.styles";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Header() {
  return (
    <StyledHeader data-testid="Header">
      <Breadcrumbs />
    </StyledHeader>
  );
}

export default Header;
