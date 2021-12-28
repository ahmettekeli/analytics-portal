import styled from "styled-components";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { colors } from "../../configs";

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  && {
    font-weight: bold;
    font-size: 1.2rem;
    color: ${colors.cardText};
  }
`;
