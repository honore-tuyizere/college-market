import { useQuery } from "@tanstack/react-query";
import { getProductsByPurpose } from "../../apis/products";
import Container from "../../components/common/Container";
import ProductsList from "../../components/products/ProductsList";
import { queryKeys } from "../../utils/queryKeys";

const RentProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.rentProducts,
    queryFn: () => getProductsByPurpose("RENT"),
  });
  return (
    <Container>
      <ProductsList products={data} isLoading={isLoading} title='Rent Products' />
    </Container>
  );
};

export default RentProducts;
