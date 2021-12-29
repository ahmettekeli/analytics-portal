import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import usePopup from "usePopup";
import useNotification from "useNotification";
import CampaignControl from "components/CampaignControl/CampaignControl";
import Popup from "components/Popup/Popup";
import LineChart from "components/LineChart/LineChart";
import OverviewProfile from "components/OverviewProfile/OverviewProfile";
import { actionTypes } from "context/ActionTypes";
import { colors } from "configs";
import { useAPI } from "context/Store";
import { AppDataInterface } from "Interfaces";
import { AppChartDataType } from "app.types";
import { CampaignChartDataType, CampaignType } from "campaign.types";
import * as S from "./Details.styles";
import * as utils from "utils/utilities";

function Details() {
  const { name } = useParams();
  const navigate = useNavigate();
  const {
    state: { appData, currentApp, isLoading, errorMessage },
    dispatch,
  } = useAPI();
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

  const navigateTo404 = useCallback(() => {
    navigate("/404", { replace: true });
  }, [navigate]);

  function handleAddingCampaign(campaignName: string) {
    //campaign name validation.
    if (!utils.isNameValid(campaignName)) {
      setNotificationMessage("Please enter a valid Campaign name");
      showNotification();
      return;
    }
    if (
      utils.campaignAlreadyExist(campaignName, currentApp as AppDataInterface)
    ) {
      setNotificationMessage("Campaign already exist");
      showNotification();
      return;
    }
    //adding campaign to the app.
    const newCampaign: CampaignType = utils.generateCampaign(campaignName);
    newCampaign.appId = (currentApp as AppDataInterface).id;
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

  useEffect(() => {
    if (!isLoading && appData.length > 0) {
      //if url path is valid and appData is full then generate chartData for app
      if (utils.isCampaignPathValid(name as string, appData)) {
        //currentApp undefined geliyor ve isPathValid false donup 404 e yonleniyor.
        const tempCurrentApp = appData.find((app) => app.name === name);
        setAppChartData(
          utils.getAppChartData(tempCurrentApp as AppDataInterface)
        );
        if (currentApp === undefined) {
          dispatch({
            type: actionTypes.SET_CURRENT_APP,
            payload: tempCurrentApp as AppDataInterface,
          });
        }
      } else {
        //if appData is full but not valid path then navigate to 404
        navigateTo404();
      }
      if (errorMessage) {
        setNotificationMessage(errorMessage);
        showNotification();
      }
    }
  }, [isLoading, appData, name, errorMessage]);

  if (!currentApp) {
    return null;
  }

  return (
    <S.StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          autoHideDuration={2500}
          onClose={hideNotification}
          message={notificationMessage}
        />
      </S.Wrapper>
    </S.StyledMotionDiv>
  );
}

export default Details;
