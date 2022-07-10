import { useEffect, useState } from "react";

const FetchRoom = (url) => {
  const [connected, setConnection] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching data.");
        setConnection(true);
      } catch (error) {
        setError({ message: error.message });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { connected, error };
};
export default FetchRoom;
