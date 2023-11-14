import { useQuery } from "@tanstack/react-query";
import DashboardTopBar from "../../components/layouts/navigation/TopBar";
import { queryKeys } from "../../utils/queryKeys";
import { getSellersOrders, getBuyersOrders } from "../../apis/orders";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import ProductList from "../../components/products/ProductsList";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

const OrdersPage = () => {
  const context = useContext(AuthContext);
  const sellerOrders = useQuery({
    queryKey: queryKeys.sellerOrders,
    queryFn: () => getSellersOrders(context?.user?._id as string),
  });

  const buyersOrders = useQuery({
    queryKey: queryKeys.buyerOrders,
    queryFn: () => getBuyersOrders(context?.user?._id as string),
  });

  const tabs = [
    {
      label: "Sells",
      component: (
        <ProductList
          title='Recent orders'
          isLoading={sellerOrders.isLoading}
          products={[]}
          orders={sellerOrders.data}
        />
      ),
    },
    {
      label: "Purchases",
      component: (
        <ProductList
          title='Recent orders'
          isLoading={buyersOrders.isLoading}
          products={[]}
          orders={buyersOrders.data}
        />
      ),
    },
  ];
  return (
    <>
      <DashboardTopBar title='Orders' />
      <div className='w-full'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 p-1'>
            {tabs.map((tab) => (
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 outline-none",
                    selected
                      ? " bg-action-color-500 text-white"
                      : "text-action-color-500 bg-white",
                  )
                }
                key={tab.label}
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.label}>{tab.component}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default OrdersPage;
