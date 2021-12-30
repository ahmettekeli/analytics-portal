import { useEffect, useState } from "react";
import { useAPI } from "context/Store";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import useNotification from "useNotification";
import CardList from "../CardList/CardList";
import * as S from "./CardContainer.styles";

function CardContainer() {
  const {
    state: { appData, isLoading, errorMessage },
  } = useAPI();

  const {
    visible: alertVisibility,
    hideNotification,
    showNotification,
  } = useNotification();
  const [activeApps, setActiveApps] = useState<typeof appData>([]);
  const [inactiveApps, setInactiveApps] = useState<typeof appData>([]);

  useEffect(() => {
    errorMessage && showNotification();
  }, [errorMessage]);

  useEffect(() => {
    if (!isLoading) {
      //dividing active and inactive campaigns into their own array.
      appData.forEach((item) => {
        if (item.active) {
          setActiveApps((prev) => [...prev, item]);
        } else {
          setInactiveApps((prev) => [...prev, item]);
        }
      });
    }
  }, [appData, isLoading]);

  if (isLoading) {
    return <LinearProgress data-testid="loading-bar" />;
  }

  return (
    <S.Wrapper data-testid="card-container">
      <CardList type="active" apps={activeApps}></CardList>
      <S.StyledLine width="80%" data-testid="app-seperation-line" />
      <CardList type="inactive" apps={inactiveApps}></CardList>
      {/* <Snackbar
        open={alertVisibility}
        autoHideDuration={2500}
        onClose={hideNotification}
        message={errorMessage}
      /> */}
    </S.Wrapper>
  );
}

export default CardContainer;
