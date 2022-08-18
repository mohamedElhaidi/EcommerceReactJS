class SideMenu {
  #hamburgerMenuButton;
  #menuWrapper;
  #closeButton;
  #Menubackground;
  constructor() {
    this.#hamburgerMenuButton = document.querySelector(".hamburgerMenuButton");
    this.#menuWrapper = document.querySelector(".category-wrap");
    this.#closeButton = document.querySelector(".category-wrap .closeButton");
    this.#Menubackground = document.querySelector(".category-wrap .background");

    this.#hamburgerMenuButton.addEventListener("click", () =>
      this.#menuWrapper.classList.toggle("toggle")
    );
    this.#closeButton.addEventListener("click", () =>
      this.#menuWrapper.classList.remove("toggle")
    );
    this.#Menubackground.addEventListener("click", () =>
      this.#menuWrapper.classList.remove("toggle")
    );
  }
}
const sideMenuOptions = {
  menuButton: "sideMenuTriggerer",
  menu: "sideMenu",
};
const sideMenu = new SideMenu(sideMenuOptions);

class SearchGroup {
  #navSearch;
  #searchInput;
  #resultWrap;
  #loadAnimation;
  #resaultList;
  #searchDeleteButton;
  constructor() {
    this.#navSearch = document.querySelector("#navSearch");
    this.#searchInput = this.#navSearch.querySelector(".searchInput");
    this.#resultWrap = this.#navSearch.querySelector(".result-list-wrap");
    this.#loadAnimation = this.#navSearch.querySelector(".load-animation");
    this.#resaultList = this.#navSearch.querySelector(".resaultList");
    this.#searchDeleteButton = this.#navSearch.querySelector(
      ".searchDeleteButton"
    );

    this.#searchInput.addEventListener("input", (event) => this.getResults());
    this.#searchDeleteButton.addEventListener("click", (event) =>
      this.clearInput()
    );
  }

  getResults() {
    // get data from backend then display it
    this.#resaultList.innerHTML = "";
    if (this.#searchInput.value.length > 5) {
      this.#loadAnimation.classList.add("toggle");
      this.show();
      setTimeout(() => this.displayResults(), 1000);
    } else {
      this.close();
    }
  }
  displayResults() {
    //display results taken from the backend
    this.#resaultList.innerHTML = `
              <li>Search resault</li>
              <li>Search resault</li>
              <li>Search resault</li>
              `;
    this.#loadAnimation.classList.remove("toggle");
  }
  clearInput() {
    this.#searchInput.value = "";
    this.close();
  }
  close() {
    this.#loadAnimation.classList.remove("toggle");
    this.#resultWrap.classList.remove("toggle");
  }
  show() {
    this.#resultWrap.classList.add("toggle");
  }
}

const searchBar = new SearchGroup();
