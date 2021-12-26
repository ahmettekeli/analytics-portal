import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import Popup from "../../components/Popup/Popup";
import { actionTypes } from "../../context/ActionTypes";
import { colors } from "../../constants";
import LineChart from "../../components/LineChart/LineChart";
import OverviewProfile from "../../components/OverviewProfile/OverviewProfile";
import { StyledButton } from "../../components/Popup/Popup.styles";
import {
  CampaignControl,
  Row,
  RowItem,
  Wrapper,
  StyledLine,
} from "./Details.styles";
import { useAPI } from "../../context/Store";
import {
  formatDate,
  generateCampaign,
  getAppChartData,
  getCampaignChartData,
  isNameValid,
} from "../../utils/utilities";
import {
  AppDataInterface,
  AppChartDataType,
  CampaignChartDataType,
  CampaignType,
} from "../../context/Interfaces";

function Details() {
  const { name } = useParams();
  const {
    state: { appData, currentApp, isLoading, errorMessage },
    dispatch,
  } = useAPI();

  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    if (isNameValid(campaignName)) {
      console.log("adding campaign");
      let newCampaign: CampaignType = generateCampaign(campaignName);
      newCampaign.appId = (currentApp as AppDataInterface).id;
      console.log({ currentApp });
      dispatch({
        type: actionTypes.ADD_CAMPAIGN,
        payload: {
          app: currentApp as AppDataInterface,
          campaign: newCampaign as CampaignType,
        },
      });
      console.log("appData", appData);
      setIsPopupOpen(false);
      setNotificationMessage("Successfully Added Campaign.");
      showNotification();
      return;
    }
    setNotificationMessage("Please enter a valid Campaign name");
    showNotification();
  }

  function onSelect(value: string) {
    const tempCampaign = currentApp?.campaigns.find(
      (campaign) => campaign.name === value
    );
    setSelectedCampaignName(value);
    console.log("target val:", value);
    setCampaignChartData(getCampaignChartData(tempCampaign as CampaignType));
  }

  function populateMenuItems(campaignList: CampaignType[]) {
    //TODO prevent unnecessary rerenders here and on add campaign button click.
    console.log("populating menu items with:", campaignList);
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

  function isCampaignPathValid(): boolean {
    //TODO url ile gelinirse currentApp bos oldugundan 404 sayfasina yonlendiriliyor. !!
    const campaignPath = pathnames[pathnames.length - 1];
    if (campaignPath === currentApp?.name) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isCampaignPathValid()) {
      if (!isLoading) {
        const tempCurrentApp = appData.find((app) => app.name === name);
        setAppChartData(getAppChartData(tempCurrentApp as AppDataInterface));
      }
      if (errorMessage) {
        setNotificationMessage(errorMessage);
        showNotification();
      }
    } else {
      console.log("navigating to 404");
      navigate("/404", { replace: true });
    }
  }, [isLoading, appData, name, errorMessage]);
  return (
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
              <Select
                labelId="campaign-select-label"
                id="campaign-select"
                value={selectedCampaignName}
                label="Campaign"
                onChange={(e) => {
                  onSelect(e.target.value as string);
                }}
              >
                {populateMenuItems(currentApp?.campaigns as CampaignType[])}
              </Select>
            </FormControl>
            <StyledButton onClick={showPopup} disabled={!currentApp?.active}>
              New Campaign
            </StyledButton>
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
  );
}

export default Details;
