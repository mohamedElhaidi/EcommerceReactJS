import styled from "styled-components";

export const HorizontalSliderStyled = styled.div`
  position: relative;
  width: 100%;
  min-height: 10em;
  background-color: white;
  outline: solid ${(p) => p.color} 3px;
  margin-top: 1em;

  & > h2 {
    font-size: 1.1rem;
    font-weight: 800;
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 1em;
  }

  & .items {
    margin: 1em 1.5em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1em;
    max-width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  & .items > * {
    scroll-snap-align: start;
  }

  & .arrow {
    position: absolute;
    top: 40%;
    padding: 0 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 5em;
    cursor: pointer;
    border-style: none;
    background-color: ${(props) => props.color || "var(--orangPrimary)"};
    border-radius: 15px 0 0 15px;
    transition-duration: 150ms;
  }
  & .arrow:hover {
    width: 4em;
  }
  & .arrow::before {
    display: block;
    content: "";
    width: 2em;
    height: 0.2em;
    border-radius: 5px 0 0 5px;
    background-color: white;

    transform-origin: 100% 100%;
    position: absolute;
    transform: rotate(50deg);
  }

  & .arrow::after {
    display: block;
    content: "";
    width: 2em;
    height: 0.2em;
    border-radius: 5px 0 0 5px;
    background-color: white;

    position: absolute;
    transform-origin: 100% 0%;
    transform: rotate(-45deg);
  }

  & .left-arrow {
    transform: rotate(180deg);
    left: 0;
  }

  & .right-arrow {
    right: 0;
  }

  & .items {
    padding: 0.5em 0;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-color: darkgrey rgba(0, 0, 0, 0.158);
    scrollbar-width: thin;
  }

  & ::-webkit-scrollbar {
    width: 0px;
    height: 5px;
  }

  & .items::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    background-color: rgba(0, 0, 0, 0.158);
    border-radius: 15px;
  }

  & .items::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: darkgrey;
    /* outline: 2px solid slategrey; */
  }

  & .item {
    scroll-snap-align: center;
  }

  @media screen and (max-width: 700px) {
    & .arrow {
      display: none;
      visibility: hidden;
    }

    & {
      margin: 1em 0em !important;
      padding-left: 0em !important;
      padding-right: 0em !important;
    }
    & .items {
      margin: 1em 0.5em;
    }
    & ::-webkit-scrollbar {
      width: 0px;
      height: 7px;
    }
  }
`;
