// GRAB MAIN ELEMENTS FROM THE DOM AND ASSIGN TO A VARIABLE
let formEl = document.querySelector("#search-form");
let cityInputEl = document.querySelector("#city-input")
let buttonEl = document.querySelector("#submit");
let searchHistoryEl = document.querySelector("#search-history");
let currentWeatherEl = document.querySelector("#current-weather-result");
let futureWeatherEl = document.querySelector("#future-weather-result");


// FUNCTION TO PRINT THE CURRENT WEATHER RESULTS TO THE PAGE
function renderResults(resultObj) {
    console.log(resultObj);

    // Update the UI dynamically with the retrieved weather data.
    const resultCard = document.createElement('div');
    resultCard.classList.add('card');

    const resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    const icon = resultObj.list[0].weather[0].icon; // DEFINING THE ICON 3 DIGIT CODE TO A VARIBALE

    const resultHeader = document.createElement('h3');
    resultHeader.classList.add('card-header');
    resultHeader.innerHTML = `Todays Weather ${resultObj.city.name} <img src="http://openweathermap.org/img/w/${icon}.png" alt="img"></img>`;

    const dateContentEl = document.createElement('p');
    dateContentEl.innerHTML = `<strong>Date:</strong> ${resultObj.list[0].dt_txt}`;

    const tempContentEl =document.createElement('p');
    tempContentEl.innerHTML = `<strong>Temp:</strong> ${resultObj.list[0].main.temp} F`;

    const humidityContentEl = document.createElement('p');
    humidityContentEl.innerHTML = `<strong>Humidity:</strong> ${resultObj.list[0].main.humidity}%`;

    const windContentEl = document.createElement('p');
    windContentEl.innerHTML = `<strong>Wind:</strong> ${resultObj.list[0].wind.speed}mph<br/>`;

    resultBody.append(resultHeader, dateContentEl, tempContentEl, humidityContentEl, windContentEl);

    // Find existing result card and replace it with the new one
    const existingResultCard = document.querySelector('.card');
    if (existingResultCard) {
        existingResultCard.replaceWith(resultCard);
    } else {
        // If there's no existing result card, just append the new one
        currentWeatherEl.appendChild(resultCard);
    }
}

// FUNCTION TO PRINT THE FUTURE 5 DAY FORECAST RESULTS TO THE PAGE
function printForecast(resultObj) {
    console.log(resultObj);

    // Update the UI dynamically with the retrieved weather forecast data.
    const resultCard = document.createElement('div');
    resultCard.classList.add('cast-card');

    const resultBody = document.createElement('div');
    resultBody.classList.add('cast-card-body');
    resultCard.append(resultBody);

    const icon = resultObj.list[0].weather[0].icon; // DEFINING THE ICON 3 DIGIT CODE TO A VARIBALE

    const resultHeader = document.createElement('h3');
    resultHeader.classList.add('cast-card-header');
    resultHeader.innerHTML = `Tomorrows Weather ${resultObj.city.name} <img src="http://openweathermap.org/img/w/${icon}.png" alt="img"></img>`;

    const dateContentEl = document.createElement('p');
    dateContentEl.innerHTML = `<strong>Date:</strong> ${resultObj.list[8].dt_txt}`;

    const tempContentEl =document.createElement('p');
    tempContentEl.innerHTML = `<strong>Temp:</strong> ${resultObj.list[8].main.temp} F`;

    const humidityContentEl = document.createElement('p');
    humidityContentEl.innerHTML = `<strong>Humidity:</strong> ${resultObj.list[8].main.humidity}%`;

    const windContentEl = document.createElement('p');
    windContentEl.innerHTML = `<strong>Wind:</strong> ${resultObj.list[8].wind.speed}mph<br/>`;

    resultBody.append(resultHeader, dateContentEl, tempContentEl, humidityContentEl, windContentEl);

    // Find existing result card and replace it with the new one
    const existingResultCard = document.querySelector('.cast-card');
    if (existingResultCard) {
        existingResultCard.replaceWith(resultCard);
    } else {
        // If there's no existing result card, just append the new one
        currentWeatherEl.appendChild(resultCard);
    }
}



// FUNCTION TO FETCH WEATHER DATA
function fetchWeatherData(city) {
let openWeatherQueryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=289d20f1ae5e1a64488055403d91c79b`;

fetch(openWeatherQueryURL)
    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })

    .then(function (data) {
        console.log(data); // Returns an array object with cities and lat/long coordinates

        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log(lat);
        console.log(lon);

        // Using latitude and longitude to get forcast data
        let openForecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=289d20f1ae5e1a64488055403d91c79b&units=imperial`

        return fetch(openForecastQueryURL)
    })
            
    .then(function (response) {
        if(!response.ok) {
            throw alert('Error fecthing forecast data:')
        }
        return response.json();
    })

    .then(function (forecastData) {
        console.log(forecastData.list[0].main.temp);

        renderResults(forecastData); // Calls function to display current weather
        printForecast(forecastData); // Calls function to display 5 day forecast weather
        // Save to localStorage
        saveToLocalStorage(city);
        // Update search history display
        displaySearchHistory();
    })

    .catch(function (error) {
        console.log(error);
        alert('Error fetching weather data:', error);
    });

}

// FUNCTION TO SAVE THE SEARCHED CITY TO LOCALSTORAGE
function saveToLocalStorage(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Add the searched city to the search history array
    searchHistory.push(city);

    // CREATED BY CHATGPT: Keep only the last 8 entries in the search history array
    if (searchHistory.length > 8) {
        searchHistory = searchHistory.slice(-8);
    }
    // Save the updated search history array back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// THIS FUNCTION PROVIDED FULLY BY CHATGPT (ON EASTER! --> Heres a hidden EGG!)
// Function to display search history from localStorage
function displaySearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Clear the existing search history displayed on the page
    searchHistoryEl.innerHTML = '';

    // Loop through the search history array and create list items to display each searched city
    searchHistory.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        // Add event listener to each list item to handle click event
        listItem.addEventListener('click', () => {
            // Call fetchWeatherData function with the clicked city
            fetchWeatherData(city);
        });
        // Append the list item to the search history container
        searchHistoryEl.appendChild(listItem);
    });
}

// FUNCTION TO HANDLE SEARCH QUERY PARAMETERS
function getParameters() {

    const city = cityInputEl.value;

    fetchWeatherData(city);
}

// FUNCTION TO HANDLE SEARCH FORM SUBMIT
function handleSearchFormSubmit(event) {
    event.preventDefault();

    let cityInputVal = cityInputEl.value;

    if (!cityInputVal) {
        console.log('You need a city input to search.');
        return;
    }

    getParameters();
}


// SUBMIT BUTTON EVENT LISTENER
formEl.addEventListener('submit', handleSearchFormSubmit);

// Call displaySearchHistory function to initially display search history when the page loads
displaySearchHistory();