class DoubleRangeInput {
  doubleRangeSliderGroup;
  doubleRangeSlider;
  doubleRangeSliderBar;
  doubleRangeSliderX;
  doubleRangeSliderY;
  doubleRangeSliderMinInput;
  doubleRangeSliderMaxInput;
  minLimit;
  maxLimit;
  gap;
  min;
  max;
  constructor(id, options) {
    this.doubleRangeSliderGroup = document.querySelector(id);
    //slider
    this.doubleRangeSlider =
      this.doubleRangeSliderGroup.querySelector(".range-silder");
    this.doubleRangeSliderBar = this.doubleRangeSlider.querySelector(
      ".range-silder .paint"
    );
    this.doubleRangeSliderX =
      this.doubleRangeSlider.querySelector("input[name='x']");
    this.doubleRangeSliderY =
      this.doubleRangeSlider.querySelector("input[name='y']");

    //numeric inputs
    this.doubleRangeSliderMinInput =
      this.doubleRangeSliderGroup.querySelector(".min-input");
    this.doubleRangeSliderMaxInput =
      this.doubleRangeSliderGroup.querySelector(".max-input");

    this.minLimit = options.min || 0; //initial value
    this.maxLimit = options.max || 1000; //initial value
    this.gap = options.gap || 0; //initial value

    this.min = options.initMin || this.minLimit; //mutable value
    this.max = options.initMax || this.maxLimit; //mutable value

    this.doubleRangeSliderMinInput.value = this.min;
    this.doubleRangeSliderMaxInput.value = this.max;

    this.doubleRangeSliderMinInput.min = this.minLimit;
    this.doubleRangeSliderMinInput.max = this.maxLimit - this.gap;
    this.doubleRangeSliderMaxInput.min = this.minLimit;
    this.doubleRangeSliderMaxInput.max = this.maxLimit;

    this.syncInputs();

    this.doubleRangeSliderX.max = this.max;
    this.doubleRangeSliderX.value = this.min;
    this.doubleRangeSliderY.max = this.max;
    this.doubleRangeSliderY.value = this.max;

    this.doubleRangeSliderX.addEventListener("input", () =>
      this.changeMinFromSlider()
    );
    this.doubleRangeSliderY.addEventListener("input", () =>
      this.changeMaxFromSlider()
    );

    this.doubleRangeSliderMinInput.addEventListener("change", () =>
      this.changeMinFromInput()
    );
    this.doubleRangeSliderMaxInput.addEventListener("change", () =>
      this.changeMaxFromInput()
    );

    // if (navigator.userAgent.indexOf("Chrome") === -1) {
    //     this.doubleRangeSliderX.style.pointerEvents = "auto";
    //     this.doubleRangeSliderY.style.pointerEvents = "auto";
    // }
  }

  changeMinFromSlider() {
    this.checkSliderX(this.doubleRangeSliderX.value);
    this.min = parseFloat(this.doubleRangeSliderX.value);
    this.syncInputs();
  }

  changeMaxFromSlider() {
    this.checkSliderY();
    this.max = parseFloat(this.doubleRangeSliderY.value);
    this.syncInputs();
  }

  changeMinFromInput() {
    this.checkInputMin();
    this.min = parseFloat(this.doubleRangeSliderMinInput.value);
    this.syncSliders();
  }

  changeMaxFromInput() {
    this.checkInputMax();
    this.max = parseFloat(this.doubleRangeSliderMaxInput.value);
    this.syncSliders();
  }

  checkSliderX() {
    const X = this.doubleRangeSliderX.value;
    if (X >= this.max - this.gap)
      this.doubleRangeSliderX.value = this.max - this.gap;
  }

  checkSliderY() {
    const Y = this.doubleRangeSliderY.value;
    if (Y <= this.min + this.gap) {
      this.doubleRangeSliderY.value = this.min + this.gap;
    }
  }
  checkInputMin() {
    const X = this.doubleRangeSliderMinInput.value;
    if (X < this.minLimit) this.doubleRangeSliderMinInput.value = this.minLimit;
    if (X > this.max - this.gap)
      this.doubleRangeSliderMinInput.value = this.max - this.gap;
  }

  checkInputMax() {
    const Y = this.doubleRangeSliderMaxInput.value;
    if (Y < this.min + this.gap)
      this.doubleRangeSliderMaxInput.value = this.min + this.gap;
    if (Y > this.maxLimit) this.doubleRangeSliderMaxInput.value = this.maxLimit;
  }

  syncInputs() {
    const progressStart = (this.min * 100) / this.maxLimit;
    const progressWidth = (this.max * 100) / this.maxLimit;
    this.doubleRangeSliderMinInput.value = this.min;
    this.doubleRangeSliderMaxInput.value = this.max;
    this.doubleRangeSliderBar.style.left = progressStart + "%";
    this.doubleRangeSliderBar.style.width = progressWidth - progressStart + "%";
  }
  syncSliders() {
    const progressStart = (this.min * 100) / this.maxLimit;
    const progressWidth = (this.max * 100) / this.maxLimit;
    this.doubleRangeSliderX.value = this.min;
    this.doubleRangeSliderY.value = this.max;
    this.doubleRangeSliderBar.style.left = progressStart + "%";
    this.doubleRangeSliderBar.style.width = progressWidth - progressStart + "%";
  }
}
