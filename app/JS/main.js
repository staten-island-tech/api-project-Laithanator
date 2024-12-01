import "../CSS/style.css";
const DOMSelectors = {
  side1: document.querySelector("#side1"),
  side2: document.querySelector("#side2"),
  Mbtn: document.querySelector("#Mbtn"),
  Lbtn: document.querySelector("#Lbtn"),
};
async function getData() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/uip8-fykc.json"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}

async function makeOffense() {
  const data = await getData();
  const randomNum = Math.floor(Math.random() * data.length);
  const statistic = data[randomNum].ofns_desc;
  return statistic;
}
async function numOffense(stat) {
  const data = await getData();
  const sortedData = data.filter((arrest) => arrest.ofns_desc === stat);
  console.log(`storted data: ${sortedData}`);
  return sortedData.length;
}
function sideCreate(offense1, num1, offense2, wins) {
  DOMSelectors.side1.innerHTML = "";
  DOMSelectors.side2.innerHTML = "";

  DOMSelectors.side1.insertAdjacentHTML(
    "beforeEnd",
    `
      <h2 class="text-3xl font-bold">${offense1}</h2>
      <h4 class="text-xl">has</h4>
      <h2 class="text-2xl">${num1} Arrests!</h2>
    `
  );

  DOMSelectors.side2.insertAdjacentHTML(
    "afterbegin",
    `
      <h3 class="text-2xl font-bold absolute top-0 m-0 p-4">Score: ${wins}</h3>
      <h2 class="text-3xl font-bold">${offense2}</h2>
      <h4 class="text-xl">has</h4>
      <button id="Mbtn" class="box-border bg-green-400 text-white p-2 m-2 rounded">More!</button>
      <button id="Lbtn" class="box-border bg-red-500 text-white p-2 m-2 rounded">Less!</button>
      <h4 class="text-xl">Arrests than ${offense1}</h4>
    `
  );
}

function setBtns(num1, offense2, num2, wins) {
  let Mbtn = document.querySelector("#Mbtn");
  let Lbtn = document.querySelector("#Lbtn");
  Mbtn.replaceWith(Mbtn.cloneNode(true));
  Lbtn.replaceWith(Lbtn.cloneNode(true));
  Mbtn = document.querySelector("#Mbtn");
  Lbtn = document.querySelector("#Lbtn");
  Mbtn.addEventListener("click", () => {
    if (num2 > num1) {
      wins += 1;
      continueGame(offense2, num2, wins);
    } else {
      wins = 0;
      beginGame();
    }
  });
  Lbtn.addEventListener("click", () => {
    if (num1 > num2) {
      wins += 1;
      continueGame(offense2, num2, wins);
    } else {
      wins = 0;
      beginGame();
    }
  });
}
const wins = 0;
async function beginGame() {
  const offense1 = await makeOffense();
  const num1 = await numOffense(offense1);
  const offense2 = await makeOffense();
  const num2 = await numOffense(offense2);
  sideCreate(offense1, num1, offense2, wins);
  setBtns(num1, offense2, num2, wins);
}
await beginGame();
async function continueGame(winOffense, winNum, wins) {
  const offense1 = winOffense;
  const num1 = winNum;
  let offense2 = await makeOffense();
  while (offense2 === offense1) {
    offense2 = await makeOffense();
  }
  let num2 = await numOffense(offense2);
  while (num2 === num1) {
    num2 = await numOffense(offense2);
  }
  sideCreate(offense1, num1, offense2, wins);
  setBtns(num1, offense2, num2, wins);
}
