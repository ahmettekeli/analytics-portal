import {
  ProfileImg,
  ProfileItem,
  ProfileText,
  NameContainer,
  Wrapper,
} from "./OverviewProfile.styles";
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
    <Wrapper>
      <ProfileItem>
        <ProfileImg src={imgUrl} alt={name} />
      </ProfileItem>
      <ProfileItem>
        <NameContainer>{capitalize(name)}</NameContainer>
        <ProfileText>{`Created at ${creationDate}`}</ProfileText>
      </ProfileItem>
    </Wrapper>
  );
}

export default OverviewProfile;
