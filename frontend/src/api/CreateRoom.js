import { useState, useEffect } from "react";

// const CreateRoom = () => {
//   console.log("HI from the ROOM");
// };
const CreateRoom = (size = "") => {
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);

  const formData = new FormData();
  formData.append("size", size);

  useEffect(() => {
    const PostData = async () => {
      try {
        const res = await fetch("/generate-url", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error("Bad INPUT");
        }
        const url = await res.text();
        console.log(url);
        setRes(url);
      } catch (e) {
        setError(e);
        console.log("Error is " + e);
      }
    };
    PostData();
  }, [size]);
  return { res, error };
};
export default CreateRoom;
