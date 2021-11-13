import { useEffect, useState } from "react";

const SendData = (url) => {
  const [connected, setConnection] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not check if is connected");
        }
        setConnection(true);
      })
      .catch((e) => {
        console.log("There was a error");
      });
  });
  return { connected };
};
export default SendData;
