// API
var LISTEN_API_KEY = "b2b9201c69ef4a26a47ebc014f1a1ebc";

// Global
var resultDiv = document.querySelector("#payload");

// Modals
document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
});

// Carousel
document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems);
});

// Dropdown
document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelector(".dropdown-trigger");
  var instance = M.Dropdown.init(elems, {
    autoTrigger: false,
    constrainWidth: false,
    coverTrigger: false
  });
  instance.recalculateDimensions();
});

// Get data for dropdown
document.addEventListener("DOMContentLoaded", () => {
  const selectionArr = fetch(
    "https://listen-api.listennotes.com/api/v2/curated_podcasts",
    {
      headers: { "X-ListenAPI-Key": LISTEN_API_KEY }
    }
  )
    .then(res => res.json())
    .then(data => {
      var results = data.curated_lists;
      resultArr = [];
      results.forEach(list => {
        resultArr.push({
          id: list.id,
          title: list.title
        });
      });
      return resultArr;
    })
    .then(results => {
      // Populate dropdown

      var dropdown = document.querySelector("#dropdown1");
      results.forEach(item => {
        var el = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("data-id", item.id);
        link.appendChild(document.createTextNode(item.title));
        el.value = item.id;
        el.appendChild(link);
        el.addEventListener("click", handleClick);
        dropdown.append(el);
      });
    });
});

// Display Trending
function handleClick(e) {
  // check if resultDiv already has been populated
  if (resultDiv.firstChild) {
    clearOutByID("payload");
    document.querySelector("#title").textContent = "";
  }
  // grab curated list
  const selection = e.target.dataset.id;
  fetch(
    `https://listen-api.listennotes.com/api/v2/curated_podcasts/${selection}`,
    {
      headers: { "X-ListenAPI-Key": LISTEN_API_KEY }
    }
  )
    .then(res => res.json())
    .then(data => {
      var results = data.podcasts;
      console.log(results);
      var title = document.querySelector("#title");
      title.appendChild(document.createTextNode(data.title));
      title.className = "center"
      var resultDiv = document.querySelector("#payload");
      var carousel = document.createElement("div");
      carousel.className = "carousel";
      results.forEach(podcast => {
        var img = document.createElement("img");
        var link = document.createElement("a");
        img.src = podcast.image;
        link.href = podcast.website;
        link.className = "carousel-item";
        link.setAttribute("target", "_blank");
        link.appendChild(img);
        carousel.appendChild(link);
      });
      resultDiv.appendChild(carousel);
      var elems = document.querySelectorAll(".carousel");
      M.Carousel.init(elems, {
        numVisible: results.length,
        padding: 10
      });
    });
}

// utility function to clear target out of all children
function clearOutByID(target) {
  // set targetDiv to selector
  const targetDiv = document.querySelector(`#${target}`);
  // initiate loop to remove children nodes while children nodes exist
  while (targetDiv.firstChild) {
    targetDiv.removeChild(targetDiv.firstChild);
  }
}
