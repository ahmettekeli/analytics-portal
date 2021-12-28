import { StyledMotionDiv } from "./Overview.styles";
import CardContainer from "../../components/CardContainer/CardContainer";

function Overview() {
  return (
    <StyledMotionDiv>
      <CardContainer data-testid="Overview" />
    </StyledMotionDiv>
  );
}

export default Overview;
