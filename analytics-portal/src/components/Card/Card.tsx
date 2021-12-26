import {
  CardDetailElement,
  CardProfile,
  CardProfileImg,
  CardDetail,
  NameContainer,
  NumberContainer,
  Wrapper,
  StyledLink,
} from "./Card.styles";
import capitalize from "lodash/capitalize";
import { actionTypes } from "../../context/ActionTypes";
import { AppDataInterface } from "../../context/Interfaces";
import { getAvgInstalls, getAvgRevenue } from "../../utils/utilities";
import { useAPI } from "../../context/Store";

function Card({ app }: { app: AppDataInterface }) {
  const { dispatch } = useAPI();
  const { active, campaigns, icon, name } = app;
  const avgRevenue = getAvgRevenue(app, campaigns.length);
  const avgInstalls = getAvgInstalls(app, campaigns.length);

  //TODO currentApp doesn't get set in the global store if you enter a url /overview/:name
  //find a way to dispatch with react router
  return (
    <Wrapper data-testid="Card">
      <CardProfile isActive={active}>
        <StyledLink
          to={`/overview/${name}`}
          onClick={() => {
            dispatch({ type: actionTypes.SET_CURRENT_APP, payload: app });
          }}
        >
          <CardProfileImg src={icon} alt={name} />
        </StyledLink>
        <StyledLink
          to={`/overview/${name}`}
          onClick={() => {
            dispatch({ type: actionTypes.SET_CURRENT_APP, payload: app });
          }}
        >
          <NameContainer>{capitalize(name)}</NameContainer>
        </StyledLink>
      </CardProfile>
      <CardDetail isActive={active}>
        <CardDetailElement>
          <NumberContainer>{campaigns.length}</NumberContainer>
          <p>Campaigns</p>
        </CardDetailElement>
        <CardDetailElement>
          <NumberContainer>{avgInstalls}</NumberContainer>
          <p>Avg. Installs</p>
        </CardDetailElement>
        <CardDetailElement>
          <NumberContainer>{avgRevenue}</NumberContainer>
          <p>Avg. Revenue</p>
        </CardDetailElement>
      </CardDetail>
    </Wrapper>
  );
}
export default Card;
