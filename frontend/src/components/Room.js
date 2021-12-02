import { useState } from "react";

import useInterval from "../api/useInterval";
import ResultBlock from "./ResultBlock";
import LoadingBar from "./LoadingBar";

const Room = (props) => {
  const [disabled, setDisabled] = useState(false);
  // const [randRestaurants, setrRandRestaurants] = useState([
  //   "aaa",
  //   "bbb",
  //   "ccc",
  //   "ddd",
  //   "eee",
  // ]);

  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inputs, setInputs] = useState({});

  useInterval(
    () => {
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomID: props.roomID }),
      };
      fetch("/getResults", req)
        .then((res) => {
          if (res.ok) {
            return res.text();
          }
          throw new Error("NOT fully submited yet");
        })
        .then((data) => {
          setWinner(data);
          setIsRunning(!isRunning);
        })
        .catch((e) => console.log(e));
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
    } else {
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomID: props.roomID, restaurants: total }),
      };

      fetch("/setResults", req)
        .then((res) => {
          if (res.ok) {
            return res.text();
          }
          throw new Error("NOT good response status");
        })
        .then((data) => console.log(data))
        .catch((e) => console.log(e));

      setIsRunning(!isRunning);
    }
  };

  const handleInput = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  // const handleRandomChoice = (e) =>
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [e.target.name]:
  //       randRestaurants[Math.floor(Math.random() * randRestaurants.length)],
  //   }));

  function isOneUser() {
    return (
      <>
        <h1 className="text-gray-50 mb-5 text-5xl font-bold bg-red-800 p-4 rounded-lg">
          {props.solo ? "Where Are You Going To Eat?" : window.location.href}
        </h1>
        {!props.solo && (
          <p className="text-gray-50 mb-5 text-3xl bg-red-800	 p-4 rounded-lg">
            <div className="inline font-bold">COPY</div> the url.
            <div className="inline font-bold"> SHARE</div> with friends.
            <div className="inline  font-bold"> SUBMIT</div> restaurants.
            <div className="inline font-bold"> GET</div> result.
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url('More_Transparent.png')",
        }}
      >
        <div className="hero-overlay bg-opacity-70 bg-yellow-700"></div>
        <div className="flex-col justify-center hero-content lg:flex-row ">
          <div className="text-center lg:text-left ">{isOneUser()}</div>
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
                  autocomplete="off"
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
                  autocomplete="off"
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
                  autocomplete="off"
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
                  autocomplete="off"
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
