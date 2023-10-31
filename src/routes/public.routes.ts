import LoginPage from "../pages/auth/Login";
import LandingPage from "../pages/public/LandingPage";
import { IRoute } from "../types";

const publicRoutes: IRoute[] = [
  {
    path: "",
    element: LandingPage,
  },
  {
    path: "login",
    element: LoginPage,
  },
];

export default publicRoutes;
