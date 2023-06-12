import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import reader from "../../assets/render.json";
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
  const { error } = useRouteError();
  return (
    <>
      <Helmet>
        <title>404 Error | Summer Wonderland</title>
      </Helmet>
      <section className="flex">
        <div className="container flex flex-col items-center justify-center">
          {/* Lottie Animation */}
          <div className="relative lg:w-1/2 ">
            <div className="w-full lg:w-4/5 lg:ml-auto h-56 sm:h-96">
              <Lottie animationData={reader} loop={true} />
            </div>
          </div>
          <div className="text-center mt-52 md:pl-36">
            <p className="text-2xl font-semibold md:text-3xl mt-5  text-red-600">
              {error?.message}
            </p>
            <Link to="/">
              <button className="btn btn-secondary md:mt-5">
                Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
