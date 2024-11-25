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
      return data;
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}

async function run() {
  const data = await getData();
  const randomNum = Math.floor(Math.random() * data.length);
  const statisticOne = data[randomNum].ofns_desc;
  return statisticOne;
}
run().then((result) => {
  const statisticOne = result;
});
console.log(`stat one outside ${statisticOne}`);
function cardCreate(array) {
  DOMSelectors.container.insertAdjacentHTML("beforeEnd");
}
