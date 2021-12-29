import { StyledMotionDiv } from "./Overview.styles";
import CardContainer from "components/CardContainer/CardContainer";

function Overview() {
  return (
    <StyledMotionDiv
      data-testid="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CardContainer />
    </StyledMotionDiv>
  );
}

export default Overview;
