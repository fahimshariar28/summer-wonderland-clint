import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data, loading } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paidClasses?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(data);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Enrolled Classes | Summer Wonderland</title>
      </Helmet>
      <SectionTitle title="My Enrolled Classes" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="btn-primary text-white mt-8">
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Class Id</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.className}</td>
                <td>{item.classId}</td>
                <td>{item.classPrice}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;
