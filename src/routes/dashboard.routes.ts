import DashboardPage from "../pages/dashboard/Dashboard";
import ProductsPage from "../pages/products/ProductsPage";

import { IRoute } from "../types";

const dashboardRoutes: IRoute[] = [
  {
    path: "",
    element: DashboardPage,
  },
  {
    path: "/dashboard/products",
    element: ProductsPage,
  },
];

export default dashboardRoutes;
