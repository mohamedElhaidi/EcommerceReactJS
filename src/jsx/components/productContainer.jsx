import "../../css/pages/product/productsContainer.css";
import PageSection from "../pages/pageSection";
import LoadingIcon from "./loadingIcon";

const ProductsContainer = ({ title, seeMoreURL, children }) => {
  return (
    <PageSection title={title} seeMoreURL={seeMoreURL}>
      {!children.length ? (
        <LoadingIcon />
      ) : (
        <div className="products-container">{children}</div>
      )}
    </PageSection>
  );
};

export default ProductsContainer;
