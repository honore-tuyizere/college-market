import LoginPage from "../pages/auth/Login";
import LandingPage from "../pages/public/LandingPage";
import NoticePage from "../pages/public/NoticePage";
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
  {
    path: "notice",
    element: NoticePage,
  },
];

export default publicRoutes;
