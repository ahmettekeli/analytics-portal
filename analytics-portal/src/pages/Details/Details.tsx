import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import Popup from "../../components/Popup/Popup";
import { actionTypes } from "../../context/ActionTypes";
import { colors } from "../../configs";
import LineChart from "../../components/LineChart/LineChart";
import OverviewProfile from "../../components/OverviewProfile/OverviewProfile";
import { StyledButton } from "../../components/Popup/Popup.styles";
import * as S from "./Details.styles";
import { useAPI } from "../../context/Store";
import * as utils from "../../utils/utilities";
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

  // const [showNotification, hideNotification] = useNotification(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [appChartData, setAppChartData] = useState<AppChartDataType>();
  const [campaignChartData, setCampaignChartData] =
    useState<CampaignChartDataType>();

  const isCampaignPathValid = useCallback(() => {
    return utils.isCampaignPathValid(pathnames, currentApp?.name as string);
  }, []);

  const navigateTo404 = useCallback(() => {
    navigate("/404", { replace: true });
  }, [navigate]);
  // utils.isCampaignPathValid(pathnames, currentApp?.name as string)

  //TODO useNotification, usePopup custom hooklari olusturulabilir.

  function showPopup(): void {
    setIsPopupOpen(true);
  }

  function hideNotification() {
    setIsNotificationVisible(false);
  }

  function showNotification() {
    setIsNotificationVisible(true);
  }

  //TODO - refactor this
  function handleAddingCampaign(campaignName: string) {
    if (!utils.isNameValid(campaignName)) {
      setNotificationMessage("Please enter a valid Campaign name");
      showNotification();
      return;
    }
    console.log("adding campaign");
    let newCampaign: CampaignType = utils.generateCampaign(campaignName);
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
  }

  function onSelect(value: string) {
    const tempCampaign = currentApp?.campaigns.find(
      (campaign) => campaign.name === value
    );
    setSelectedCampaignName(value);
    console.log("target val:", value);
    setCampaignChartData(
      utils.getCampaignChartData(tempCampaign as CampaignType)
    );
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

  useEffect(() => {
    if (isCampaignPathValid()) {
      if (!isLoading) {
        const tempCurrentApp = appData.find((app) => app.name === name);
        setAppChartData(
          utils.getAppChartData(tempCurrentApp as AppDataInterface)
        );
      }
      if (errorMessage) {
        setNotificationMessage(errorMessage);
        showNotification();
      }
    } else {
      console.log("navigating to 404");
      navigateTo404();
    }
  }, [
    isLoading,
    appData,
    name,
    errorMessage,
    isCampaignPathValid,
    navigateTo404,
  ]);

  if (!currentApp) {
    return null;
  }

  return (
    <S.Wrapper>
      <OverviewProfile
        imgUrl={currentApp?.icon}
        name={currentApp?.name}
        creationDate={
          currentApp?.createdAt
            ? utils.formatDate(currentApp?.createdAt as Date)
            : "..."
        }
      />
      <S.Row>
        <S.RowItem>
          <LineChart
            labels={appChartData?.installLabels}
            data={appChartData?.installData}
            color={colors.lineChartColor}
            dataLabel="Installs"
          />
        </S.RowItem>
        <S.RowItem>
          <LineChart
            labels={appChartData?.revenueLabels}
            data={appChartData?.revenueData}
            color={colors.lineChartColor}
            dataLabel="revenue"
          />
        </S.RowItem>
      </S.Row>
      <S.StyledLine width="40%" />
      <S.Row>
        <S.RowItem>
          <S.CampaignControl>
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
          </S.CampaignControl>
        </S.RowItem>
        <S.RowItem>
          <LineChart
            labels={campaignChartData?.installLabels}
            data={campaignChartData?.installData}
            color={colors.lineChartColor}
            dataLabel="Installs"
          />
        </S.RowItem>
      </S.Row>
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
    </S.Wrapper>
  );
}

export default Details;
