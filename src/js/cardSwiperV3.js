export default class CardSwiper {
  //elements
  #cs;
  #cardsTrackHolder;
  #cardsTrack;
  #cards;
  #dotsHolder;
  #dots;
  #leftArrow;
  #rightArrow;

  //others
  SliderInterval; // async
  loopInterval = 2500;
  loopable = false;
  index = 0;

  cardWidth = 0;
  cardHeight = 0;
  cardUnit = "px";
  cardsCount;
  strechCardWidthToEnd = false;

  isMouseDown = false;
  mouseDownPointerX = 0;
  trackPositionX = 0;
  trackHolderPositionX = 0;
  trackPositionOnScreenX = 0;
  pointerSlideDirection = 0;

  constructor(id, options) {
    //setup
    this.index = options.index;
    this.loopInterval = options.loopInterval;
    this.loopable = options.loopable;
    this.cardWidth = options.cardWidth;
    this.cardHeight = options.cardHeight;
    this.cardUnit = options.cardUnit;
    this.strechCardWidthToEnd = options.strechCardWidthToEnd;
    this.swipMargin = options.swipMargin / 100; // precentage of margine to trigger sliding

    this.#cs = document.querySelector("#" + id);
    if (!this.#cs) {
      console.error("Can't find CardsSwiper by id provided");
      return;
    }
    this.#cardsTrackHolder = this.#cs.querySelector(".cards");
    this.#cardsTrack = this.#cardsTrackHolder.querySelector(".track ");
    this.#cards = this.#cardsTrack.querySelectorAll(".card");
    this.#dotsHolder = this.#cs.querySelector(".dots");
    this.#leftArrow = this.#cs.querySelector(".arrows .arrow-right");
    this.#rightArrow = this.#cs.querySelector(".arrows .arrow-left");

    //generet dots
    this.#dots = [];
    this.generateDots();
    //get number of childrens
    this.cardsCount = this.#cards.length;

    //controling the looping process by mouse and touch
    this.#cs.addEventListener("mouseleave", () => this.unPauseSliding());
    this.#cs.addEventListener("touchend", () => this.unPauseSliding());
    this.#cs.addEventListener("mouseover", () => this.pauseSliding());
    this.#cs.addEventListener("touchstart", () => this.pauseSliding());

    //left arrow handler
    this.#leftArrow.addEventListener("click", () =>
      this.slideToIndex(this.index - 1)
    );
    //right arrow handler
    this.#rightArrow.addEventListener("click", () =>
      this.slideToIndex(this.index + 1)
    );

    this.#cs.addEventListener("mousedown", (event) => {
      this.isMouseDown = true;
      this.RegisterTrackAndHolderPositionX();
      this.mouseDownPointerX = this.currentPointerLocation(event);
    });
    this.#cs.addEventListener("touchstart", (event) => {
      this.isMouseDown = true;
      this.RegisterTrackAndHolderPositionX();
      this.mouseDownPointerX = this.currentPointerLocation(event);
    });

    //re-locating the track to closest card
    const fixTrackHandler = () => {
      this.RegisterTrackAndHolderPositionX();
      if (this.isMouseDown) {
        this.isMouseDown = false;
        this.fixTrack();
      }
    };
    this.#cs.addEventListener("mouseup", fixTrackHandler);
    this.#cs.addEventListener("mouseleave", fixTrackHandler);
    this.#cs.addEventListener("touchend", fixTrackHandler);
    this.#cs.addEventListener("touchcancel", fixTrackHandler);

    //slide track on drag by mouse
    this.#cs.addEventListener("mousemove", (event) => {
      if (this.isMouseDown) this.dragAndSlide(event);
    });
    this.#cs.addEventListener("touchmove", (event) => {
      if (this.isMouseDown) this.dragAndSlide(event);
    });

    const links = this.#cs.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const pointerDistanceDifferenceX =
          this.mouseDownPointerX - this.currentPointerLocation(event);
        if (pointerDistanceDifferenceX) {
          event.preventDefault();
        }
      });
      //fix for anchor drag in mozilla and chrome, works perfectly
      link.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });
    });

    //change width and height with propotions
    window.addEventListener("resize", this.calculateShape.bind(this));
    this.calculateShape();
    this.initLooping();
  }

  initLooping() {
    //initialize loop
    this.slideToIndex(this.index);
    this.unPauseSliding();
  }
  //generate dots elements
  generateDots() {
    this.#cards.forEach((card, key) => {
      const h = document.createElement("span");
      h.className = "dot";
      h.id = "dot" + key;
      h.addEventListener("click", this.slideToIndex.bind(this, key));
      this.#dotsHolder.appendChild(h);
      this.#dots.push(h);
    });
  }

  //hightliting dot of current index
  focusDot() {
    if (!this.#dots[this.index].className.includes("focused")) {
      this.#dots.forEach((dot) => {
        dot.classList.remove("focused");
      });
      this.#dots[this.index].classList.add("focused");
    }
  }

  // called to handle sliding
  dragAndSlide(event) {
    event.preventDefault();
    const pointerDistanceDifferenceX =
      this.mouseDownPointerX - this.currentPointerLocation(event);
    if (pointerDistanceDifferenceX > 0) this.pointerSlideDirection = 1;
    else if (pointerDistanceDifferenceX < 0) this.pointerSlideDirection = -1;
    else this.pointerSlideDirection = 0;

    let newTrackPositionX =
      this.trackPositionOnScreenX -
      this.trackHolderPositionX -
      pointerDistanceDifferenceX;
    if (newTrackPositionX <= 0 && newTrackPositionX >= -this.getTrackWidth()) {
      this.#cardsTrack.style.transitionDuration = `0s`;
      this.#cardsTrack.style.transform = `translateX(${newTrackPositionX}px)`;
    }
  }

  //to refocus on closest card or slide to next/previous
  swipMargin = 0;
  fixTrack() {
    const [cardWidth, cardHeight] = this.getCardFinalDimensions();
    this.#cardsTrack.style.transitionDuration = `0.5s`;
    const position = Math.abs(
      this.getTrackLiveDistanceDifferenceX() / cardWidth
    );
    const positionFraction = position - Math.floor(position);
    let newIndex = 0;
    if (this.pointerSlideDirection > 0 && positionFraction >= this.swipMargin) {
      newIndex = Math.floor(position) + 1;
    } else if (
      this.pointerSlideDirection < 0 &&
      positionFraction <= 1 - this.swipMargin
    ) {
      newIndex = Math.floor(position);
    } else newIndex = this.index;

    this.slideToIndex(newIndex);
    // console.log("pointerDirection", this.pointerSlideDirection);
    // console.log("positionFraction", positionFraction);
  }

  //slide to specified card by index
  slideToIndex(key) {
    {
      const [cardWidth, cardHeight] = this.getCardFinalDimensions();
      const scrollBy = cardWidth;
      if (key > this.cardsCount - 1) this.index = 0;
      else if (key < 0) this.index = this.cardsCount - 1;
      else this.index = key;

      const newPosition = scrollBy * this.index;
      this.#cardsTrack.style.transform = `translateX(-${newPosition}px)`;
      this.focusDot();
    }
  }

  //destory the Interval
  pauseSliding() {
    if (this.SliderInterval) {
      clearInterval(this.SliderInterval);
      this.SliderInterval = 0;
    }
  }

  unPauseSliding() {
    if (!this.loopable && !this.SliderInterval) return;
    this.SliderInterval = setInterval(() => {
      let key = this.index;
      if (key < this.cardsCount - 1) key = this.index + 1;
      else if (key >= this.cardsCount - 1) key = 0;
      this.slideToIndex(key);
    }, this.loopInterval);
  }

  calculateShape() {
    this.#cards.forEach((card) => {
      const [cardWidth, cardHeight] = this.getCardFinalDimensions();
      card.style.minWidth = cardWidth + this.cardUnit;
      card.style.maxWidth = cardWidth + this.cardUnit;
      card.style.minHeight = cardHeight + this.cardUnit;
      card.style.maxHeight = cardHeight + this.cardUnit;
    });
    this.slideToIndex(this.index);
  }

  getTrackHolderWidth() {
    return this.#cardsTrackHolder.getClientRects()[0].width;
  }

  // ratio to cards holder width
  getRatio() {
    return this.strechCardWidthToEnd
      ? this.getTrackHolderWidth() / this.cardWidth
      : 1;
  }

  getCardFinalDimensions() {
    return [
      this.cardWidth * this.getRatio(),
      this.cardHeight * this.getRatio(),
    ];
  }

  RegisterTrackAndHolderPositionX() {
    this.trackHolderPositionX = this.#cardsTrackHolder.getClientRects()[0].x;
    this.trackPositionOnScreenX = this.#cardsTrack.getClientRects()[0].x;
  }
  getTrackLiveDistanceDifferenceX() {
    const trackPositionOnScreenX = this.#cardsTrack.getClientRects()[0].x;
    const trackHolderPositionX = this.#cardsTrackHolder.getClientRects()[0].x;
    return trackPositionOnScreenX - trackHolderPositionX;
  }

  //returns size of width of cards combined
  getTrackWidth() {
    const [cardWidth, cardHeight] = this.getCardFinalDimensions();
    return cardWidth * (this.cardsCount - 1);
  }

  //get either mouse or touch position on screen
  currentPointerLocation(event) {
    return event.pageX || Math.round(event.changedTouches[0].clientX);
  }
}
