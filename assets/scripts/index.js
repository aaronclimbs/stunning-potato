// Aaron
var mymap = L.map("mapId").setView([39, -98], 4);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiYW1rZWlzbGVyIiwiYSI6ImNqeDd4ZzAwMzAzNjkzeWp2dmNmcTk0Y3IifQ.Z7npWddzEk13X4h-2AsFNA"
  }
).addTo(mymap);

// add event listener to form
document.querySelector("#name").addEventListener("submit", function(e) {
  e.preventDefault();
  // clear out any previous markers
  clearOutByClass("leaflet-shadow-pane");
  clearOutByClass("leaflet-marker-pane");
  // grab search term
  search = e.target.search.value;
  e.target.search.value = "";
  // fetch function (could also use ajax)
  fetch(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
    .then(data => data.json())
    .then(response => {
      const locationArr = [];
      // convert response into array
      for (var i = 0; i < response.length; i++) {
        locationArr.push([
          parseFloat(response[i].latitude),
          parseFloat(response[i].longitude)
        ]);
      }
      // filter out null/NaN values
      return locationArr.filter(location => location[0]);
    })
    // iterate through array and add markers
    .then(locationArr => {
      console.log(locationArr);
      locationArr.forEach(location => {
        L.marker(location).addTo(mymap);
      });
    }).catch(err => console.log(err.message))
});

// utility function to clear target out of all children
function clearOutByClass(target) {
  // set targetDiv to selector
  const targetDiv = document.querySelector(`.${target}`);
  // initiate loop to remove children nodes while children nodes exist
  while (targetDiv.firstChild) {
    targetDiv.removeChild(targetDiv.firstChild);
  }
}











// Nico

















































// Tanika

















































// Ashim
