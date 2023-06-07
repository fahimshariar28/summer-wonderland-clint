import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Carousel className="text-center">
      <div>
        <img src="https://i.ibb.co/YQy3GXX/images.jpg" />
      </div>
      <div>
        <img src="https://i.ibb.co/XtP69p8/images-1.jpg" />
      </div>
      <div>
        <img src="https://i.ibb.co/TqZNWnT/images-2.jpg" />
      </div>
    </Carousel>
  );
};

export default Banner;
