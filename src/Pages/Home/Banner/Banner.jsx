import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="carousel w-full relative">
        <div id="item1" className="carousel-item w-full">
          <img src="https://i.ibb.co/YQy3GXX/images.jpg" className="w-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-5xl text-black font-bold">
              The best Summer Camp
            </h1>
            <p className="text-2xl text-black font-semibold text-center mb-5">
              Starts in
            </p>
            <div className="grid grid-flow-col items-center justify-center gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 15 }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 10 }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 24 }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-primary rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 54 }}></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full relative">
          <img src="https://i.ibb.co/XtP69p8/images-1.jpg" className="w-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-5xl text-black font-bold">Make This Summer</h1>
            <p className="text-2xl text-black font-semibold text-center mb-5">
              Unforgettable
            </p>
          </div>
        </div>
        <div id="item3" className="carousel-item w-full relative">
          <img src="https://i.ibb.co/TqZNWnT/images-2.jpg" className="w-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-5xl text-black font-bold">See Our Classes</h1>
            <div className="flex justify-center">
              <Link to="/classes">
                <button className="btn btn-primary">See All Classes</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
      </div>
    </>
  );
};

export default Banner;
