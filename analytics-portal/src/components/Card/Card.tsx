import { NameContainer, Wrapper, StyledLink } from "./Card.styles";
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
      <div className={getClassName(isActive, "card-profile")}>
        <StyledLink to={`/overview/${name}`}>
          <img src={imgUrl} alt={name} />
        </StyledLink>
        <StyledLink to={`/overview/${name}`}>
          <NameContainer>{capitalize(name)}</NameContainer>
        </StyledLink>
      </div>
      <div className={getClassName(isActive, "card-detail")}>
        <div className="card-detail-element">
          <strong>{campaignCount}</strong>
          <p>Campaigns</p>
        </div>
        <div className="card-detail-element">
          <strong>{installs}</strong>
          <p>Avg. Installs</p>
        </div>
        <div className="card-detail-element">
          <strong>{revenue}</strong>
          <p>Avg. Revenue</p>
        </div>
      </div>
    </Wrapper>
  );
}
export default Card;
