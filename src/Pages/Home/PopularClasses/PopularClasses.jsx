import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const PopularClasses = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/popularClasses");
      return res.json();
    },
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="mb-3">
      <h2 className="text-3xl text-center">Popular Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {data?.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={item.image} alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-2xl font-semibold">
                Instructor: {item.instructor}
              </p>
              <div className="flex justify-evenly">
                <p>Total Enrolled: {item.enrolled}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <Link to="/classes">
          <button className="btn btn-primary hover:bg-white hover:text-primary">
            See All Classes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularClasses;
