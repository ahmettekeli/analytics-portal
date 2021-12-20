import styled from "styled-components";
import { colors } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: gray; */
  width: 80vw;

  .card-container {
    width: 100%;
    margin: 0.5rem;
  }

  .line {
    height: 1px;
    width: 90%;
    background-color: ${colors.lineColor};
  }
`;
