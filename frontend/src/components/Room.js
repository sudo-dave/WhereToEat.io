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
    e.preventDefault();
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

  const handleRandomChoice = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:
        randRestaurants[Math.floor(Math.random() * randRestaurants.length)],
    }));
  function result() {
    if (winner) return <h1> The winner is {winner}</h1>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="restaurantOne"
        value={inputs.restaurantOne || ""}
        onChange={handleInput}
      />
      <button type="button" name="restaurantOne" onClick={handleRandomChoice}>
        Random
      </button>

      <input
        type="text"
        name="restaurantTwo"
        value={inputs.restaurantTwo || ""}
        onChange={handleInput}
      />

      <button type="button" name="restaurantTwo" onClick={handleRandomChoice}>
        Random
      </button>
      <input
        type="text"
        name="restaurantThree"
        value={inputs.restaurantThree || ""}
        onChange={handleInput}
      />

      <button type="button" name="restaurantThree" onClick={handleRandomChoice}>
        Random
      </button>
      <input
        type="text"
        name="restaurantFour"
        value={inputs.restaurantFour || ""}
        onChange={handleInput}
      />
      <button type="button" name="restaurantFour" onClick={handleRandomChoice}>
        Random
      </button>
      <button>Random Food Place</button>
      {result()}
    </form>
  );
};
export default Room;
