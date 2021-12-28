import styled from "styled-components";
import { colors } from "configs";
import { StyledButton } from "components/Popup/Popup.styles";

type LineType = { width: string };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 0.5rem;
  min-width: 90%;
`;

export const RowItem = styled.div`
  width: 50%;
  margin: 1rem;
`;

export const StyledLine = styled.hr<LineType>`
  height: 1px;
  width: ${(p) => p.width};
  background-color: ${colors.lineColor};
`;

export { StyledButton };
