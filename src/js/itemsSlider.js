class ItemsSlider {
  #swiper;
  #items;
  #leftArrow;
  #rightArrow;
  constructor(id, options) {
    this.#swiper = document.querySelector(id);
    this.#items = this.#swiper.querySelector(".items");
    this.#leftArrow = this.#swiper.querySelector(".left-arrow");
    this.#rightArrow = this.#swiper.querySelector(".right-arrow");
    this.#leftArrow.addEventListener("mousedown", () => this.#slide(-1));
    this.#rightArrow.addEventListener("mousedown", () => this.#slide(1));
  }

  index = 0;
  #slide(side) {
    this.index += side;
    const scrollBy = this.#items.getClientRects()[0].width;
    this.#items.scroll({
      top: 0,
      left: this.#items.scrollLeft + scrollBy * side,
      behavior: "smooth",
    });
  }
}

const itemsSlider = new ItemsSlider("#swipper", null);
