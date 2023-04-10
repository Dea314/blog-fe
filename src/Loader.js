import Loading from "./img/Loading.gif";

const Loader = () => {
  return (
    <div className="loader">
      <figure>
        <img src={Loading} alt="Loading..." />
      </figure>
    </div>
  );
};

export default Loader;
