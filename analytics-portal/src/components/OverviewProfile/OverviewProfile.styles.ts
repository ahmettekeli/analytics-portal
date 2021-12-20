import styled from "styled-components";
import { colors } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  margin: 1rem;
  padding: 1rem;
  background-color: pink;
  width: 80%;
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 1rem;
  background-color: red;

  .p {
    color: ${colors.cardText};
    font-size: 0.1em;
  }
`;
