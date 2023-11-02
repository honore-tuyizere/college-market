import Container from "../../components/common/Container";
import Filters from "../../components/products/Filters";
import ProductsList from "../../components/products/ProductsList";
import Slider from "../../components/slider/Slider";

const LandingPage = () => {
  return (
    <>
      <Slider />
      <Container>
        <ProductsList
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
