import { useState } from "react";

const Room = (props) => {
  const [choices, setChoices] = useState([]);

  const [resOne, setResOne] = useState("");
  const [resTwo, setResTwo] = useState("");
  const [restThree, setResThree] = useState("");
  const [restFour, setRestFour] = useState("");

  const [option, setOption] = useState(null);

  const handleClick = (e) => {
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
    }
  };

  const Result = () => {
    if (option) {
      return <h1> Is {option}True</h1>;
    }
  };
  return (
    <form onSubmit={handleClick}>
      <label>
        <h1> ****Inside the Room********</h1>
      </label>
      <input
        type="text"
        value={resOne}
        onChange={(e) => setResOne(e.target.value)}
      />
      <input
        type="text"
        value={resTwo}
        onChange={(e) => setResTwo(e.target.value)}
      />
      <input
        type="text"
        value={restThree}
        onChange={(e) => setResThree(e.target.value)}
      />
      <input
        type="text"
        value={restFour}
        onChange={(e) => setRestFour(e.target.value)}
      />
      <button>Random Food Place</button>
      {Result()}
    </form>
  );
};
export default Room;
