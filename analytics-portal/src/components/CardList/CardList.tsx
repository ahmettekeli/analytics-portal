import * as S from "./CardList.styles";
import { AppDataInterface } from "Interfaces";
import Card from "../Card/Card";

function CardList({ type, apps }: { type: string; apps: AppDataInterface[] }) {
  return (
    <S.Wrapper data-testid={`${type}Apps`}>
      {apps.map((item) => {
        return <Card key={item.id} app={item}></Card>;
      })}
    </S.Wrapper>
  );
}

export default CardList;
