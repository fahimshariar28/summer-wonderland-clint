const Banner = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src="https://i.ibb.co/YQy3GXX/images.jpg" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="https://i.ibb.co/XtP69p8/images-1.jpg" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src="https://i.ibb.co/TqZNWnT/images-2.jpg" className="w-full" />
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
