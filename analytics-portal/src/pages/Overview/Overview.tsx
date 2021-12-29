import { StyledMotionDiv } from "./Overview.styles";
import CardContainer from "components/CardContainer/CardContainer";

function Overview() {
  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CardContainer data-testid="Overview" />
    </StyledMotionDiv>
  );
}

export default Overview;
