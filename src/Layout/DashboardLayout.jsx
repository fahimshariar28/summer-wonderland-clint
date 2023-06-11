import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/UseInstructor";
import useStudent from "../hooks/useStudent";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <div>
      <div className="drawer lg:drawer-open overflow-x-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/manageuser">Manage User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageclasses">
                    Manage Classes
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <NavLink to="/dashboard/myclasses">My Classes</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addclass">Add Class</NavLink>
                </li>
              </>
            )}
            {isStudent && (
              <>
                <li>
                  <NavLink to="/dashboard/selectedClass">
                    Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enrolledClasses">
                    Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/instructors">Instructors</NavLink>{" "}
            </li>
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="btn btn-error hover:text-error btn-sm w-2/4"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
