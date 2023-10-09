//Fetching HTML elements
const poster = document.getElementById('poster');
const movieTitle = document.getElementById('movieTitle');
const movieRating = document.getElementById('movieRating');
const heart = document.getElementById('heart');
const director = document.getElementById("director");
const actor = document.getElementById("actor");
const plot = document.getElementById("plot");

//Variables
let flag = false;
let heartFlag = false;
const srcHollowHeart = "/image/hollowHeart.png";
const srcRedHeart = "/image/redHeart.png";
//Collect movie name
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movie = urlParams.get('data');
const url = `https://omdbapi.com/?apikey=5d3d26a8&t=${movie}`;

//Add EventListeners
heart.addEventListener('click', heartClicked);

//Fetch movie
async function fun() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    poster.src = data.Poster;
    movieTitle.innerHTML = data.Title;
    movieRating.innerHTML = data.imdbRating;
    director.innerHTML = data.Director;
    actor.innerHTML = data.Actors;
    plot.innerHTML = data.Plot;
    favouriteOrNot(movieTitle.innerHTML);
}
fun();

//Callback functions

//favouriteOrNot
function favouriteOrNot(movieName) {
    let movieArray = JSON.parse(localStorage.getItem('myArray'));
    if (movieArray != null) {
        if (movieArray.includes(movieName)) {
            heart.src = "/image/redHeart.png";
            heartFlag = true;
        }
        else {
            heart.src = "/image/hollowHeart.png";
            heartFlag = false;
        }
    }
}

//heart clicked
function heartClicked() {
    console.log("Local Storage before clicking:-", localStorage);
    console.log("Heart clicked");
    if (!heartFlag) {
        heart.src = srcRedHeart;
        addElement(movieTitle.innerHTML);
        heartFlag = true;
    }
    else {
        heart.src = srcHollowHeart;
        deleteElement(movieTitle.innerHTML);
        heartFlag = false;
    }
    console.log("Local Storage after clicking:-", localStorage);
}
//Add element to local storage
function addElement(movieName) {
    let movieArray = localStorage.getItem('myArray');
    console.log("Array inside localStorage:-", movieArray);
    if (movieArray == null) {
        let newArray = [];
        newArray.push(movieName);
        console.log("new Array:-", newArray);
        localStorage.setItem('myArray', JSON.stringify(newArray));
    }
    else {
        let newArrays = JSON.parse(movieArray);
        if (!newArrays.includes(movieName)) {
            newArrays.push(movieName);
            localStorage.removeItem('myArray');
            localStorage.setItem('myArray', JSON.stringify(newArrays));
        }
    }
}

//Delete element from local storage
function deleteElement(movieName) {
    let movieIndex = -1;
    let movieArray = JSON.parse(localStorage.getItem('myArray'));
    localStorage.removeItem('myArray');
    for (let i = 0; i < movieArray.length; i++) {
        if (movieArray[i] == movieName) {
            movieIndex = i;
        }
    }
    movieArray.splice(movieIndex, 1);
    localStorage.setItem('myArray', JSON.stringify(movieArray));
}

//serachArea clicked
function searchAreaClicked() {
    if (!flag) {
        parentList.style.display = "none";
        flag = true;
    }
    else {
        parentList.style.display = "block";
        flag = false;
    }
}

// logo clicked
function logoClicked() {
    window.location.href = "index.html";
}

//favourites clicked
function favouritesClicked() {
    window.location.href = "favourites.html";
}