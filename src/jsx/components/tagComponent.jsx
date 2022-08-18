const TagComponent = ({ backgroundColor, color, text, style }) => {
  const tagStyle = {
    backgroundColor: backgroundColor,
    color: color,
    padding: "0.2em 0.5em",
    width: "fit-content",
    borderRadius: "5px",
    fontSize: "0.9em",
    fontWeight: "500",
  };
  return <span style={{ ...tagStyle, style }}>{text}</span>;
};
export default TagComponent;
