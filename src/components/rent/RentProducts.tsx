import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../apis/products";
import Container from "../../components/common/Container";
import ProductsList from "../../components/products/ProductsList";
import { queryKeys } from "../../utils/queryKeys";

const RentProducts = () => {
   const { data, isLoading } = useQuery({
     queryKey: queryKeys.getAllProducts,
     queryFn: getAllProducts,
   });
  return (
    <>
      <Container>
        <ProductsList products={data} isLoading={isLoading} title='Rent Products' />
      </Container>
    </>
  );
};

export default RentProducts;
