import styled from "styled-components";
import { colors } from "../../constants";
//TODO Header styling.

export const StyledHeader = styled.div`
  background-color: ${colors.headerBackground};
  color: ${colors.headerText};
  margin: 2rem;
  padding: 0 2rem;
  width: 90%;
  height: 10%;
  border-radius: 0.5rem;
`;
