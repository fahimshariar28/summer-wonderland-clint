import { useQuery } from "@tanstack/react-query";
import useStudent from "../../../hooks/useStudent";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useInstructor from "../../../hooks/UseInstructor";

const Classes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes");
      return res.json();
    },
  });

  const handleAddToDb = async (item) => {
    if (user && user.email) {
      const selectedClass = {
        classId: item._id,
        className: item.name,
        classPrice: item.price,
        instructor: item.instructor,
        name: user.name,
        email: user.email,
      };
      fetch("http://localhost:5000/selectClass", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Has been added",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to select class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const [isAdmin] = useStudent();
  const [isInstructor] = useInstructor();

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
          <div
            key={item._id}
            className={`card w-96  shadow-xl ${
              item.available_seats === 0 ? "bg-red-500" : "bg-base-100"
            }`}
          >
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
                <p>Available Seats: {item.available_seats}</p>
              </div>
              <div className="card-actions justify-center">
                <button
                  onClick={() => {
                    handleAddToDb(item);
                  }}
                  className="btn btn-primary"
                  disabled={
                    item.available_seats === 0 || isAdmin || isInstructor
                  }
                >
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
