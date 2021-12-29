import * as S from "./CardDetail.styles";

function CardDetail({
  isActive,
  campaignCount,
  avgInstalls,
  avgRevenue,
}: {
  isActive: boolean;
  campaignCount: number;
  avgInstalls: number;
  avgRevenue: number;
}) {
  return (
    <S.Wrapper isActive={isActive} data-testid="card-detail">
      <S.DetailElement>
        <S.NumberContainer>{campaignCount}</S.NumberContainer>
        <p>Campaigns</p>
      </S.DetailElement>
      <S.DetailElement>
        <S.NumberContainer>{avgInstalls}</S.NumberContainer>
        <p>Avg. Installs</p>
      </S.DetailElement>
      <S.DetailElement>
        <S.NumberContainer>{avgRevenue}</S.NumberContainer>
        <p>Avg. Revenue</p>
      </S.DetailElement>
    </S.Wrapper>
  );
}

export default CardDetail;
