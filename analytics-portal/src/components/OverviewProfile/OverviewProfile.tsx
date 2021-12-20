import { Wrapper, ProfileItem } from "./OverviewProfile.styles";

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
        <h3>{name}</h3>
        <p>{`Created at ${creationDate}`}</p>
      </ProfileItem>
    </Wrapper>
  );
}

export default OverviewProfile;
