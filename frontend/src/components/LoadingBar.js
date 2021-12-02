const LoadingBar = () => {
  return (
    <>
      <div class=" mt-5 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-red-800"></div>
      </div>
      <h1 className="text-center text-2xl mt-5 font-bold ">
        Waiting for other users
      </h1>
    </>
  );
};
export default LoadingBar;
