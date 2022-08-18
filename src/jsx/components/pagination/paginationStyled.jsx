import styled from "styled-components";

export const PaginationStyled = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  font-size: 1em;
  font-weight: 400;
  color: white;

  & > button {
    display: block;
    background-color: rgb(255, 123, 0);
    color: inherit;
    width: 2.5em;
    height: 2.5em;

    text-align: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      background-color: gray;
    }
    & > div {
      margin-top: 25%;
    }
  }
`;
