// GRAB MAIN ELEMENTS FROM THE DOM AND ASSIGN TO A VARIABLE
let formEl = document.querySelector("#search-form");
let cityInputEl = document.querySelector("#city-input")
let buttonEl = document.querySelector("#submit");
let searchHistoryEl = document.querySelector("#search-history");
let currentWeatherEl = document.querySelector("#current-weather-result");
let futureWeatherEl = document.querySelector("#future-weather-result");


// FUNCTION TO HANDLE SEARCH QUERY PARAMETERS


// FUNCTION TO PRINT THE RESULTS TO THE PAGE


// FUNCTION TO SEARCH THE API WITH FETCH

function seachApi(query, format) {
let openWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=289d20f1ae5e1a64488055403d91c79b'

//format will probably become latitude and longitude
if (format) {
    openWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=289d20f1ae5e1a64488055403d91c79b'
}

// More to the function TO BE ADDED...
}


// FUNCTION TO HANDLE SEARCH FORM SUBMIT
// location.assign(queryString)???
function handleSearchFormSubmit(event) {
    event.preventDefault();

    let cityInputVal = searchInputEl.value;

    if (!cityInputVal) {
        console.log('You need a city input to search.');
        return;
    }

    const queryString = ''
}


// SUBMIT BUTTON EVENT LISTENER
buttonEl.addEventListener('submit', handleSearchFormSubmit);


// CALL THE QUERY PARAMETER FUNCTION (Might only be needed when two HTML pages)