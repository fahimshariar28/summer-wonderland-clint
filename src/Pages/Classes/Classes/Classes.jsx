import { useQuery } from "@tanstack/react-query";
import useStudent from "../../../hooks/useStudent";

const Classes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes");
      return res.json();
    },
  });
  const [isStudent] = useStudent();
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
      <h2 className="text-3xl text-center">All Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        {data?.map((item) => (
          <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
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
              <div className="card-actions justify-center">
                <button className="btn btn-primary" disabled={!isStudent}>
                  Select Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
