const dropDowns99 = document.querySelectorAll(".dropdown");
dropDowns99.forEach((dropDown) => {
  const button = dropDown.getElementsByClassName("toggler")[0];
  const overlay = dropDown.getElementsByClassName("overlay")[0];
  const ul = dropDown.getElementsByClassName("list")[0];
  if (button) {
    overlay.addEventListener("click", () => ul.classList.remove("toggle"));
    button.addEventListener("click", () => ul.classList.toggle("toggle"));
  }
});
