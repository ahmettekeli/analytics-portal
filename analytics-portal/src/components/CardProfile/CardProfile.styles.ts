import styled from "styled-components";
import { colors } from "../../configs";

type PropType = { isActive: boolean };

export const Wrapper = styled.div<PropType>`

    display: flex;
    justify-content: left;
    align-items: center;
    margin 0.5rem;
    opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const ProfileImg = styled.img`
  height: 60px;
  padding: 0 0.5rem;
  border-radius: 1rem;
`;

export const NameContainer = styled.div`
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: ${colors.cardText};
  @media (max-width: 630px) {
    margin: 0px;
    line-height: 1;
  }
`;
