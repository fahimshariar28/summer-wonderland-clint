import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Classes from "../Pages/Classes/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors/Instructors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import SelectedClass from "../Pages/Dashboard/StudentDashboard/SelectedClass/SelectedClass";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser";
import EnrolledClasses from "../Pages/Dashboard/StudentDashboard/SelectedClass/EnrolledClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageuser",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "selectedClass",
        element: (
          <StudentRoute>
            <SelectedClass />
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      {
        path: "enrolledClasses",
        element: (
          <StudentRoute>
            <EnrolledClasses />
          </StudentRoute>
        ),
      },
    ],
  },
]);

export default router;
