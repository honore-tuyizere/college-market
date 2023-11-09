import CategoryPage from "../pages/category/CategoryPage";
import ConditionPage from "../pages/condition/ConditionPage";
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
  {
    path: "/dashboard/category",
    element: CategoryPage,
  },
  {
    path: "/dashboard/conditions",
    element: ConditionPage,
  },
];

export default dashboardRoutes;
