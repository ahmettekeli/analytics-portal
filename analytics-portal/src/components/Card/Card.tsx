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
import { useAPI } from "../../context/Store";
import { actionTypes } from "../../context/ActionTypes";
import { AppDataInterface } from "../../context/Interfaces";

function Card({
  app,
  imgUrl,
  name,
  campaignCount,
  installs,
  revenue,
  isActive,
}: {
  app: AppDataInterface;
  imgUrl: string;
  name: string;
  campaignCount: number;
  installs: number;
  revenue: number;
  isActive: boolean;
}) {
  const { dispatch } = useAPI();
  //TODO currentApp doesn't get set in the global store if you enter a url /overview/:name
  //find a way to dispatch with react router
  return (
    <Wrapper>
      <CardProfile isActive={isActive}>
        {/* <StyledLink to={`/overview/${name}`}> */}
        <StyledLink
          to={`/overview/${name}`}
          onClick={() => {
            dispatch({ type: actionTypes.SET_CURRENT_APP, payload: app });
          }}
        >
          <CardProfileImg src={imgUrl} alt={name} />
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
      <CardDetail isActive={isActive}>
        <CardDetailElement>
          <NumberContainer>{campaignCount}</NumberContainer>
          <p>Campaigns</p>
        </CardDetailElement>
        <CardDetailElement>
          <NumberContainer>{installs}</NumberContainer>
          <p>Avg. Installs</p>
        </CardDetailElement>
        <CardDetailElement>
          <NumberContainer>{revenue}</NumberContainer>
          <p>Avg. Revenue</p>
        </CardDetailElement>
      </CardDetail>
    </Wrapper>
  );
}
export default Card;
