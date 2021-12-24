import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { colors } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  margin: 0 1rem;
`;

export const StyledButton = styled(Button)`
  && {
    color: white;
    width: 100%;
    padding: 0;
    margin: 0.5rem 0;
    background-color: ${colors.addButton};
    :hover {
      background-color: ${colors.addButtonHover};
    }
  }
`;

export const StyledInput = styled(TextField)`
  && {
    width: 100%;
    margin: 0.5rem;
  }

  & label.Mui-focused {
    color: ${colors.inputBorderFocused};
  }
  & .MuiInput-underline:after {
    border-bottom-color: ${colors.inputBorderFocused};
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${colors.inputBorder};
    }
    &:hover fieldset {
      border-color: ${colors.inputBorder};
    }
    &.Mui-focused fieldset {
      border-color: ${colors.inputBorder};
    }
  }
`;
