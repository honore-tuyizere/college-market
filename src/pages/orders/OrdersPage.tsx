import { useQuery } from "@tanstack/react-query";
import DashboardTopBar from "../../components/layouts/navigation/TopBar";
import { queryKeys } from "../../utils/queryKeys";
import { getSellersOrders } from "../../apis/orders";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import ProductList from "../../components/products/ProductsList";

const OrdersPage = () => {
  const context = useContext(AuthContext);
  const sellerOrders = useQuery({
    queryKey: queryKeys.sellerOrders,
    queryFn: () => getSellersOrders(context?.user?._id as string),
  });
  return (
    <>
      <DashboardTopBar title='Orders' />
      <ProductList
        title='Recent orders'
        isLoading={sellerOrders.isLoading}
        products={[]}
        orders={sellerOrders.data}
      />
    </>
  );
};

export default OrdersPage;
