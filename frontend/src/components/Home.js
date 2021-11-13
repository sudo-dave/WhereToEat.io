import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [size, setSize] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(size) === 1) navigate("/room?id=0000");
    else {
      let formData = new FormData();
      formData.append("size", size);

      fetch("/generate-url", { method: "POST", body: formData })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data");
          }
          return res.text();
        })
        .then((data) => {
          console.log("the url is " + data);
          navigate("/room?id=" + data);
        })
        .catch((e) => {
          console.log("errrrroro " + e);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        How many users
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          name="size"
          min="1"
          max="4"
        />
        <button>Submit</button>
      </label>
    </form>
  );
};
export default Home;
