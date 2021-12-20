import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Popup from "../../components/Popup/Popup";
import {
  CampaignControl,
  Line,
  ProfileContainer,
  ProfileItem,
  Row,
  RowItem,
  Wrapper,
  StyledSelect,
} from "./Details.styles";
import { useAPI } from "../../context/Store";
import { formatDate, isNameValid } from "../../utils/utilities";
import { AnalyticsDataInterface } from "../../context/Interfaces";
import { StyledButton } from "../../components/Popup/Popup.styles";

function Details() {
  const { name } = useParams();
  const { analyticsData, isLoading, errorMessage } = useAPI();
  const [activeCampaigns, setActiveCampaigns] = useState<
    AnalyticsDataInterface[]
  >([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<AnalyticsDataInterface>();
  const [selectedCampaignName, setSelectedCampaignName] = useState("");
  const [currentCampaign, setCurrentCampaign] =
    useState<AnalyticsDataInterface>();

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  function showPopup(): void {
    setIsPopupOpen(true);
  }

  function hideNotification() {
    setIsNotificationVisible(false);
  }

  function showNotification() {
    setIsNotificationVisible(true);
  }

  function handleAddingCampaign(campaignName: string) {
    //TODO validate campaignName.
    if (isNameValid(campaignName)) {
      console.log("adding campaign");
      //TODO generate random data here.
      setIsPopupOpen(false);
      showNotification();
      setNotificationMessage("Successfully Added Campaign.");

      return;
    }
    console.log("Name is not valid");
    //TODO show success message in snackbar here.
    showNotification();
    setNotificationMessage("Please enter a valid Campaign name");
  }

  function onSelect(value: string) {
    const tempCampaign = activeCampaigns.find(
      (campaign) => campaign.name === value
    );
    //TODO campaign baslangicta undefined, setCampaign yaptiktan sonra bile undefined kaliyor. aync ya da closure etkisi muhtemelen.
    setSelectedCampaign(tempCampaign as AnalyticsDataInterface);
    setSelectedCampaignName(value);
    console.log("target val:", value);
    console.log("selected campaign", selectedCampaign);
  }

  function populateMenuItems(campaignList: AnalyticsDataInterface[]) {
    return campaignList.map((campaign) => {
      return (
        <MenuItem key={campaign.id} value={campaign.name}>
          {campaign.name}
        </MenuItem>
      );
    });
  }

  useEffect(() => {
    if (!isLoading) {
      const tempActiveCampaigns = analyticsData.filter((item) => item.active);
      const tempCurrentCampaign = analyticsData.find(
        (campaign) => campaign.name === name
      );
      setActiveCampaigns(tempActiveCampaigns as AnalyticsDataInterface[]);
      setCurrentCampaign(tempCurrentCampaign);
    }
  }, [isLoading, analyticsData]);
  return (
    <Wrapper>
      Details page: {name}
      <ProfileContainer>
        <ProfileItem>
          <img src={currentCampaign?.icon} alt={currentCampaign?.name} />
        </ProfileItem>
        <ProfileItem>
          <h3>{name}</h3>
          <h5>{`Created at ${
            currentCampaign?.createdAt
              ? formatDate(currentCampaign?.createdAt as Date)
              : "..."
          }`}</h5>
        </ProfileItem>
      </ProfileContainer>
      <Row>
        <RowItem>Installs</RowItem>
        <RowItem>Revenue</RowItem>
      </Row>
      <Line />
      <Row>
        <RowItem>
          <CampaignControl>
            <FormControl fullWidth>
              <InputLabel id="campaign-select-label">Campaigns</InputLabel>
              <StyledSelect
                labelId="campaign-select-label"
                id="campaign-select"
                value={selectedCampaignName}
                label="Campaign"
                onChange={(e) => {
                  onSelect(e.target.value as string);
                }}
              >
                {populateMenuItems(activeCampaigns as typeof analyticsData)}
              </StyledSelect>
            </FormControl>
            <StyledButton onClick={showPopup}>New Campaign</StyledButton>
          </CampaignControl>
        </RowItem>
        <RowItem>{/* TODO dynamic graph visibility.*/}</RowItem>
      </Row>
      <Popup
        isOpen={isPopupOpen}
        hide={() => {
          setIsPopupOpen(false);
        }}
        onAdd={handleAddingCampaign}
      ></Popup>
      <Snackbar
        open={isNotificationVisible}
        autoHideDuration={4000}
        onClose={hideNotification}
        message={notificationMessage}
      />
    </Wrapper>
  );
}

export default Details;
