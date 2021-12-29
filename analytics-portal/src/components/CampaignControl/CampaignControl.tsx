import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as S from "./CampaignControl.styles";
import { CampaignType } from "campaign.types";

function CampaignControl({
  campaignList,
  onSelect,
  onNewCampaign,
  disabled,
}: {
  campaignList: CampaignType[];
  onSelect: (value: string) => void;
  onNewCampaign: () => void;
  disabled: boolean;
}) {
  const [campaign, setCampaign] = useState("");

  function populateMenuItems(campaignList: CampaignType[]) {
    if (campaignList) {
      return campaignList.map((campaign) => {
        return (
          <MenuItem key={campaign.id} value={campaign.name}>
            {campaign.name}
          </MenuItem>
        );
      });
    }
  }

  return (
    <S.Wrapper>
      <FormControl fullWidth>
        <InputLabel id="campaign-select-label">Campaigns</InputLabel>
        <Select
          labelId="campaign-select-label"
          id="campaign-select"
          value={campaign}
          label="Campaign"
          onChange={(e) => {
            setCampaign(e.target.value as string);
            onSelect(e.target.value as string);
          }}
        >
          {populateMenuItems(campaignList)}
        </Select>
      </FormControl>
      <S.StyledButton onClick={onNewCampaign} disabled={disabled}>
        New Campaign
      </S.StyledButton>
    </S.Wrapper>
  );
}

export default CampaignControl;
