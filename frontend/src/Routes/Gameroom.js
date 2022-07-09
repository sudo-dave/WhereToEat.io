import { useSearchParams } from "react-router-dom";
import Error from "./Error";
import FetchRoom from "../api/FetchRoom";
import Room from "../components/Room";

const Gameroom = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id === "0000") return <Room solo />;

  const { connected } = FetchRoom("api/room?id=" + id);

  return connected ? <Room roomID={id} /> : <Error msg="URL not vaild" />;
};
export default Gameroom;
