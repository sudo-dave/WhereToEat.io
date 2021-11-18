import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import CreateRoom from "../api/CreateRoom";
const Home = () => {
  const [size, setSize] = useState(1);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(size) === 1) navigate("/room?id=0000");
    else {
      const formData = new FormData();
      formData.append("size", size);

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
          navigate("/room?id=" + url);
        } catch (e) {
          console.log("Error is " + e);
        }
      };
      PostData();
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
