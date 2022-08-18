import { PaginationStyled } from "./paginationStyled";

const Pagination = ({
  currentPageNumber, //selected page
  maxPagesCount, //n of pages
  pagesCountLimit, //n of pages in left and right to show
  setcurrentPageNumber, // handle to set crrent page n to parent
}) => {
  const pages = [];

  maxPagesCount -= 1;

  const pageStart =
    currentPageNumber > pagesCountLimit
      ? currentPageNumber - pagesCountLimit
      : 0;
  const pageEnd =
    currentPageNumber + pagesCountLimit < maxPagesCount
      ? currentPageNumber + pagesCountLimit
      : maxPagesCount;

  for (let i = pageStart; i <= pageEnd; i++) {
    pages.push(i);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PaginationStyled>
        <DefaultPageItem
          currentPageNumber={currentPageNumber}
          text="First"
          handle={setcurrentPageNumber}
          number={0}
        />
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            number={page}
            onClickHandle={setcurrentPageNumber}
            currentPageNumber={currentPageNumber}
          />
        ))}
        <DefaultPageItem
          currentPageNumber={currentPageNumber}
          text="Last"
          handle={setcurrentPageNumber}
          number={maxPagesCount}
        />
      </PaginationStyled>
    </div>
  );
};
const PaginationItem = ({ number, currentPageNumber, onClickHandle }) => {
  const selected = number == currentPageNumber ? "selected" : "";
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClickHandle(number);
      }}
      className={selected}
    >
      <div>{number}</div>
    </button>
  );
};

//Fist and last pages in pagination
const DefaultPageItem = ({ currentPageNumber, text, handle, number }) => {
  return (
    //if the currentPageNumber = number then dont render
    <button
      disabled={currentPageNumber === number}
      onClick={(event) => {
        event.preventDefault();
        handle(number);
      }}
    >
      <div>{text}</div>
    </button>
  );
};

export default Pagination;
