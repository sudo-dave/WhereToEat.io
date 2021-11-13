const Room = (props) => {
  if (props.solo) {
    console.log("solo thing");
  }
  return <h1> Inside the Room</h1>;
};
export default Room;
