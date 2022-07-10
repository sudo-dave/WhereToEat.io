import InstructionsTitle from "./InstructionsTitle";
const RoomHeader = ({ solo }) => {
  return (
    <>
      <h1 className="text-gray-50 mb-5 text-5xl font-bold bg-red-800 p-4 rounded-lg">
        {solo ? "Where Are You Going To Eat?" : window.location.href}
      </h1>
      {!solo && <InstructionsTitle />}
    </>
  );
};
export default RoomHeader;
