import { useState } from "react";
import useInterval from "../api/useInterval";

const Room = (props) => {
  const [randRestaurants, setrRandRestaurants] = useState([
    "aaa",
    "bbb",
    "ccc",
    "ddd",
    "eee",
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const [input, setInput] = useState([]);
  const [resOne, setResOne] = useState("");
  const [resTwo, setResTwo] = useState("");
  const [restThree, setResThree] = useState("");
  const [restFour, setRestFour] = useState("");

  const [option, setOption] = useState(null);

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
          console.log("***");

          console.log(data);
          setIsRunning(!isRunning);
          console.log("Stoped the running");
        })
        .catch((e) => console.log(e));
    },
    isRunning ? 3000 : null
  );

  const handleSubmit = (e) => {
    console.log("Inisde the hanlde");
    e.preventDefault();
    const total = [];
    if (resOne) total.push(resOne);

    if (resTwo) total.push(resTwo);

    if (restThree) total.push(restThree);

    if (restFour) total.push(restFour);

    if (props.solo) {
      const randNum = Math.floor(Math.random() * total.length);

      console.log(total[randNum]);
      // setOption(choices[randNum]);
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

  // const randActBtn = () => {};

  function randomChoice(hook) {}

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h1> ****Inside the Room********</h1>
      </label>
      <input
        type="text"
        value={resOne}
        onChange={(e) => setResOne(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          const randNum = Math.floor(Math.random() * randRestaurants.length);
          setResOne(randRestaurants[randNum]);
        }}
      >
        Random
      </button>

      <input
        type="text"
        value={resTwo}
        onChange={(e) => setResTwo(e.target.value)}
      />

      <button
        type="button"
        onClick={() => {
          const randNum = Math.floor(Math.random() * randRestaurants.length);
          setResTwo(randRestaurants[randNum]);
        }}
      >
        Random
      </button>
      <input
        type="text"
        value={restThree}
        onChange={(e) => setResThree(e.target.value)}
      />

      <button
        type="button"
        onClick={() => {
          const randNum = Math.floor(Math.random() * randRestaurants.length);
          setResThree(randRestaurants[randNum]);
        }}
      >
        Random
      </button>
      <input
        type="text"
        value={restFour}
        onChange={(e) => setRestFour(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          const randNum = Math.floor(Math.random() * randRestaurants.length);
          setRestFour(randRestaurants[randNum]);
        }}
      >
        Random
      </button>
      <button>Random Food Place</button>
      {/* {Result()} */}
    </form>
  );
};
export default Room;
