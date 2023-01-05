let elList = document.querySelector(".list");
let elInput = document.querySelector("input");
let elForm = document.querySelector("form");
let elPreveBtn = document.querySelector(".preve-btn");
let elNextBtn = document.querySelector(".next-btn");
let page = 1;

let inputVal = elInput.value;

let newArr = [];

const render = (arr, node) => {
  node.innerHTML = [];
  for (i of arr) {
    const newItem = document.createElement("li");
    const newBox = document.createElement("div");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h4");
    const newYear = document.createElement("p");
    const newType = document.createElement("p");

    newItem.setAttribute("class", "shadow rounded-3 list-unstyled");
    newItem.style.width = "341px";
    newBox.setAttribute("class", "h-100 bg-light  ");
    newImg.setAttribute("src", i.Poster);
    newImg.setAttribute("class", "d-block mx-auto w-100");
    newTitle.setAttribute("class", "text-center text-danger mb-0 mt-3");
    newYear.setAttribute("class", "text-center text-warning fs-4 mb-0 mt-3");
    newType.setAttribute("class", "text-center fs-5 text-light");

    newTitle.innerHTML = i.Title;
    newYear.innerHTML = i.Year;
    newType.innerHTML = i.Type;

    node.appendChild(newItem);
    newItem.appendChild(newBox);
    newBox.appendChild(newImg);
    newBox.appendChild(newTitle);
    newBox.appendChild(newYear);
    newBox.appendChild(newType);
  }
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (elInput.value !== "") {
    fetchFunc();
  }
});

function fetchFunc() {
  if (page == 1) {
    elPreveBtn.setAttribute("disabled", "true");
  } else {
    elPreveBtn.removeAttribute("disabled");
  }
  fetch(
    `https://www.omdbapi.com/?apikey=4027b6ec&s=${elInput.value}&page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        render(data.Search, elList);
      }
      if (page == Math.ceil(data.totalResult / 10)) {
        elNextBtn.setAttribute("disabled", "true");
      } else {
        elNextBtn.removeAttribute("disabled");
      }
    });
}

elPreveBtn.addEventListener("click", () => {
  page--;
  fetchFunc();
});
elNextBtn.addEventListener("click", () => {
  page++;
  fetchFunc();
});
