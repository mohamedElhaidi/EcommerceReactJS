import React, { Component, useEffect, useState } from "react";
import "../../../css/pages/search/searchPage.css";

import ProductItemCard from "../../components/productItem/productItemCard";

import {
  FilterMenu,
  FilterMenuGroup,
  FilterMenuLinkItem,
  FilterMenuCheckBoxGroup,
  FilterMenuRadioBoxGroup,
  FilterMenuInputItem,
  DoubleRangeInput,
  FilterMenuButtonsGroup,
} from "../../components/filterMenu";
import Pagination from "../../components/pagination/pagination";
import { ButtonNoBgOrangeText } from "../../components/buttons";

export default class SearchPage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className=" result-container">
        <FilterMenu>
          <FilterMenuGroup title="Categories">
            <FilterMenuLinkItem label="Tshirt" />
            <FilterMenuLinkItem label="Pants" />
            <FilterMenuLinkItem label="Watches" />
            <FilterMenuLinkItem label="Hey hey!" />
          </FilterMenuGroup>
          <FilterMenuCheckBoxGroup title="Sizes">
            <FilterMenuInputItem type="checkbox" id={0} value="Size 1" />
            <FilterMenuInputItem type="checkbox" id={1} value="Size 2" />
            <FilterMenuInputItem type="checkbox" id={2} value="Size 3" />
            <FilterMenuInputItem type="checkbox" id={3} value="Size 4" />
            <FilterMenuInputItem type="checkbox" id={4} value="Size 5" />
          </FilterMenuCheckBoxGroup>
          <FilterMenuRadioBoxGroup title="Colors">
            <FilterMenuInputItem type="radio" id={12} value="Color 1" />
            <FilterMenuInputItem type="radio" id={13} value="Color 1" />
            <FilterMenuInputItem type="radio" id={15} value="Color 1" />
            <FilterMenuInputItem type="radio" id={14} value="Color 1" />
            <FilterMenuInputItem type="radio" id={16} value="Color 1" />
          </FilterMenuRadioBoxGroup>
          <FilterMenuGroup title="Price range">
            <DoubleRangeInput minLimit={0} maxLimit={100} gap={25} />
          </FilterMenuGroup>
          <FilterMenuButtonsGroup>
            <ButtonNoBgOrangeText>Reset</ButtonNoBgOrangeText>
            <ButtonNoBgOrangeText>Apply</ButtonNoBgOrangeText>
          </FilterMenuButtonsGroup>
        </FilterMenu>
        <div className="products-list">
          <h2>15 Results matching "Search query here"</h2>
          <div className="products">
            <ProductItemCard />
            <ProductItemCard />
            <ProductItemCard />
            <ProductItemCard />
            <ProductItemCard />
            <ProductItemCard />
          </div>
          <Pagination
            url="#"
            currentPageNumber={15}
            maxPagesCount={100}
            pagesCountLimit={2}
          />
        </div>
      </div>
    );
  }
}
