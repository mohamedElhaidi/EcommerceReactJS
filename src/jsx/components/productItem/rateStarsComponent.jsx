import starSVG from "../../../res/svg/stars/star.svg";
import starFilledSVG from "../../../res/svg/stars/starFilled.svg";

export const RateStarsComponent = ({ size = 1.2, likes, dislikes }) => {
  let score = (likes / (likes + dislikes)) * 100;
  score = score < 20 ? 20 : score;

  const starsStyle = {
    position: "relative",
    width: "6.1em",
    height: "0.9em",
    backgroundRepeat: "repeat-x",
    fontSize: "1em",
    backgroundSize: "contain",
  };
  const starsFillStyle = {
    backgroundSize: "contain",
    backgroundRepeat: "repeat-x",
    position: "absolute",
    top: 0,
    left: 0,
    height: "inherit",
  };
  return (
    <div style={{ fontSize: `${size}rem` }}>
      <div style={{ ...starsStyle, backgroundImage: `url(${starSVG})` }}>
        <div
          style={{
            ...starsFillStyle,
            backgroundImage: `url(${starFilledSVG})`,
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
};
export default RateStarsComponent;
