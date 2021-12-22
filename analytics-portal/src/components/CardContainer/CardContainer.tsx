import { useEffect, useState } from "react";
import { useAPI } from "../../context/Store";
import Card from "../Card/Card";
import { Container, Wrapper } from "./CardContainer.styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { getAvgInstalls, getAvgRevenue } from "../../utils/utilities";
import { StyledLine } from "../../views/Details/Details.styles";

function CardContainer() {
  const {
    state: { appData, isLoading, errorMessage },
  } = useAPI();
  const [isAlertVisible, setisAlertVisible] = useState(false);
  const [activeApps, setActiveApps] = useState<typeof appData>([]);
  const [inactiveApps, setInactiveApps] = useState<typeof appData>([]);

  function hideAlert() {
    setisAlertVisible(false);
  }

  function populateCards(cardList: typeof appData) {
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
      appData.forEach((item, index) => {
        if (item.active) {
          setActiveApps((prev) => [...prev, item]);
        } else {
          setInactiveApps((prev) => [...prev, item]);
        }
      });
    }
  }, [appData, isLoading]);

  return (
    <Wrapper>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Container>{populateCards(activeApps)}</Container>
          <StyledLine width="80%" height="1px" />
          <Container>{populateCards(inactiveApps)}</Container>
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
