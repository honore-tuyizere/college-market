import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import UserAuth from "../utils/UserAuth";
import DashboardLayout from "../layouts/DashboardLayout";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/auth/Login";
import DashboardPage from "../pages/dashboard/Dashboard";

const routes = [
  {
    path: "/dashboard",
    element: (
      <UserAuth>
        <DashboardLayout />
      </UserAuth>
    ),
    children: [
      { path: "admin", element: <Navigate to='/dashboard' /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <Navigate to='/404' /> },
    ],
  },
];

const AppRouter = (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
