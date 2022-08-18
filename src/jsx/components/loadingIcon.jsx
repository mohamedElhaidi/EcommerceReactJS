import styled from "styled-components";
const LoadingIcon = styled.div`
  position: relative;
  min-height: 50px;
  min-width: 100%;
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border: solid ${(props) => props.color || "orange"} 3px;
    animation-name: XInfinitRotation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.31, 0.31, 1, 1);
  }

  @keyframes XInfinitRotation {
    from {
      transform: rotateZ(0deg);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
`;

export default LoadingIcon;
