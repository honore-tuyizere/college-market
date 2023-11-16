import { useQuery } from "@tanstack/react-query";
import { getProductsByPurpose } from "../../apis/products";
import Container from "../../components/common/Container";
import ProductsList from "../../components/products/ProductsList";
import { queryKeys } from "../../utils/queryKeys";

const DonatedProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.donatedProducts,
    queryFn: () => getProductsByPurpose("DONATION"),
  });
  return (
    <Container>
      <ProductsList products={data} isLoading={isLoading} title='Donated Products' />
    </Container>
  );
};

export default DonatedProductsPage;
