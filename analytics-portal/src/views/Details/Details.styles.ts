import styled from "styled-components";
import { colors } from "../../constants";

type LineType = { width: string; height: string };

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

export const CampaignControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 1rem auto;
  padding: 1rem 0;
`;

export const StyledLine = styled.hr<LineType>`
  height: ${(p) => p.width};
  width: ${(p) => p.width};
  background-color: ${colors.lineColor};
`;
