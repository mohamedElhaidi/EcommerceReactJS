import styled from "styled-components";

const ProductItemStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.2em;
  width: 100%;
  max-width: 180px;
  min-width: 180px;
  font-size: 1rem;

  & > .product {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 180px;
    min-width: 180px;
    font-size: 1rem;

    background-color: rgb(255, 255, 255);

    padding: 0.2em;
    overflow: hidden;

    cursor: pointer;

    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    &.product-best {
      border-top: solid rgb(250, 33, 33) 5px;
      border-bottom: solid rgb(250, 33, 33) 5px;
      border-left: solid rgb(250, 33, 33) 2px;
      border-right: solid rgb(250, 33, 33) 2px;
      box-shadow: rgba(250, 33, 33, 0.253) 0 0 5px 0;
      &::after {
        display: block;
        content: "Best Offer";
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.3em;

        background-color: rgba(250, 33, 33, 0.877);
        color: white;
        font-weight: 500;
      }
    }

    &:hover .title {
      color: rgb(17, 131, 238);
    }
    & .thumbnail {
      width: 180px;
      height: 180px;
    }

    & .info {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 0.1em;
      width: 100%;
    }

    & .title {
      font-size: 0.9em;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      max-width: 100%;
    }

    & .rating {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    & .stars-empty {
      width: 100%;
      height: 100%;
    }
    & .stars-fill {
      width: 100%;
      height: 100%;
    }
    & .stock {
      font-weight: 400;
      font-size: 0.8em;
    }

    & .price .final-price {
      font-weight: bold;
      font-size: 1.1em;
    }
  }
  & .add-cart-btton {
    opacity: 0;
  }
  &:hover .add-cart-btton {
    opacity: 100%;
  }
  & .price .previous-price {
    font-weight: normal;
    font-size: 0.9em;
    text-decoration: line-through;
    color: rgb(117, 117, 117);
  }

  & .favoriteButton {
    width: 2em;
    height: 2em;

    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5em;
    fill: white;
    transition-duration: 0.3s;
  }

  & .favoriteButton:hover {
    transform: scale(1.2);
    animation: favoriteHeartBeat 0.9s infinite;
  }
  & .favoriteSVG {
    width: 2em;
    height: 2em;
    fill: rgba(201, 2, 2, 0.473);
    cursor: pointer;
  }
  &:hover .favoriteSVG {
    fill: rgb(255, 0, 0);
  }
  @keyframes favoriteHeartBeat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default ProductItemStyled;
