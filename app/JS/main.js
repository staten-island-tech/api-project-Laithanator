import "../CSS/style.css";
const DOMSelectors = {
  side1: document.querySelector("#side1"),
  side2: document.querySelector("#side2"),
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

async function run() {
  const data = await getData();
  const randomNum = Math.floor(Math.random() * data.length);
  const statistic = data[randomNum].ofns_desc;
  return statistic;
}
async function numStat(stat) {
  const data = await getData();
  const sortedData = data.filter((arrest) => arrest.ofns_desc === stat);
  console.log(`storted data: ${sortedData}`);
  return sortedData.length;
}
function sideCreate(statisticOne, stat1, statisticTwo, stat2) {
  DOMSelectors.side1.innerHTML = "";
  DOMSelectors.side2.innerHTML = "";
  DOMSelectors.side1.insertAdjacentHTML(
    "beforeEnd",
    `<h2>${statisticOne}</h2>
  <h4>has</h4>
  <h2>${stat1}Arrests!</h2>`
  );
  DOMSelectors.side1.insertAdjacentHTML(
    "afterbegin",
    `<h2>${statisticTwo}</h2>
    <h4>has</h4>
    <button>More!</button>
    <button>Less!</button>
    <h4>Arrests than ${statisticOne}</h4>`
  );
}
const statisticOne = await run();
const stat1 = numStat(statisticOne);
const statisticTwo = await run();
const stat2 = numStat(statisticTwo);
sideCreate(statisticOne, stat1, statisticTwo, stat2);
