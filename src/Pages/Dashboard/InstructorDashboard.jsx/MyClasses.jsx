import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/instructorClasses?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(classes);
  if (isLoading) {
    <div className="flex justify-center items-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  return (
    <div>
      <h2 className="text-2xl uppercase text-center">My Classes</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {classes?.map((classItem, index) => (
              <tr key={classItem.id}>
                <td>{index + 1}</td>
                <td>{classItem.name}</td>
                <td>{classItem.price}</td>
                <td>{classItem.available_seats}</td>
                <td>{classItem.enrolled}</td>
                <td>{classItem.status}</td>
                <td>{classItem.feedback}</td>
                <td>
                  <button className="btn btn-primary btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
