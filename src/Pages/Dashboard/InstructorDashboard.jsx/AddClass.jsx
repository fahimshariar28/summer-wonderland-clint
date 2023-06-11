import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.price = Number(data.price);
    data.available_seats = Number(data.available_seats);
    data.status = "pending";
    data.enrolled = 0;
    console.log(data);
    axiosSecure.post("/addClass", data).then((response) => {
      console.log(response);
      navigate("/dashboard/myclasses");
      Swal.fire({
        icon: "success",
        title: "Class added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl uppercase text-center">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col md:flex-row">
          <input
            className="p-3 m-1 border-2 w-1/2"
            defaultValue={user.displayName}
            {...register("instructor")}
            readOnly
          />
          <input
            className="p-3 m-1 border-2 w-1/2"
            defaultValue={user.email}
            {...register("email")}
            readOnly
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <input
            required
            className="p-3 m-1 border-2 w-1/2"
            placeholder="Toy Name"
            {...register("name")}
          />
          <input
            required
            className="p-3 m-1 border-2 w-1/2"
            placeholder="Picture URL"
            {...register("image")}
          />
        </div>
        <br />
        <div className="flex flex-col md:flex-row">
          <input
            type="number"
            required
            className="p-3 m-1 border-2 w-1/2"
            placeholder="Price"
            {...register("price")}
          />
          <input
            type="number"
            required
            className="p-3 m-1 border-2 w-1/2"
            placeholder="Available Seats"
            {...register("available_seats")}
          />
        </div>
        <br />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input className="btn btn-primary" type="submit" />
      </form>
    </div>
  );
};

export default AddClass;
