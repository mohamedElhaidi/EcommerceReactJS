import React, { Component, useEffect, useState } from "react";

import ProductItemCard from "../../components/productItem/productItemCard";

import Pagination from "../../components/pagination/pagination";
import {
  FilterMenu,
  FilterMenuGroup,
  FilterMenuCheckBoxGroup,
  FilterMenuInputItem,
  DoubleRangeInput,
} from "../../components/filterMenu";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getSubCategoriesProductsWithPagination } from "../../../js/services/productService";
import DropDownMenu from "../../components/dropDownMenu";

import "../../../css/pages/search/searchPage.css";
import "../../../css/menu/side-menu.css";
import "../../../css/menu/inputNumber.css";

import "../../../css/menu/doubleRangeInput.css";
export const SubCategoryPage = () => {
  let { cat: catName, subCat } = useParams(); // get cat and sCat
  let [searchParams, setSearchParams] = useSearchParams();

  //products states
  const [subsCatAndProducts, setSubsCatAndProducts] = useState([]);

  //filter
  const [appliedFilter, setAppliedFilter] = useState(false);
  const [brands, setBrands] = useState([]);
  const [FilteredBrands, setFilteredBrands] = useState("");
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [pricestProduct, setPricestProduct] = useState(5);
  const [cheapestProduct, setCheapestProduct] = useState(0);

  const changeStateOfBrand = (id) => {
    const tBrands = [...brands];
    tBrands[id].selected = !tBrands[id].selected;
    setBrands(tBrands);
  };

  //pagination states
  const [currentPageNumber, setcurrentPageNumber] = useState(
    searchParams.get("page") || 0
  );
  const [productsLimitPerPage, setproductsLimitPerPage] = useState(15);
  const [productsCount, setproductsCount] = useState(0);
  const [maxPagesCount, setmaxPagesCount] = useState(3);

  // title
  useEffect(() => {
    document.title = `${subCat} - BestShop.com`;
  }, []);

  useEffect(() => {
    getSubCategoriesProductsWithPagination({
      subCatName: subCat,
      count: productsLimitPerPage,
      currentPage: currentPageNumber,
      brands: FilteredBrands,
      priceMin: priceMin,
      priceMax: priceMax,
    }).then((data) => {
      const {
        count,
        brands,
        products,
        priceMax,
        priceMin,
        selectedPriceMax,
        selectedPriceMin,
        cheapestProduct,
        pricestProduct,
        selectedBrands,
      } = data;
      //if we have prodcts then Update
      if (count) {
        setSubsCatAndProducts(products);
        setproductsCount(count);

        //for price silder
        setCheapestProduct(cheapestProduct);
        setPricestProduct(pricestProduct);

        //previous prices
        setPriceMax(selectedPriceMax);
        setPriceMin(selectedPriceMin);

        //brands for filter
        const brandsTp = [];
        brands.forEach((brand) => {
          if (!brandsTp.find((b) => brand.name === b.name)) {
            const newbrand = brand;
            console.log(selectedBrands.includes(newbrand.id));
            // initialized for the controlled input
            if (selectedBrands.includes(newbrand.id)) {
              newbrand.selected = true;
            } else newbrand.selected = false;
            brandsTp.push(newbrand);
          }
        });
        setBrands([...brandsTp]);
        //replace url with new page index
        window.history.replaceState(
          null,
          "New Page Title",
          `/category/${catName}/${subCat}?page=${currentPageNumber}`
        );
      }
    });
  }, [currentPageNumber, FilteredBrands, appliedFilter]);

  const onFilterAppliedHandle = (data) => {
    let brandsString = brands.reduce((prev, current) => {
      if (current.selected)
        if (prev !== "") return prev + "," + current.id;
        else return current.id;
      return prev;
    }, "");
    setFilteredBrands(brandsString);
    setAppliedFilter(!appliedFilter);
  };
  return (
    <div className=" result-container">
      <FilterMenu onFilterAppliedHandle={onFilterAppliedHandle}>
        <FilterMenuCheckBoxGroup title="Brands">
          {brands.map((brand, index) => (
            //new input for each brand in filters
            <FilterMenuInputItem
              key={brand.id}
              type="checkbox"
              id={index}
              text={brand.name}
              value={brand.id}
              checked={brand.selected}
              onChange={changeStateOfBrand}
            />
          ))}
        </FilterMenuCheckBoxGroup>
        {/* <FilterMenuRadioBoxGroup title="Colors">
          <FilterMenuInputItem type="radio" id={12} text="Color 1" />
          <FilterMenuInputItem type="radio" id={13} text="Color 1" />
          <FilterMenuInputItem type="radio" id={15} text="Color 1" />
          <FilterMenuInputItem type="radio" id={14} text="Color 1" />
          <FilterMenuInputItem type="radio" id={16} text="Color 1" />
        </FilterMenuRadioBoxGroup> */}

        {/* render price range only when we have products */}
        <FilterMenuGroup title="Price range">
          <DoubleRangeInput
            minLimit={cheapestProduct}
            maxLimit={pricestProduct}
            minValue={priceMin}
            maxValue={priceMax}
            setMaxHandle={setPriceMax}
            setMinHandle={setPriceMin}
            gap={30}
          />
        </FilterMenuGroup>
      </FilterMenu>

      {/* Product section */}
      <div className="products-list">
        <SortMenu />
        <h2>
          {productsCount} Products from "{subCat} "
        </h2>
        <div className="products">
          {subsCatAndProducts.map((product) => (
            <ProductItemCard key={product.id} product={product} />
          ))}
        </div>
        {/* pagination */}
        <Pagination
          setcurrentPageNumber={setcurrentPageNumber}
          currentPageNumber={currentPageNumber}
          maxPagesCount={Math.ceil(productsCount / productsLimitPerPage)}
          pagesCountLimit={maxPagesCount}
        />
      </div>
    </div>
  );
};

const SortMenu = () => {
  const buttonStyle = {
    padding: "0.3em 1em",
    border: "solid orange 2px",
    backgroundColor: "orange",
    color: "white",
    borderRadius: "5px",
  };
  const listStyle = {
    top: "100%",
    right: "0%",
    transform: "translateX(50%)",
  };
  const handleItemListSelection = (itemKey) => {
    console.log(itemKey);
  };
  return (
    <div className="sort-menu">
      <DropDownMenu
        buttonStyle={buttonStyle}
        listStyle={listStyle}
        text="Sort by"
        onItemListSelected={handleItemListSelection}
      >
        <li>by price</li>
        <li>by popularity</li>
        <li>by newest</li>
        <li>by oldest</li>
      </DropDownMenu>
    </div>
  );
};

export default SortMenu;
