const elMenu = selectElem('.films__card-menu');
const elForm = selectElem('.form');
// const elSelect = selectElem('.films__select', elForm);
const elSearch = selectElem('.films__search', elForm);
// const elFilter = selectElem('.films__filter', elForm);
const elTemplate = selectElem('#template').content;

const key = '2117e134';
let searchFilm = ''

elForm.addEventListener('submit', ()=>{
    let inputValue =  elSearch.value.trim();
    searchFilm = inputValue;
    elSearch.value = '';
    fetchMovies()
})

let pageCount = 1;

function renderMovies(moviesArr, element){
    element.innerHTML = null
    
    moviesArr.forEach((movie) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        let moviePoster = selectElem('.films__img', cloneTemplate).src = movie.Poster;
        moviePoster.onerror = (e) => {
            e.target.src = 'https://via.placeholder.com/150'
        }
        selectElem('.films__card-title', cloneTemplate).textContent = movie.Title;
        selectElem('.films__release-date', cloneTemplate).textContent = movie.Year;
        
        element.appendChild(cloneTemplate);
    })
}
let movieArr = [];
let totalResults;
async function fetchMovies(){
    elMenu.innerHTML = '<img src="./img/spinner.svg" alt="spinner"/>'
    let response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchFilm}&page=${pageCount}&type`);
    movieArr = await response.json();
    totalResults = movieArr.totalResults
    console.log(movieArr.Search)
    renderMovies(movieArr.Search, elMenu);
}
fetchMovies()

function pagePrev(pageCount, element){
    if(pageCount <= 1){
        element.disabled = true;
    }else{
        element.disabled = false;
    }
}
pagePrev(pageCount, prev);

function pageNext(pageCount, element){
    if(pageCount >= totalResults/10){
        element.disabled = true;
    }else{
        element.disabled = false;
    }
    console.log(totalResults)
}
pageNext(pageCount, next);


next.addEventListener('click', ()=>{
    pageCount++
    fetchMovies();
    pagePrev(pageCount, prev);
    pageNext(pageCount, next);
})
prev.addEventListener('click', ()=>{
    pageCount--
    fetchMovies();
    pagePrev(pageCount, prev);
    pageNext(pageCount, next);
})