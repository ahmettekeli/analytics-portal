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
import { formatDate, isNameValid } from "../../utils/utilities";
import { AnalyticsDataInterface } from "../../context/Interfaces";
import { StyledButton } from "../../components/Popup/Popup.styles";
import LineChart from "../../components/LineChart/LineChart";
import { colors } from "../../constants";
import OverviewProfile from "../../components/OverviewProfile/OverviewProfile";

function Details() {
  type ChartDataType = {
    installLabels: string[];
    installData: number[];
    revenueLabels: string[];
    revenueData: number[];
  };

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

  const [chartData, setChartData] = useState<ChartDataType>();

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

  function getChartData(campaign: AnalyticsDataInterface): ChartDataType {
    return {
      installLabels: campaign.installs.map((item) => item.day),
      installData: campaign.installs.map((item) => item.value),
      revenueLabels: campaign.revenue.map((item) => item.day),
      revenueData: campaign.revenue.map((item) => item.value),
    };
  }

  useEffect(() => {
    if (!isLoading) {
      const tempActiveCampaigns = analyticsData.filter((item) => item.active);
      const tempCurrentCampaign = analyticsData.find(
        (campaign) => campaign.name === name
      );
      setActiveCampaigns(tempActiveCampaigns as AnalyticsDataInterface[]);
      setCurrentCampaign(tempCurrentCampaign);
      setChartData(getChartData(tempCurrentCampaign as AnalyticsDataInterface));
    }
  }, [isLoading, analyticsData, name]);
  return (
    <Wrapper>
      <OverviewProfile
        imgUrl={currentCampaign?.icon}
        name={currentCampaign?.name}
        creationDate={
          currentCampaign?.createdAt
            ? formatDate(currentCampaign?.createdAt as Date)
            : "..."
        }
      />
      <Row>
        <RowItem>
          <LineChart
            labels={chartData?.installLabels}
            data={chartData?.installData}
            color={colors.lineChartColor}
            dataLabel="Installs"
          />
        </RowItem>
        <RowItem>
          <LineChart
            labels={chartData?.revenueLabels}
            data={chartData?.revenueData}
            color={colors.lineChartColor}
            dataLabel="revenue"
          />
        </RowItem>
      </Row>
      <StyledLine />
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
