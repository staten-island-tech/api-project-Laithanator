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
function sideCreate(stat1, stat2) {
  DOMSelectors.side1.insertAdjacentHTML("beforeEnd", ``);
}
const statisticOne = await run();
const statistictwo = await run();
sideCreate(statisticOne, statistictwo);
