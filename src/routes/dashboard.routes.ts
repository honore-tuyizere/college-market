import AllChats from "../components/chat/AllChats";
import NoticesDashboard from "../components/notices/NoticesDashboard";
import CategoryPage from "../pages/category/CategoryPage";
import ConditionPage from "../pages/condition/ConditionPage";
import DashboardPage from "../pages/dashboard/Dashboard";
import OrdersPage from "../pages/orders/OrdersPage";
import ProductsPage from "../pages/products/ProductsPage";
import PurposesPage from "../pages/purpose/PurposesPage";

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
  {
    path: "/dashboard/purposes",
    element: PurposesPage,
  },
  {
    path: "/dashboard/notice",
    element: NoticesDashboard,
  },
  {
    path: "/dashboard/orders",
    element: OrdersPage,
  },
  {
    path: "/dashboard/chats",
    element: AllChats,
  },
];

export default dashboardRoutes;
