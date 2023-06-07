import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudent = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // use axios secure with react query
  const { data: isStudent, isLoading: isStudentLoading } = useQuery({
    queryKey: ["isStudent", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/isStudent/${user.email}`);
      return res.data.admin;
    },
  });
  return [isStudent, isStudentLoading];
};
export default useStudent;
