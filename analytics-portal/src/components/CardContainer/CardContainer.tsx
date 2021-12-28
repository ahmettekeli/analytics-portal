import { useEffect, useState } from "react";
import { useAPI } from "../../context/Store";
import * as S from "./CardContainer.styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CardList from "../CardList/CardList";

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

  useEffect(() => {
    setisAlertVisible(errorMessage ? true : false);
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
    return <LinearProgress />;
  }

  return (
    <S.Wrapper data-testid="CardContainer">
      <CardList type="Active" apps={activeApps}></CardList>
      <S.StyledLine width="80%" data-testid="AppSeperationLine" />
      <CardList type="Inactive" apps={inactiveApps}></CardList>
      <Snackbar
        open={isAlertVisible}
        autoHideDuration={6000}
        onClose={hideAlert}
        message={errorMessage}
      />
    </S.Wrapper>
  );
}

export default CardContainer;
