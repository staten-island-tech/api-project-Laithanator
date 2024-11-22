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
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}
getData();

const data = await response.json();

function run() {
  statisticOne = response.length;
}

function cardCreate(array) {
  DOMSelectors.container.insertAdjacentHTML("beforeEnd");
}
