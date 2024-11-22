import "../CSS/style.css";

async function getData() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/uip8-fykc.json"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data.length);
      return data;
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}

const data = getData();
console.log(data.length);
console.log(`number ${Math.ceil(Math.random() * 1000)}`);

function run() {
  console.log(Math.random(data.length));
  let statisticOne = data[Math.random(data.length)];
  console.log(`stat1 ${statisticOne}`);
}
run();
function cardCreate(array) {
  DOMSelectors.container.insertAdjacentHTML("beforeEnd");
}
