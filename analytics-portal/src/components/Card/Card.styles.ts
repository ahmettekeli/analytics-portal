import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.cardBackground};
  margin: 1rem 0;
  border-radius: 0.5rem;
  width: 100%;

  .card-profile {
    display: flex;
    justify-content: left;
    align-items: center;
    margin 0.5rem;


    img{
        height: 60px;
        padding: 0 0.5rem;
        border-radius: 1rem;
    }
    div{
        padding: 0.5rem;
    }
  }

  .card-detail {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem;
  }

  .card-detail-element{
      margin: 0.5rem;

  }

  .inactive{
    opacity: 0.5 !important;
  }

  //TODO add media query for mobile.
  //below 600px width

  `;
export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
