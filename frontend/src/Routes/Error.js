const Error = (props) => {
  return (
    <div className="hero min-h-screen bg-hero">
      <div className="hero-overlay bg-opacity-70 bg-yellow-700"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-9xl font-bold">{props.msg}</h1>
        </div>
      </div>
    </div>
  );
};

export default Error;
