import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import CreateRoom from "../api/CreateRoom";
const Home = () => {
  const [size, setSize] = useState("How Many Users?");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (size === "How Many Users?") {
      alert("Choose correct size");
      return;
    }
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
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('More_Transparent.png')",
      }}
    >
      <div className="hero-overlay bg-opacity-70 bg-yellow-700"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-7xl font-bold">
            Can't Decide Where to Eat?
          </h1>
          <p className="mb-5 text-2xl">
            Take the hassle away of choosing on what or where to eat with this
            web application.
          </p>
          <div className="flex justify-evenly">
            <form onSubmit={handleSubmit}>
              <select
                value={size}
                className="text-black select select-bordered select-lg w-full max-w-xs"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                <option value="How Many Users?" disabled>
                  How Many Users?
                </option>

                <option value="1">One</option>
                <option value="2">Two </option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>

              <button className="btn btn-lg mt-7">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
