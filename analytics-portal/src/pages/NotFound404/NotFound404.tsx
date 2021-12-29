import { Wrapper, StyledMotionDiv } from "./NotFound404.styles";

function NotFound404() {
  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper data-testid="NotFound404">
        <h1>404</h1>
        <h2>Page not found</h2>
      </Wrapper>
    </StyledMotionDiv>
  );
}

export default NotFound404;
