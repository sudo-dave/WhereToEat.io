import { useSearchParams } from "react-router-dom";
import Error from "./Error";
import FetchRoom from "../api/FetchRoom";
import Room from "../components/Room";

const Lobby = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { connected, error, isloading } = FetchRoom("api/room?id=" + id);

  // return connected ? <Room roomID={id} /> : <Error msg="URL not vaild" />;
  if (isloading) return <Error msg="Loading" />;
  else return connected ? <Room roomID={id} /> : <Error msg="URL not valid" />;
};
export default Lobby;
