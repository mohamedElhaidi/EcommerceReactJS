import styled from "styled-components";
import { orangPrimaryColor, orangSeconderyColor } from "../globalColors";
const LightOrangeButtonStyle = styled.button`
  display: block;
  background-color: transparent;
  color: ${orangPrimaryColor};
  border-style: none;
  padding: 0.5em;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${orangSeconderyColor};
  }
`;

/* orange button */
const OrangeButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

  padding: 0.5em 1em;
  border-radius: 5px;
  border: none;

  background-color: ${orangPrimaryColor};
  color: white;
  font-weight: 600;
  font-size: 1em;

  cursor: pointer;

  & > * {
    color: inherit;
  }
  & svg {
    fill: white;
    width: 1.5em;
    height: 1.5em;
  }

  & * {
    color: #fff;
  }
`;

export const ButtonNoBgOrangeText = ({ children, ...otherProps }) => {
  return <OrangeButtonStyle {...otherProps}>{children}</OrangeButtonStyle>;
};
export const ButtonOrangeBg = ({ children, ...otherProps }) => {
  return <OrangeButtonStyle {...otherProps}>{children}</OrangeButtonStyle>;
};
export const LinkButtonOrangeBg = ({ className, href, style, children }) => {
  return (
    <OrangeButtonStyle>
      <a href={href} style={style} className={className}>
        {children}
      </a>
    </OrangeButtonStyle>
  );
};
