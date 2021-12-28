import styled from "styled-components";
import { colors } from "configs";

type PropType = { isActive: boolean };

export const Wrapper = styled.div<PropType>`
  display: flex;
  justify-content: space-around;
  margin: 0.5rem; //TODO 0.5 constan gelebilir. gap.sm vs .
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};

  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

export const DetailElement = styled.div`
  margin: 0.5rem 1rem 0 1rem;
  line-height: 0.7;

  p {
    margin: 0.5rem;
  }

  @media (max-width: 630px) {
    margin: 0px;
    line-height: 1;
  }
`;

export const NumberContainer = styled.p`
  font-weight: bold;
  color: ${colors.cardText};
`;
