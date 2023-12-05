import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "../utils/AuthGuard";
import DashboardLayout from "../components/layouts/DashboardLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import { useEffect, useState, useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import dashboardRoutes from "../routes/dashboard.routes";
import publicRoutes from "../routes/public.routes";
import ProcessAuth from "../pages/auth/ProcessAuth";
import CollegeModal from "../components/auth/CollegeModal";
import { IUser } from "../types/index";
import { AuthContext } from "../context/Auth";

const browserRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      ...dashboardRoutes.map((route) => ({
        path: route.path,
        element: <AuthGuard>{<route.element />}</AuthGuard>,
      })),
    ],
  },
  {
    path: "/auth/redirect",
    element: <ProcessAuth />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      ...publicRoutes.map((route) => ({
        path: route.path,
        element: <route.element />,
      })),
    ],
  },
]);
const RoutesProvider = () => {
  const [open, setOpen] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const auth = useAuthUser();
  useEffect(() => {
    const authUser = auth() as IUser;
    authUser && context?.setUser(authUser);
    authUser && context?.setIsLoggedIn(true);
    if (authUser && !authUser.college?._id) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    console.log(context);
  }, [auth, context]);

  return (
    <>
      <CollegeModal isOpen={open} setIsOpen={setOpen} />
      <RouterProvider router={browserRouter} />
    </>
  );
};
export default RoutesProvider;
