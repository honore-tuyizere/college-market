import { useQuery } from "@tanstack/react-query";
import Container from "../../components/common/Container";
import Filters from "../../components/products/Filters";
import ProductsList from "../../components/products/ProductsList";
import Slider from "../../components/slider/Slider";
import { queryKeys } from "../../utils/queryKeys";
import { getAllProducts } from "../../apis/products";
import { IProduct } from "../../types";
import { useEffect, useState } from "react";
import AdsSlider from "../../components/slider/AdsSlider";

const LandingPage = () => {
  const [data, setData] = useState<IProduct[] | undefined>(undefined);
  const { data: queryData, isLoading } = useQuery({
    queryKey: queryKeys.getAllProducts,
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return (
    <>
      <Slider />
      <Container>
        <ProductsList
          products={data}
          isLoading={isLoading}
          title='Most selling Products'
          filtersComponent={
            <div className='flex gap-2 flex-wrap xs:flex-nowrap'>
              <Filters setData={setData} />
            </div>
          }
        />
      </Container>
      <AdsSlider />
    </>
  );
};

export default LandingPage;
