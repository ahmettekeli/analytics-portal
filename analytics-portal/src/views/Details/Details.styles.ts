import styled from "styled-components";
import Select from "@material-ui/core/Select";
import { colors } from "../../constants";

//TODO Details page styling.
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 0.5rem;
  width: 90%;
  height: 50%;
`;

export const RowItem = styled.div`
  width: 50%;
  margin: 1rem;
  background-color: lightgray;
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

export const Line = styled.hr`
  height: 1px;
  width: 40%;
  background-color: ${colors.lineColor};
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: left;
  margin: 1rem;
  padding: 1rem;
  background-color: pink;
  width: 100%;
  height: 30%;
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 1rem;
  background-color: red;
`;

export const StyledSelect = styled(Select)``;
