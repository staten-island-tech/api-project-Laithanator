import "../CSS/style.css";
const DOMSelectors = {
  container: document.querySelector(".cont"),
  side1: document.querySelector("#side1"),
  side2: document.querySelector("#side2"),
  lossScreen: document.querySelector("#lossScreen"),
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
function sideCreate(offense1, num1, offense2, wins, highestWins) {
  DOMSelectors.side1.innerHTML = "";
  DOMSelectors.side2.innerHTML = "";

  DOMSelectors.side1.insertAdjacentHTML(
    "beforeEnd",
    `
      <h3 class="text-2xl font-bold absolute top-0 left-0 m-0 p-4">Highscore: ${highestWins}</h3>
      <h2 class="text-3xl font-bold break-words">${offense1}</h2>
      <h4 class="text-xl">has</h4>
      <h2 class="text-2xl">${num1} Arrests!</h2>
    `
  );

  DOMSelectors.side2.insertAdjacentHTML(
    "afterbegin",
    `<h3 class="text-2xl font-bold absolute top-0 right-0 m-0 p-4">Score: ${wins}</h3>
      <h2 class="text-3xl font-bold break-words">${offense2}</h2>
      <h4 class="text-xl">has</h4>
      <button id="Mbtn" class="btn btn-neutral box-border drop-shadow-sm w-20 bg-green-400 text-white p-2 m-2 rounded">More!</button>
      <button id="Lbtn" class="btn btn-neutral box-border drop-shadow-2xl w-20 bg-red-500 text-white p-2 m-2 rounded">Less!</button>
      <h4 class="text-xl break-words">Arrests than ${offense1}</h4>
    `
  );
}

function setBtns(num1, offense2, num2, wins, highestWins) {
  let Mbtn = document.querySelector("#Mbtn");
  let Lbtn = document.querySelector("#Lbtn");
  Mbtn.replaceWith(Mbtn.cloneNode(true));
  Lbtn.replaceWith(Lbtn.cloneNode(true));
  Mbtn = document.querySelector("#Mbtn");
  Lbtn = document.querySelector("#Lbtn");
  Mbtn.addEventListener("click", () => {
    if (num2 > num1) {
      wins += 1;
      continueGame(offense2, num2, wins, highestWins);
    } else {
      if (wins > highestWins) {
        highestWins = wins;
      }
      wins = 0;
      DOMSelectors.lossScreen.insertAdjacentHTML(
        "beforeend",
        `<div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>
        <img class="z-10 w-100 h-auto left-1/2 top-1/4 absolute transform -translate-x-1/2 -translate-y-1/2" src="ximage.png" alt="Game Over Image">
        <button class="btn btn-neutral box-border drop-shadow-sm w-40 bg-orange-500 text-white p-2 m-2 rounded text-xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="retryBtn">Retry?</button>`
      );
      let Rbtn = document.querySelector("#retryBtn");
      Rbtn.replaceWith(Rbtn.cloneNode(true));
      Rbtn = document.querySelector("#retryBtn");
      Rbtn.addEventListener("click", () => {
        DOMSelectors.lossScreen.innerHTML = "";
        beginGame(highestWins);
      });
    }
  });
  Lbtn.addEventListener("click", () => {
    if (num1 > num2) {
      wins += 1;
      continueGame(offense2, num2, wins, highestWins);
    } else {
      if (wins > highestWins) {
        highestWins = wins;
      }
      wins = 0;
      DOMSelectors.lossScreen.insertAdjacentHTML(
        "beforeend",
        `<img class="z-10 w-100 h-auto left-1/2 top-1/4 absolute transform -translate-x-1/2 -translate-y-1/2" src="ximage.png" alt="Game Over Image">
        <button class="btn btn-neutral box-border drop-shadow-sm w-40 bg-orange-500 text-white p-2 m-2 rounded text-xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="retryBtn">Retry?</button>`
      );
      let Rbtn = document.querySelector("#retryBtn");
      Rbtn.replaceWith(Rbtn.cloneNode(true));
      Rbtn = document.querySelector("#retryBtn");
      Rbtn.addEventListener("click", () => {
        DOMSelectors.lossScreen.innerHTML = "";
        beginGame(highestWins);
      });
    }
  });
}
const wins = 0;
const highestWins = 0;
async function beginGame(highestWins) {
  const offense1 = await makeOffense();
  const num1 = await numOffense(offense1);
  let offense2 = await makeOffense();
  while (offense2 === offense1) {
    offense2 = await makeOffense();
  }
  let num2 = await numOffense(offense2);
  while (num2 === num1) {
    num2 = await numOffense(offense2);
  }
  sideCreate(offense1, num1, offense2, wins, highestWins);
  setBtns(num1, offense2, num2, wins, highestWins);
}
beginGame(highestWins);
async function continueGame(winOffense, winNum, wins, highestWins) {
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
  sideCreate(offense1, num1, offense2, wins, highestWins);
  setBtns(num1, offense2, num2, wins, highestWins);
}
