// Aaron
<<<<<<< HEAD
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
=======


// Initialize modals
document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
});



































>>>>>>> master













// Nico

var search = "";
var LISTEN_API_KEY = "b2b9201c69ef4a26a47ebc014f1a1ebc";
document.querySelector("#formField").addEventListener('submit', function(e) {
  e.preventDefault();
  // grab search term
  search = e.target.searchTerm.value;
  fetch(`https://listen-api.listennotes.com/api/v2/search?q=${search}&type=podcast`, {
    headers: { "X-ListenAPI-Key": LISTEN_API_KEY }
  })
  .then(res => res.json())
  .then(data => {
    var results = data.results;
    console.log(data);
    var card = "";
    results.forEach(pod => {
      var id = pod.id;
      var title = pod.title_original;
      var img = pod.thumbnail;
      var description = pod.description_highlighted;
      var link = pod.listennotes_url;



    card += `<div class="col s6 m3 animated fadeIn">
      <div class="card hoverable">
        <div class="card-image">
          <img src=${img}>
          <a class="btn-floating halfway-fab waves-effect waves-light red" href=${link} target="_blank"><i class="material-icons">open_in_new</i></a>
        </div>
        <div class="card-content">
          <p class="truncate">${title}</p>
        </div>
      </div>
    </div>`


    });
    document.querySelector("#podcasts").innerHTML=card;

  }).then(() => {
    $("#podcastHeader").text(search.toUpperCase() + " PODCASTS");
    $("#bookHeader").text("Read more...");
  });
});


var search = "";
var GOOGLE_API_KEY = "AIzaSyC3hV3qgbAa2rFepp5y-0U0JAGIQ7_nohw";
document.querySelector("#formField").addEventListener("submit", function(e) {
  e.preventDefault();
  // grab search term
  search = e.target.searchTerm.value;
  e.target.searchTerm.value = "";
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${GOOGLE_API_KEY}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    var results = data.items;
    var card = "";
    results.forEach(book => {
      var title = book.volumeInfo.title;
      var img;
      var link = book.volumeInfo.infoLink;

      if (book.volumeInfo.hasOwnProperty("imageLinks")){
        img = book.volumeInfo.imageLinks.thumbnail;
       } else{
        img ="https://timedotcom.files.wordpress.com/2015/06/521811839-copy.jpg"
      }

      card += `<div class="col s6 m3 animated fadeIn">
      <div class="card hoverable">
        <div class="card-image">
          <img class="book-image" src=${img}>
        </div>
        <div class="card-content">
          <p class="truncate">${title}</p>
        </div>
        <div class="card-action">
        <a href="${link}" target="_blank"><i class="material-icons">add_shopping_cart</i>Buy on Google</a>
      </div>
      </div>
    </div>`

  });
  document.querySelector("#books").innerHTML=card;

  e.target.searchTerm.value = "";
});
});

















































// Tanika

















































// Ashim
