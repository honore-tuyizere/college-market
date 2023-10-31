import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "../utils/AuthGuard";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/auth/Login";
import DashboardPage from "../pages/dashboard/Dashboard";

const browserRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "admin", element: <Navigate to='/dashboard' /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
]);

export default <RouterProvider router={browserRouter} />;
