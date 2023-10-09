//https://omdbapi.com/?apikey=5d3d26a8&
//Clear the search bar
window.onload = function () {
    searchArea.value = "";
};

//Fetching HTML elements
const searchArea = document.getElementById('search');
const parentList = document.getElementById('parentList');
const childBody = document.getElementById('childBody');
const poster = document.getElementById('poster');
const movieTitle = document.getElementById('movieTitle');
const movieRating = document.getElementById('movieRating');
const totalRating = document.getElementById('movieRating');

//Variables
let flag = false;
let apiUrl = "https://www.omdbapi.com/?page=1&apikey=5d3d26a8&";
let count = 0;
let favouriteMovies = [];
let movieObject = "NOTHING";
let movieFlag = 1;


//Add EventListeners
searchArea.addEventListener('keyup', keyPressed);
childBody.addEventListener('click', childBodyClicked);


//Callback functions
//searchArea key pressed
async function keyPressed() {

    //remove list once the search bar is empty
    if (searchArea.value == "") {
        parentList.style.display = "none";
    }
    else {
        parentList.style.display = "block";
    }
    //Remove the list
    while (parentList.firstChild) {
        parentList.removeChild(parentList.firstChild);
    }

    let movieNam = searchArea.value;
    let url = apiUrl + `s=${movieNam}`;
    let response = await fetch(url);
    movieFlag = "multiple";
    var data = await response.json();

    if (data.Response == 'False') {
        url = apiUrl + `t=${movieNam}`;
        movieFlag = "single";

    }

    // console.log("Movie flag", movieFlag);

    createListElement(movieFlag, url);
}

//create list
function createListElement(movieFlag, url) {
    if (movieFlag == "single") {
        // console.log("Inside if");
        createSingleListElement(url);
    }
    else if (movieFlag == "multiple") {
        // console.log("Inside else if");
        createMultipleListElements(url);
    }
}

//create a list element
async function createListElements(urls) {

    // Fetch movie data from the provided URL
    const response = await fetch(urls);
    const data = await response.json();
    // console.log("createListElements:-", data);

    // Extract movie title and image URL from the fetched data
    const movieTitle = data.Title;
    const imgSrc = data.Poster;
    const movieRating = data.imdbRating;

    // Create an image element to display the movie poster
    const imageElement = document.createElement("img");
    imageElement.src = imgSrc; // Set the image URL
    imageElement.classList.add("movieImg"); // Apply CSS class to the image

    // Create a text node to hold the movie title
    const textNode = document.createTextNode(movieTitle);
    // console.log("textNode:-", textNode);

    //Create a text node to hold the movie rating
    const ratingTextNode = document.createTextNode(movieRating);
    // console.log("ratingTextNode:-", ratingTextNode);

    // Create an image element to display the star image
    const starImageElement = document.createElement("img");
    // starImageElement.classList.add("starImg");
    starImageElement.src = "star.png"; // Set the image URL
    starImageElement.classList.add("starImg"); // Apply CSS class to the image

    // Wrap the movie title text node in a <span> element to apply CSS class
    const textWrapper = document.createElement("span");
    textWrapper.appendChild(textNode);
    textWrapper.classList.add("movieName"); // Apply CSS class to the text wrapper

    // Wrap the movie rating text node in a <span> element to apply CSS class
    const ratingWrapper = document.createElement("span");
    ratingWrapper.appendChild(starImageElement);
    ratingWrapper.appendChild(ratingTextNode);
    ratingWrapper.classList.add("movieRating");

    // Set the alt attribute for the image (for accessibility)
    imageElement.alt = "Image for " + movieTitle;


    // Create a list item element to hold the movie information
    const li = document.createElement("li");

    li.classList.add("listChild");

    if (data.Response == "False") {
        imageElement.src = "imageNotFound.png";
    }

    // Append the wrapped movie title and the movie image to the list item
    li.appendChild(imageElement);
    li.appendChild(textWrapper);
    li.appendChild(ratingWrapper);

    li.addEventListener("click", function () {
        const url = `movies.html?data=${encodeURIComponent(movieTitle)}`;
        window.location.href = url;
    })

    // Append the list item to the parent unordered list
    parentList.appendChild(li);
}

async function createListElementsm(url) {
    const response = await fetch(url);
    const data = await response.json();
    const movieArray = data.Search;
    console.log("Movie Array:-", data.Search);
    for (let i = 0; i < movieArray.length; i++) {
        createOneMovie(movieArray[i]);
    }
}

//Create movie for multiple elements
function createOneMovie(movies) {
    const movieTitle = movies.Title;
    const moviePoster = movies.Poster;

    const imageElement = document.createElement("img");
    if (moviePoster == "N/A") {
        imageElement.src = "imageNotFound.png"; // Set the image URL
    }
    else {
        imageElement.src = moviePoster; // Set the image URL
    }
    imageElement.classList.add("movieImg"); // Apply CSS class to the image

    const textNode = document.createTextNode(movieTitle);
    console.log("Name of the movie is:-", movieTitle);

    const textWrapper = document.createElement("span");
    textWrapper.appendChild(textNode);
    textWrapper.classList.add("movieName");

    const li = document.createElement('li');
    li.classList.add("listChild");

    li.appendChild(textWrapper);
    li.appendChild(imageElement);

    li.addEventListener('click', function () {
        const url = `movies.html?data=${encodeURIComponent(movieTitle)}`;
        window.location.href = url;
    });

    parentList.appendChild(li);
}

//create list for single result
function createSingleListElement(url) {
    createListElements(url);
}

//create list for multiple results
function createMultipleListElements(url) {
    createListElementsm(url);
}


//childBody clicked
function childBodyClicked() {

}

// functions invoked when clicked
function logoClicked() {
    window.location.href = "index.html";
}

function favouritesClicked() {
    window.location.href = "favourites.html";
}

function searchLogoClicked() {
    window.location.href = `movies.html?data=${encodeURIComponent(searchArea.value)}`;
}

