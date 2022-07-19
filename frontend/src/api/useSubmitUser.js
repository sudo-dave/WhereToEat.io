import { useState } from "react";

const useSubmitUser = (url) => {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchPost = async (data) => {
    const formData = new FormData();
    formData.append("size", data);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Bad Input");
      const id = await res.text();
      setResponse(id);
    } catch (e) {
      setError(e);
    }
  };

  return [fetchPost, response, error];
};
export default useSubmitUser;
