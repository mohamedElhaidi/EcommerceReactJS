import styled from "styled-components";

export const LoginRegisterStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  width: 100%;
  margin-bottom: 2em;

  & form > * {
    margin-top: 1em;
  }

  & .panel {
    padding: 1em;
    background-color: white;
  }
  & .panel .panel-error-message {
    margin-top: 1em;
    display: block;
    padding: 1em;
    color: white;
    background-color: rgb(255, 0, 0);
  }

  @media all and (max-width: 700px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;
