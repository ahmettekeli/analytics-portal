import styled from "styled-components";
import { colors } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  margin: 1rem;
  padding: 0.5rem;
  min-width: 100%;
  min-height: 10%;
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;

  p {
    color: ${colors.dateText};
    font-size: 0.6rem;
    font-weight: bold;
    padding: 1rem 0;
  }

  img {
    width: 8rem;
    height: 8rem;
  }
`;

export const NameContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
`;
