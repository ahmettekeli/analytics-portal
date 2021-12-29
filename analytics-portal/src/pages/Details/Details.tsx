import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { actionTypes } from "context/ActionTypes";
import { useAPI } from "context/Store";
import { colors } from "configs";
import CampaignControl from "components/CampaignControl/CampaignControl";
import Popup from "components/Popup/Popup";
import LineChart from "components/LineChart/LineChart";
import OverviewProfile from "components/OverviewProfile/OverviewProfile";
import * as S from "./Details.styles";
import * as utils from "utils/utilities";
import {
  AppDataInterface,
  AppChartDataType,
  CampaignChartDataType,
  CampaignType,
} from "context/Interfaces";
import usePopup from "usePopup";
import useNotification from "useNotification";

function Details() {
  const { name } = useParams();
  const {
    state: { appData, currentApp, isLoading, errorMessage },
    dispatch,
  } = useAPI();

  const navigate = useNavigate();

  const { visible: popupVisibility, hidePopup, showPopup } = usePopup();

  const {
    showNotification,
    hideNotification,
    visible: notificationVisibility,
  } = useNotification();

  const [notificationMessage, setNotificationMessage] = useState("");

  const [appChartData, setAppChartData] = useState<AppChartDataType>();
  const [campaignChartData, setCampaignChartData] =
    useState<CampaignChartDataType>();

  const isCampaignPathValid = useCallback(() => {
    return utils.isCampaignPathValid(
      name as string,
      currentApp?.name as string
    );
  }, [currentApp, name]);

  const navigateTo404 = useCallback(() => {
    navigate("/404", { replace: true });
  }, [navigate]);

  //TODO - refactor this
  function handleAddingCampaign(campaignName: string) {
    if (!utils.isNameValid(campaignName)) {
      setNotificationMessage("Please enter a valid Campaign name");
      showNotification();
      return;
    }
    const newCampaign: CampaignType = utils.generateCampaign(campaignName);
    newCampaign.appId = (currentApp as AppDataInterface).id;
    console.log({ currentApp });
    dispatch({
      type: actionTypes.ADD_CAMPAIGN,
      payload: {
        app: currentApp as AppDataInterface,
        campaign: newCampaign as CampaignType,
      },
    });
    hidePopup();
    setNotificationMessage("Successfully Added Campaign.");
    showNotification();
  }

  function onSelect(value: string) {
    //Finding related campaign and getting chart data for it.
    const tempCampaign = currentApp?.campaigns.find(
      (campaign) => campaign.name === value
    );
    setCampaignChartData(
      utils.getCampaignChartData(tempCampaign as CampaignType)
    );
  }

  //TODO - refactor this navigating 404 e gidip duruyor. overview/id path inde yenileyince 404 e yonlenmemeli.
  useEffect(() => {
    if (!isLoading) {
      if (isCampaignPathValid()) {
        const tempCurrentApp = appData.find((app) => app.name === name);
        setAppChartData(
          utils.getAppChartData(tempCurrentApp as AppDataInterface)
        );
        if (currentApp === undefined) {
          dispatch({
            type: actionTypes.SET_CURRENT_APP,
            payload: tempCurrentApp as AppDataInterface,
          });
          console.log("currentApp was undefined,", tempCurrentApp, name);
        }
      } else {
        console.log("navigating to 404");
        // navigateTo404();
      }
      if (errorMessage) {
        setNotificationMessage(errorMessage);
        showNotification();
      }
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
          <CampaignControl
            campaignList={currentApp?.campaigns}
            onSelect={(value: string) => {
              onSelect(value);
            }}
            onNewCampaign={showPopup}
            disabled={!currentApp?.active}
          />
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
        isOpen={popupVisibility}
        hide={() => {
          hidePopup();
        }}
        onAdd={handleAddingCampaign}
      ></Popup>
      <Snackbar
        open={notificationVisibility}
        autoHideDuration={4000}
        onClose={hideNotification}
        message={notificationMessage}
      />
    </S.Wrapper>
  );
}

export default Details;
