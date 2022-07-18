import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [size, setSize] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!size) {
      alert("Enter valid users");
      return;
    }
    if (size === 1) {
      navigate("/room?id=0000");
      return;
    }
    const formData = new FormData();
    formData.append("size", size);
    (async () => {
      try {
        const res = await fetch("api/generate-url", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Bad INPUT");
        const url = await res.text();
        navigate("/room?id=" + url);
      } catch (e) {
        console.log("Error is " + e.message);
      }
    })();
  };
  return (
    <div className="hero min-h-screen bg-hero">
      <div className="hero-overlay bg-opacity-70 bg-yellow-700"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-7xl font-bold">
            Can't Decide Where to Eat?
          </h1>
          <p className="mb-5 text-2xl">
            Take the hassle away of choosing on what or where to eat with this
            collaborative web app.
          </p>
          <div className="flex justify-evenly">
            <form onSubmit={handleSubmit}>
              <select
                className="text-black select select-bordered select-lg w-full max-w-xs"
                defaultValue={"DEFAULT"}
                onChange={(e) => {
                  setSize(parseInt(e.target.value));
                }}
              >
                <option value="DEFAULT" disabled>
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
