import { useParams } from "react-router-dom";

function Details() {
  const { name } = useParams();
  return <div>Details page: {name}</div>;
}

export default Details;
