import styled from "styled-components";
import { colors } from "configs";

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.headerBackground};
  color: ${colors.headerText};
  margin: 1rem;
  padding: 0 2rem;
  min-width: 90%;
  min-height: 10%;
  border-radius: 0.5rem;
`;
