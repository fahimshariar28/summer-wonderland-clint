import { Link } from "react-router-dom";
import useSelectedClass from "../../../../hooks/useSelectedClass";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

const SelectedClass = () => {
  const [selectedClass, refetch] = useSelectedClass();
  const [axiosSecure] = useAxiosSecure();
  const total = selectedClass?.reduce((acc, item) => acc + item.classPrice, 0);

  const handleDelete = (item) => {
    axiosSecure.delete(`/deleteSelectedClass/${item._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your selected class has been deleted.",
        });
      }

      refetch();
    });
  };

  return (
    <div>
      <Helmet>
        <title>Selected Class | Summer Wonderland</title>
      </Helmet>
      <SectionTitle title="Selected Class" />
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-2xl">Total Items: {selectedClass?.length}</h3>
        <h3 className="text-2xl">Total Price: ${total}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-white">
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Instructor</th>
              <th>Pay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.className}</td>
                <td>{item.classPrice}</td>
                <td>{item.instructor}</td>
                <td>
                  <Link state={item} to="/dashboard/payment">
                    <button className="btn btn-sm btn-primary">Pay</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
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

export default SelectedClass;
