import "../../css/pages/product/productsContainer.css";
import PageSection from "../pages/pageSection";

const ProductsContainer = ({ title, seeMoreURL, children }) => {
  return (
    <PageSection title={title} seeMoreURL={seeMoreURL}>
      <div className="products-container">{children}</div>
    </PageSection>
  );
};

export default ProductsContainer;
