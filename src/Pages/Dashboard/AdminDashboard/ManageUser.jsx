import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    const res = await axiosSecure.put(`/makeAdmin/${user._id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: ` ${user.name} is now an admin`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleMakeInstructor = async (user) => {
    const res = await axiosSecure.put(`/makeInstructor/${user._id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: ` ${user.name} is now an instructor`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Users | Summer Wonderland</title>
      </Helmet>
      <SectionTitle title="Manage Users" />
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <th>
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="btn btn-primary btn-sm"
                  disabled={user.role === "admin"}
                >
                  Make Admin
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleMakeInstructor(user)}
                  className="btn btn-warning btn-sm"
                  disabled={user.role === "instructor"}
                >
                  Make Instructor
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
