import { useEffect, useState } from "react";
import { useAPI } from "../../context/Store";
import Card from "../Card/Card";
import { Wrapper } from "./CardContainer.styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { getAvgInstalls, getAvgRevenue } from "../../utils/utilities";
import { AnalyticsDataInterface } from "../../context/Interfaces";

function CardContainer() {
  const { analyticsData, isLoading, errorMessage } = useAPI();
  const [isAlertVisible, setisAlertVisible] = useState(false);
  const [activeCampaigns, setactiveCampaigns] = useState<typeof analyticsData>(
    []
  );
  const [inactiveCampaigns, setInactiveCampaigns] = useState<
    typeof analyticsData
  >([]);

  function hideAlert() {
    setisAlertVisible(false);
  }

  function populateCards(cardList: AnalyticsDataInterface[]) {
    return cardList.map((item) => {
      //TODO find out what is campaign and the number above it.
      return (
        <Card
          key={item.id}
          imgUrl={item.icon}
          name={item.name}
          campaignCount={0}
          installs={getAvgInstalls(item, cardList.length)}
          revenue={getAvgRevenue(item, cardList.length)}
          isActive={item.active}
        ></Card>
      );
    });
  }

  useEffect(() => {
    setisAlertVisible(errorMessage ? true : false);
  }, [errorMessage]);

  useEffect(() => {
    if (!isLoading) {
      //dividing active and inactive campaigns into their own array.
      analyticsData.map((item, index) => {
        if (item.active) {
          setactiveCampaigns((prev) => [...prev, item]);
        } else {
          setInactiveCampaigns((prev) => [...prev, item]);
        }
      });
    }
  }, [analyticsData, isLoading]);

  return (
    <Wrapper>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <div className="card-container">{populateCards(activeCampaigns)}</div>
          <hr className="line" />
          <div className="card-container">
            {populateCards(inactiveCampaigns)}
          </div>
        </>
      )}
      <Snackbar
        open={isAlertVisible}
        autoHideDuration={6000}
        onClose={hideAlert}
        message={errorMessage}
      />
    </Wrapper>
  );
}

export default CardContainer;