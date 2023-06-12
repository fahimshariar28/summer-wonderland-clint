import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Summer Wonderland</title>
      </Helmet>
      <Banner />
      <PopularClasses />
      <PopularInstructors />
      <Contact />
    </div>
  );
};

export default Home;
