import { Fragment, useEffect, useState } from "react";
import { searchForProducts } from "../../../js/services/productService";

import "../../../css/navBar/searchInput.css";
import loadSVG from "../../../res/svg/load.svg";

const NavBarSearchInput = () => {
  const [searchElementToggle, setSearchElementToggle] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onSearchInput = (event) => {
    const query = event.currentTarget.value;
    setSearchField(query);
    // get data from backend then display it
    if (query.length > 2) {
      setSearchResult([]);
      searchForProducts(query).then((data) => displayResults(data));
    }
  };
  const displayResults = (resault) => {
    //display results taken from the backend
    console.log(resault);
    setSearchResult(resault);
  };
  const clearInput = () => {
    setSearchField("");
    close();
    setSearchResult([]);
  };
  const close = () => {
    setSearchElementToggle(false);
  };
  const show = () => {
    setSearchElementToggle(true);
  };

  return (
    <Fragment>
      {searchElementToggle && <div onClick={close}></div>}
      <div className="input-group">
        <input
          className="searchInput"
          type="text"
          placeholder="LOOKING FOR SOMETHING ??"
          onInput={(event) => onSearchInput(event)}
          value={searchField}
          onClick={show}
        />
        <button className="searchDeleteButton" onClick={() => clearInput()}>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
      <ResaultList searchResult={searchResult} toggle={searchElementToggle} />
    </Fragment>
  );
};
const ResaultList = ({ toggle, searchResult }) => {
  return (
    <div className={`result-list-wrap ${toggle && "toggle"}`}>
      <ul className="resaultList">
        {searchResult.map((item, key) => (
          <SearchResaultCard
            key={key}
            thumbnail={item.thumbnail}
            title={item.title}
            id={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

const SearchResaultCard = ({ id, thumbnail, title }) => {
  return (
    <Fragment>
      <li>
        <a
          className="search-resault-card"
          href={"/product/" + title + "::" + id}
        >
          <img className="preview" src={thumbnail} alt="" />
          <span className="title">{title}</span>
        </a>
      </li>
    </Fragment>
  );
};

export default NavBarSearchInput;
