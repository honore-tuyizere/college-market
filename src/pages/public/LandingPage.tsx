import Container from "../../components/common/Container";
import ProductsList from "../../components/products/ProductsList";
import Slider from "../../components/slider/Slider";

const LandingPage = () => {
  return (
    <>
      <Slider />
      <Container>
        <ProductsList title='Most selling Products' />
      </Container>
    </>
  );
};

export default LandingPage;
