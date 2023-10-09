//fetch variables
const title=document.getElementById('title');
const listParent=document.getElementById('listParent');

//variables
const url="https://www.omdbapi.com/?apikey=5d3d26a8&t=";

//When page is loaded------------------start
function dynamicTitle(){
    console.log(localStorage.myArray.length);
    if(localStorage.myArray.length==0){
        title.innerHTML="Add some favourites";
    }
}
dynamicTitle();
//No favourites added yet
if(localStorage.myArray.length==0){
    const li=document.createElement('li');
    const img=document.createElement('img');
    img.src="imageNotFound.png";
    li.appendChild(img);
    listParent.appendChild(li);
}
else{
    let movieArray=JSON.parse(localStorage.getItem('myArray'));
    for(let i=0; i<movieArray.length; i++){
        console.log(movieArray[i]);
        createListElement(movieArray[i]);
    }
}
//--------------------------------------end


//Event listeners

//Functions
async function createListElement(movieName){

    const response=await fetch(url+`${movieName}`);
    const data=await response.json();
    console.log(data);
    const movieTitle=data.Title;
    const moviePoster=data.Poster;
    const movieRating=data.imdbRating;
    const movieYear=data.Year;

    // movieTitle.classList.add("moviesNamed");

    // create text node and image
    const titleNode=document.createTextNode(movieTitle);
    const posterElement=document.createElement('img');
    if(moviePoster=="N/A"){
        posterElement.src="imageNotFound.png";
    }
    else{
        posterElement.src=moviePoster;
    }
    const ratingNode=document.createTextNode(`Rating: ${movieRating}/10.0`);
    const yearNode=document.createTextNode(`Year: ${movieYear}`);


    // textWrapper for text
    const textWrapperTitle=document.createElement("div");
    const textWrapperRating=document.createElement("div");
    const textWrapperYear=document.createElement("div");

    //Append child
    textWrapperTitle.appendChild(titleNode);
    textWrapperRating.appendChild(yearNode);
    textWrapperYear.appendChild(ratingNode);

    //Add class list
    posterElement.classList.add("moviePoster");
    textWrapperTitle.classList.add("movieTitle");
    textWrapperRating.classList.add("movieRating");
    textWrapperYear.classList.add("movieYear");

    // create list element
    const li=document.createElement('li');

    //Append child to list element
    li.appendChild(posterElement);
    li.appendChild(textWrapperTitle);
    li.appendChild(textWrapperRating);
    li.appendChild(textWrapperYear);

    li.classList.add("childList");
    li.setAttribute('id', 'listChild');

    li.addEventListener('click', function(){
        listClicked(movieTitle);
    });

    //Append list element to parentList
    listParent.appendChild(li);
}

//Callback functions
function logoClicked(){
    window.location.href="index.html";
}

function listClicked(movieTitle){
    window.location.href= `movies.html?data=${encodeURIComponent(movieTitle)}`;
}
