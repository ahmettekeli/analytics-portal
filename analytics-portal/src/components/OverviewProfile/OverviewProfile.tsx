import * as S from "./OverviewProfile.styles";
import capitalize from "lodash/capitalize";

function OverviewProfile({
  imgUrl,
  name,
  creationDate,
}: {
  imgUrl: string | undefined;
  name: string | undefined;
  creationDate: string;
}) {
  return (
    <S.Wrapper data-testid="OverviewProfile">
      <S.ProfileItem>
        <S.ProfileImg src={imgUrl} alt={name} />
      </S.ProfileItem>
      <S.ProfileItem>
        <S.NameContainer>{capitalize(name)}</S.NameContainer>
        <S.ProfileText>{`Created at ${creationDate}`}</S.ProfileText>
      </S.ProfileItem>
    </S.Wrapper>
  );
}

export default OverviewProfile;
