import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  InputContainer,
  Wrapper,
  StyledButton,
  StyledInput,
} from "./Popup.styles";

function Popup({
  isOpen,
  hide,
  onAdd,
}: {
  isOpen: boolean;
  hide: () => void;
  onAdd: (campaignName: string) => void;
}) {
  const [campaignName, setCampaignName] = useState("");
  return (
    <Wrapper>
      <Dialog onClose={hide} open={isOpen}>
        <InputContainer>
          <StyledInput
            variant="outlined"
            label="Campaign Name"
            id="campaign-name-input"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          ></StyledInput>
          <StyledButton
            onClick={() => {
              onAdd(campaignName);
              setCampaignName("");
            }}
          >
            Add
          </StyledButton>
        </InputContainer>
      </Dialog>
    </Wrapper>
  );
}

export default Popup;
