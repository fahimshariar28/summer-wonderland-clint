import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;

  const formattedDate = `${hours}.${minutes} ${amOrPm} ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return formattedDate;
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data, loading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory?email=${user?.email}`);
      return res.data;
    },
  });

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
        <title>Payment History | Summer Wonderland</title>
      </Helmet>
      <SectionTitle title="Payment History" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="btn-primary text-white mt-8">
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.className}</td>
                <td>{item.classPrice}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
