import { Link } from "react-router-dom";
import useSelectedClass from "../../../../hooks/useSelectedClass";

const SelectedClass = () => {
  const [selectedClass] = useSelectedClass();
  const total = selectedClass?.reduce((acc, item) => acc + item.classPrice, 0);
  return (
    <div>
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-2xl">Total Items: {selectedClass?.length}</h3>
        <h3 className="text-2xl">Total Price: ${total}</h3>
        <Link to="/dashboard/payment">
          <button className="btn btn-warning btn-sm">PAY</button>
        </Link>
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
                  <button className="btn btn-sm btn-error">Delete</button>
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
