// Aaron


// Initialize modals
document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
});
















































// Nico

var search = "";
var LISTEN_API_KEY = "b2b9201c69ef4a26a47ebc014f1a1ebc";
document.querySelector("#searchBox").addEventListener('submit', function(e) {
  e.preventDefault();
  // grab search term
  search = e.target.searchTerm.value;
  $(".carousel").hide();
  fetch(`https://listen-api.listennotes.com/api/v2/search?q=${search}&type=podcast`, {
    headers: { "X-ListenAPI-Key": LISTEN_API_KEY }
  })
  .then(res => res.json())
  .then(data => {
    var results = data.results;
    console.log(data);
    var card = "";
    document.querySelector(".collapsible").classList.remove('hide-on-load');
    results.forEach(pod => {
      var id = pod.id;
      var title = pod.title_original;
      var img = pod.thumbnail;
      var description = pod.description_highlighted;
      var link = pod.listennotes_url;



    card += `<div class="col s6 m3 animated fadeIn">
      <div class="card hoverable">
        <div class="card-image">
          <img src=${img} class="pod-image">
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
document.querySelector("#searchBox").addEventListener("submit", function(e) {
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
