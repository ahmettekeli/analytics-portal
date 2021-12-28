import * as S from "./CardProfile.styles";
import capitalize from "lodash/capitalize";

function CardProfile({
  isActive,
  src,
  name,
}: {
  isActive: boolean;
  src: string;
  name: string;
}) {
  return (
    <S.Wrapper isActive={isActive}>
      <S.ProfileImg src={src} alt={name} />
      <S.NameContainer>{capitalize(name)}</S.NameContainer>
    </S.Wrapper>
  );
}

export default CardProfile;