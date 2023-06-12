import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

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
    Swal.fire({
      title: "Send Feedback",
      icon: "info",
      html: '<input type="text" id="feedbackInput" placeholder="Enter your feedback" class="input w-full max-w-xs border-primary">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const feedback = document.getElementById("feedbackInput").value;

        axiosSecure
          .put(`/approveClass/${id}`, { feedback })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Class Approved Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error sending feedback:", error);
          });
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Send Feedback",
      icon: "info",
      html: '<input type="text" id="feedbackInput" placeholder="Enter your feedback" class="input w-full max-w-xs border-error">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const feedback = document.getElementById("feedbackInput").value;

        axiosSecure
          .put(`/rejectClass/${id}`, { feedback })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Class Rejected Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error sending feedback:", error);
          });
      }
    });
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
      <Helmet>
        <title>Manage Classes | Summer Wonderland</title>
      </Helmet>
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
