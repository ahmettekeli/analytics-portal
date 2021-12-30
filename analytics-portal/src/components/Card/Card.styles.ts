import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "configs";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.cardBackground};
  margin: 1rem 0;
  border-radius: 0.5rem;
  width: 100%;

  @media (max-width: 350px) {
    width: 350px;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  width: 100%;
  justify-content: space-between;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
