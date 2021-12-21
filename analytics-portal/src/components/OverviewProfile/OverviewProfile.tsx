import { Wrapper, ProfileItem, NameContainer } from "./OverviewProfile.styles";
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
        <img src={imgUrl} alt={name} />
      </ProfileItem>
      <ProfileItem>
        <NameContainer>{capitalize(name)}</NameContainer>
        <p>{`Created at ${creationDate}`}</p>
      </ProfileItem>
    </Wrapper>
  );
}

export default OverviewProfile;
