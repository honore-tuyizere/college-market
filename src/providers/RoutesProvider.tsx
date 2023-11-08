import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "../utils/AuthGuard";
import DashboardLayout from "../components/layouts/DashboardLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import { useContext, useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { AuthContext } from "../context/Auth";
import dashboardRoutes from "../routes/dashboard.routes";
import publicRoutes from "../routes/public.routes";
import ProcessAuth from "../pages/auth/ProcessAuth";

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
  const authCotext = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated()) {
      authCotext?.setIsLoggedIn(true);
    }
  }, [authCotext, isAuthenticated]);
  return <RouterProvider router={browserRouter} />;
};
export default RoutesProvider;
