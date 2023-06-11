import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/UseInstructor";
import useAuth from "../hooks/useAuth";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();
  if (loading || isInstructorLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (user && isInstructor) {
    return children;
  } else if (user && !isInstructor) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
};

export default InstructorRoute;
