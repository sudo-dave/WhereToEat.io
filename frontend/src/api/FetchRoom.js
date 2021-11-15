import { useEffect, useState } from "react";

const FetchRoom = (url) => {
  const [connected, setConnection] = useState(null);

  useEffect(() => {
    const abortCon = new AbortController();
    fetch(url, { signal: abortCon.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not check if is connected");
        }
        console.log("0909");
        setConnection(true);
      })
      .catch((e) => {
        console.log("There was a error");
      });
    return () => abortCon.abort();
  }, [url]);
  return { connected };
};
export default FetchRoom;
