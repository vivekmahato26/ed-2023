import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import VerifyToken from "./components/verifyToken";
import ResetPass from "./components/resetPass";
import GenerateToken from "./components/generateToken";
import Payment from "./components/payment";
import CourseDetails from "./components/courseDetails";
import UserDetails from "./components/userDetails";
import AdminDash from "./components/adminDash";

import "bootstrap/dist/css/bootstrap.min.css";
import AddCourse from "./components/addCourse";
import EditCourse from "./components/editCourse";
import AddTopics from "./components/addTopics";
import UpdateCourse from "./components/updateCourse";
import ViewDetails from "./components/viewCourse";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/verify",
      element: <VerifyToken />,
    },
    {
      path: "/generateToken",
      element: <GenerateToken />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/:courseId",
      element: <CourseDetails />,
    },
    {
      path: "/editCourse",
      element: <AdminDash />,
      children: [
        {
          path: "add",
          element: <AddCourse/>,
        },
        {
          path: "edit/",
          element: <EditCourse/>,
          children: [
            {
              path: "topics",
              element: <AddTopics/>,
            },
            {
              path: "update",
              element: <UpdateCourse/>,
            },
          ],
        },
      ],
    },
    {
      path: "/userDetails",
      element: <UserDetails />,
    },
    {
      path:"/view/:courseId",
      element: <ViewDetails/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
