import "../../css/itemCounter.css";
import "../../css/mixins.css";

const ItemCounter = ({ cartCount = 0, onPlus, onMinus, style }) => {
  return (
    <div style={style} className="itemCounter">
      <button onClick={() => onMinus()}>-</button>
      <span className="count">{cartCount}</span>
      <button onClick={() => onPlus()}>+</button>
    </div>
  );
};

export default ItemCounter;
