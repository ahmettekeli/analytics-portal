import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Wrapper, StyledButton, StyledInput } from "./Popup.styles";

function Popup({
  isOpen,
  hide,
  onAdd,
}: {
  isOpen: boolean;
  hide: () => void;
  //TODO add its parameter to the function signature.
  onAdd: (campaignName: string) => void;
}) {
  const [campaignName, setCampaignName] = useState("");
  return (
    <Wrapper>
      <Dialog onClose={hide} open={isOpen}>
        <DialogTitle>Add Campaign</DialogTitle>
        <div className="input-container">
          <StyledInput
            variant="outlined"
            label="Campaign Name"
            id="campaign-name-input"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          ></StyledInput>
        </div>
        <StyledButton
          onClick={() => {
            onAdd(campaignName);
          }}
        >
          Add
        </StyledButton>
      </Dialog>
    </Wrapper>
  );
}

export default Popup;
