import { actionTypes } from "context/ActionTypes";
import { AppDataInterface } from "Interfaces";
import CardProfile from "../CardProfile/CardProfile";
import CardDetail from "../CardDetail/CardDetail";
import { getAvgInstalls, getAvgRevenue } from "utils/utilities";
import { useAPI } from "context/Store";
import * as S from "./Card.styles";

function Card({ app }: { app: AppDataInterface }) {
  const { dispatch } = useAPI();
  const { active, campaigns, icon, name } = app;
  const avgRevenue = getAvgRevenue(app, campaigns.length);
  const avgInstalls = getAvgInstalls(app, campaigns.length);

  //TODO currentApp doesn't get set in the global store if you enter a url /overview/:name
  //find a way to dispatch with react router
  return (
    <S.Wrapper
      data-testid="Card"
      onClick={() => {
        dispatch({ type: actionTypes.SET_CURRENT_APP, payload: app });
      }}
    >
      <S.StyledLink to={`/overview/${name}`}>
        <CardProfile isActive={active} src={icon} name={name} />
        <CardDetail
          isActive={active}
          campaignCount={campaigns.length}
          avgRevenue={avgRevenue}
          avgInstalls={avgInstalls}
        />
      </S.StyledLink>
    </S.Wrapper>
  );
}
export default Card;
