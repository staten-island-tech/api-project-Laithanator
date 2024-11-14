import "../CSS/style.css";
async function getData() {
  try {
    const response = await fetch("https://www.freetogame.com/api/games");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data.data);
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}
getData();

const DOMSelectors = {
  container: document.querySelector(".container"),
};

function cardCreate(array) {
  DOMSelectors.container.innerHTML = "";
  array.forEach((card) => {
    idCounter += 1;
    DOMSelectors.container.insertAdjacentHTML(
      "beforeEnd",
      `<div class="card" id="card-${idCounter}">
    <h2 class="card-heading" id="heading-${idCounter}">${card.characterName}</h2>
    <h3 class="card-subheading" id="heading-${idCounter}">${card.movieName}</h3>
    <img class="card-img" id="img-${idCounter}" src="${card.imgLink}" alt="${card.alt}"></div>`
    );
  });
}
