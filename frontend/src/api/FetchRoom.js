import { useState } from "react";

const FetchRoom = (url) => {
  const [connected, setConnection] = useState(true);

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not check if is connected");
      }
      console.log("0909");
      // setConnection(true);
    })
    .catch((e) => {
      setConnection(false);
      console.log("There was a error");
    });

  return { connected };
};
export default FetchRoom;
