import {
  NameContainer,
  NumberContainer,
  Wrapper,
  StyledLink,
  CardDetailElement,
  CardProfile,
  CardDetail,
} from "./Card.styles";
import capitalize from "lodash/capitalize";

function Card({
  imgUrl,
  name,
  campaignCount,
  installs,
  revenue,
  isActive,
}: {
  imgUrl: string;
  name: string;
  campaignCount: number;
  installs: number;
  revenue: number;
  isActive: boolean;
}) {
  function getClassName(isActive: boolean, className: string) {
    return `${!isActive ? "inactive" : null} ${className}`;
  }
  return (
    <Wrapper>
      <CardProfile isActive={isActive}>
        <StyledLink to={`/overview/${name}`}>
          <img src={imgUrl} alt={name} />
        </StyledLink>
        <StyledLink to={`/overview/${name}`}>
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
