import { useQuery } from "@tanstack/react-query";
import Container from "../../components/common/Container";
import Filters from "../../components/products/Filters";
import ProductsList from "../../components/products/ProductsList";
import Slider from "../../components/slider/Slider";
import { queryKeys } from "../../utils/queryKeys";
import { getAllProducts } from "../../apis/products";

const LandingPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getAllProducts,
    queryFn: getAllProducts,
  });
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
              <Filters label='Category' />
              <Filters label='College' />
            </div>
          }
        />
      </Container>
    </>
  );
};

export default LandingPage;
