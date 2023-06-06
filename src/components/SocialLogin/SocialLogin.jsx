import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="divider"></div>
      <div className="w-full text-center my-4">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-primary hover:bg-base-100 hover:text-primary"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
