import { Fragment } from "react";
import styled from "styled-components";

const SplitHeroStyle = styled.div`
  margin-top: 1em;
  height: 15rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
  padding: 0.5em;
  background-color: white;
  border-radius: 5px;
  font-size: 1rem;
  & > div {
    position: relative;
    width: 100%;
    background-color: rgb(241, 138, 2);
    border-radius: 5px;
  }
  & > :nth-child(2) {
    background-color: #ff83ff;
  }
`;
const HeroStyle = styled.div`
  position: relative;
  overflow: hidden;

  transition-duration: 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    z-index: 99;
    & > h1 {
      transform: translateY(-50%) scale(1.05);
    }
    & > div {
      transform: translateY(-50%) scale(1.1);
    }
  }

  & > :first-child {
    position: absolute;
    top: 50%;
    left: 2em;
    transform: translateY(-50%);

    transition-duration: inherit;
    color: #fff;
    & > h1 {
      transition-duration: inherit;
      font-size: 3em;
    }
    & > p {
      transition-duration: inherit;
      font-size: 1.5em;
      color: #ffffffdf;
    }
  }
  & > :last-child {
    position: absolute;
    top: 50%;
    right: 2em;
    transform: translateY(-50%);
    width: 13em;
    height: 13em;
    transition-duration: inherit;
    background-image: url(${(props) => props.image});
    background-size: cover;
  }
`;

const DoubleSections = ({ leftItem = {}, rightItem = {} }) => {
  const {
    imageUrl: imageUrl1,
    primaryText: primaryText1,
    secondaryText: secondaryText1,
  } = leftItem;
  const {
    imageUrl: imageUrl2,
    primaryText: primaryText2,
    secondaryText: secondaryText2,
  } = rightItem;
  return (
    <Fragment>
      <SplitHeroStyle>
        {leftItem && (
          <HeroStyle image={imageUrl1}>
            <div>
              <h1>{primaryText1}</h1>
              <p>{secondaryText1}</p>
            </div>
            <div></div>
          </HeroStyle>
        )}
        {rightItem && (
          <HeroStyle image={imageUrl2}>
            <div>
              <h1>{primaryText2}</h1>
              <p>{secondaryText2}</p>
            </div>
            <div></div>
          </HeroStyle>
        )}
      </SplitHeroStyle>
    </Fragment>
  );
};

export default DoubleSections;
