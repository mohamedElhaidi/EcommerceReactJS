import "../../css/checkoutComponent/stepProgress.css";
const StepProgress = ({ values = [], current = 1, setCurrentHandler }) => {
  const width = 100 / (values.length - 1);
  const progress = width * current;

  return (
    <div className="step-progress">
      <div className="progress-bar gray"></div>
      <div className="progress-bar" style={{ width: progress + "%" }}></div>
      <div className="steps">
        {values.map((v, key) => {
          const status = key <= current ? "" : "disabled";
          let xPosition = key * width;
          if (key === values.length - 1) xPosition = 100;
          return (
            <div
              key={key}
              className={"step " + status}
              style={{ left: xPosition + "%" }}
              onClick={() => setCurrentHandler(key)}
            >
              <span className={status}>{key + 1}</span>
              <span className="title">{v}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
