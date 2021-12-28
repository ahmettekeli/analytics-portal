import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import * as S from "./Popup.styles";

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
    <S.Wrapper data-testid="Popup">
      <Dialog onClose={hide} open={isOpen}>
        <S.InputContainer>
          <S.StyledInput
            variant="outlined"
            label="Campaign Name"
            id="campaign-name-input"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          ></S.StyledInput>
          <S.StyledButton
            onClick={() => {
              onAdd(campaignName);
              setCampaignName("");
            }}
          >
            Add
          </S.StyledButton>
        </S.InputContainer>
      </Dialog>
    </S.Wrapper>
  );
}

export default Popup;
