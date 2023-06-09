import useSelectedClass from "../../../../hooks/useSelectedClass";

const SelectedClass = () => {
  const [selectedClass] = useSelectedClass();
  return (
    <div>
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
                  <button className="btn btn-sm btn-primary">Pay</button>
                </td>
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
