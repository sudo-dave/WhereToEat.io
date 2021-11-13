import { useSearchParams } from "react-router-dom";
import RoomNotFound from "./RoomNotFound";
import FetchRoom from "../api/FetchRoom";
import Room from "./Room";

const Gameroom = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  if (id === "0000") {
    return <Room solo />;
  }
  const { connected } = FetchRoom("/room?id=" + id);

  if (connected) return <Room />;
  return <RoomNotFound />;
};
export default Gameroom;
