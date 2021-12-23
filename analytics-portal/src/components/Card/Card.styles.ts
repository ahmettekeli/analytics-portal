import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../constants";

type PropType = { isActive: boolean };

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.cardBackground};
  margin: 1rem 0;
  border-radius: 0.5rem;
  width: 100%;
`;
export const CardProfile = styled.div<PropType>`

    display: flex;
    justify-content: left;
    align-items: center;
    margin 0.5rem;
    opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const CardProfileImg = styled.img`
  height: 60px;
  padding: 0 0.5rem;
  border-radius: 1rem;
`;

export const CardDetail = styled.div<PropType>`
  display: flex;
  justify-content: space-around;
  margin: 0.5rem;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const CardDetailElement = styled.div`
  margin: 0.5rem 1rem 0 1rem;
  line-height: 0.5;
`;

export const NameContainer = styled.div`
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${colors.cardText};
`;

export const NumberContainer = styled.p`
  font-weight: bold;
  color: ${colors.cardText};
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

//TODO add media query for mobile.
//below 600px width
