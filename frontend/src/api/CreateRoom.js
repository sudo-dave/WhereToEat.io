import { useState } from "react";

const CreateRoom = (roomSize) => {
  // formData.append("size", roomSize);

  const [URL, setURL] = useState("ad");

  fetch("generate-url", { mehod: "POST", body: "formData" })
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch the data");
      }
      return res.text();
    })
    .then((data) => {
      setURL(data);
      console.log("the url is " + data);
    })
    .catch((e) => {
      console.log("errrrroro " + e);
    });

  return { URL };
};
export default CreateRoom;
