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
      {classes?.map((classItem) => (
        <div key={classItem._id}></div>
      ))}
    </div>
  );
};

export default MyClasses;
