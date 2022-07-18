import { useState } from "react";

import useInterval from "../api/useInterval";
import ResultBlock from "./ResultBlock";
import LoadingBar from "./LoadingBar";
import RoomHeader from "./RoomHeader";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Room = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inputs, setInputs] = useState({});

  useInterval(
    async () => {
      options["body"] = JSON.stringify({ roomID: props.roomID });
      try {
        const res = await fetch("api/getResults", options);
        if (!res.ok) throw new Error("Error Fetching Data");
        const data = await res.text();
        setWinner(data);
        setIsRunning(!isRunning);
      } catch (e) {
        console.log(e);
      }
    },
    isRunning ? 3000 : null
  );

  const handleSubmit = (e) => {
    // Do some input validation
    e.preventDefault();

    setDisabled(!disabled);
    const total = Object.values(inputs);

    if (props.solo) {
      const randNum = Math.floor(Math.random() * total.length);
      setWinner(total[randNum]);
      return;
    }
    options["body"] = JSON.stringify({
      roomID: props.roomID,
      restaurants: total,
    });

    (async () => {
      try {
        const res = await fetch("api/setResults", options);
        if (!res.ok) throw new Error("NOT good response status");
      } catch (e) {
        console.log(e);
      }
    })();
    setIsRunning(!isRunning);
  };

  const handleInput = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <>
      <div className="hero min-h-screen bg-hero">
        <div className="hero-overlay bg-opacity-70 bg-yellow-700"></div>
        <div className="flex-col justify-center hero-content lg:flex-row ">
          <div className="text-center lg:text-left ">
            {<RoomHeader solo={props.solo} />}
          </div>
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant / Food One</span>
                </label>
                <input
                  type="text"
                  name="restaurantOne"
                  value={inputs.restaurantOne || ""}
                  onChange={handleInput}
                  autoComplete="off"
                  disabled={disabled}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant / Food Two</span>
                </label>
                <input
                  type="text"
                  name="restaurantTwo"
                  value={inputs.restaurantTwo || ""}
                  onChange={handleInput}
                  autoComplete="off"
                  disabled={disabled}
                  className="input input-bordered"
                />

                <label className="label">
                  <span className="label-text">Restaurant / Food Three</span>
                </label>
                <input
                  type="text"
                  name="restaurantThree"
                  value={inputs.restaurantThree || ""}
                  onChange={handleInput}
                  autoComplete="off"
                  disabled={disabled}
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text">Restaurant / Food Four</span>
                </label>
                <input
                  type="text"
                  name="restaurantFour"
                  value={inputs.restaurantFour || ""}
                  onChange={handleInput}
                  autoComplete="off"
                  disabled={disabled}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="button"
                  onClick={handleSubmit}
                  value="Submit"
                  className="btn btn-lg"
                  disabled={disabled}
                />
              </div>
              {isRunning && <LoadingBar />}
              {winner && <ResultBlock winner={winner} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Room;
