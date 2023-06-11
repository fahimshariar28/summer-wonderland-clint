import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared/SectionTitle";

const ManageClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    data: classes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/allclasses");
      return res.data;
    },
  });
  console.log(classes);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.put(`/approveClass/${id}`);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Class Approved",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.put(`/rejectClass/${id}`);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Class Rejected",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionTitle title="Manage Classes" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center w-full">
            {classes?.map((classItem, index) => (
              <tr key={classItem._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{classItem.name}</td>
                <td>{classItem.instructor}</td>
                <td>{classItem.email}</td>
                <td>{classItem.available_seats}</td>
                <td>{classItem.price}</td>
                <td>{classItem.enrolled}</td>
                <td>{classItem.status}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleApprove(classItem._id)}
                    className="btn btn-primary btn-sm"
                    disabled={classItem.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(classItem._id)}
                    className="btn btn-error btn-sm"
                    disabled={classItem.status === "rejected"}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
