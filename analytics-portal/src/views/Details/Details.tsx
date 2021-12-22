import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Popup from "../../components/Popup/Popup";
import {
  CampaignControl,
  Row,
  RowItem,
  Wrapper,
  StyledLine,
  StyledSelect,
} from "./Details.styles";
import { useAPI } from "../../context/Store";
import {
  formatDate,
  getAppChartData,
  getCampaignChartData,
  isNameValid,
} from "../../utils/utilities";
import {
  AppDataInterface,
  AppChartDataType,
  CampaignChartDataType,
  CampaignDataInterface,
} from "../../context/Interfaces";
import { StyledButton } from "../../components/Popup/Popup.styles";
import LineChart from "../../components/LineChart/LineChart";
import { colors } from "../../constants";
import OverviewProfile from "../../components/OverviewProfile/OverviewProfile";
import { StyledMotionDiv } from "../Overview/Overview.styles";

function Details() {
  const { name } = useParams();
  console.log(name);
  const {
    state: { appData, campaignData, isLoading },
  } = useAPI();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentApp, setCurrentApp] = useState<AppDataInterface>();

  const [selectedCampaign, setSelectedCampaign] =
    useState<CampaignDataInterface>();
  const [selectedCampaignName, setSelectedCampaignName] = useState("");

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [appChartData, setAppChartData] = useState<AppChartDataType>();
  const [campaignChartData, setCampaignChartData] =
    useState<CampaignChartDataType>();

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
      setNotificationMessage("Successfully Added Campaign.");
      showNotification();
      return;
    }
    console.log("Name is not valid");
    //TODO show success message in snackbar here.
    setNotificationMessage("Please enter a valid Campaign name");
    showNotification();
  }

  function onSelect(value: string) {
    const tempCampaign = campaignData.find(
      (campaign) => campaign.name === value
    );
    //TODO campaign baslangicta undefined, setCampaign yaptiktan sonra bile undefined kaliyor. aync ya da closure etkisi muhtemelen.
    setSelectedCampaign(tempCampaign);
    setSelectedCampaignName(value);
    console.log("target val:", value);
    console.log("selected campaign", selectedCampaign);
    setCampaignChartData(
      getCampaignChartData(tempCampaign as CampaignDataInterface)
    );
  }

  function populateMenuItems(campaignList: CampaignDataInterface[]) {
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
      const tempCurrentApp = appData.find((app) => app.name === name);
      setAppChartData(getAppChartData(tempCurrentApp as AppDataInterface));
      setCurrentApp(tempCurrentApp);
    }
  }, [isLoading, campaignData, name]);
  return (
    <StyledMotionDiv>
      <Wrapper>
        <OverviewProfile
          imgUrl={currentApp?.icon}
          name={currentApp?.name}
          creationDate={
            currentApp?.createdAt
              ? formatDate(currentApp?.createdAt as Date)
              : "..."
          }
        />
        <Row>
          <RowItem>
            <LineChart
              labels={appChartData?.installLabels}
              data={appChartData?.installData}
              color={colors.lineChartColor}
              dataLabel="Installs"
            />
          </RowItem>
          <RowItem>
            <LineChart
              labels={appChartData?.revenueLabels}
              data={appChartData?.revenueData}
              color={colors.lineChartColor}
              dataLabel="revenue"
            />
          </RowItem>
        </Row>
        <StyledLine width="40%" height="1px" />
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
                  {populateMenuItems(campaignData)}
                </StyledSelect>
              </FormControl>
              <StyledButton onClick={showPopup}>New Campaign</StyledButton>
            </CampaignControl>
          </RowItem>
          <RowItem>
            <LineChart
              labels={campaignChartData?.installLabels}
              data={campaignChartData?.installData}
              color={colors.lineChartColor}
              dataLabel="Installs"
            />
          </RowItem>
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
    </StyledMotionDiv>
  );
}

export default Details;
