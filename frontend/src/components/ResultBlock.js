const ResultBlock = (props) => {
  return (
    <h1 className="text-center text-4xl mt-5 font-bold">
      Winner: {props.winner}
    </h1>
  );
};

export default ResultBlock;
