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
      console.log(data.data);
    }
  } catch (error) {
    alert("couldnt find that agent");
  }
}
getData();

let myMap = L.map(".map").setView([37.61, -122.011], 10);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  // Attribution is obligatory as per copyright!
  maxZoom: 20,
}).addTo(myMap);
