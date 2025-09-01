// Initial critical variables to be used throughout the script
var cityName = "";
// var lat = "";
// var lon = "";

// Array that stores all cities searched by the user
var cities = [];

// Variables to store today's date and the dates of the next 5 days (starting tomorrow)
var currentDate = dayjs().format("MM/DD/YYYY");
var datePlusOne = dayjs().add(1, "day").format("MM/DD/YYYY");
var datePlusTwo = dayjs().add(2, "day").format("MM/DD/YYYY");
var datePlusThree = dayjs().add(3, "day").format("MM/DD/YYYY");
var datePlusFour = dayjs().add(4, "day").format("MM/DD/YYYY");
var datePlusFive = dayjs().add(5, "day").format("MM/DD/YYYY");

// Object array that stores the date, temperature, wind speed, and humidity for the next 5 days (starting tomorrow)
var fiveDayForecast = [
    {
        date: datePlusOne,
        temp: "",
        wind: "",
        humidity: ""
    },
    {
        date: datePlusTwo,
        temp: "",
        wind: "",
        humidity: ""
    },
    {
        date: datePlusThree,
        temp: "",
        wind: "",
        humidity: ""
    },
    {
        date: datePlusFour,
        temp: "",
        wind: "",
        humidity: ""
    },
    {
        date: datePlusFive,
        temp: "",
        wind: "",
        humidity: ""
    },
];

// Variables that reference HTML elements by their IDs to be used in later functions
var submittedCity = document.getElementById("submitCity");
var searchHistory = document.getElementById("searchHistory");
var cityDateWeather = document.getElementById("cityDateWeather");
var todayTemp = document.getElementById("todayTemp");
var todayWind = document.getElementById("todayWind");
var todayHumidity = document.getElementById("todayHumidity");
var fiveDayEl = document.getElementById("fiveDay");

// Clears localStorage when the page gets refreshed
window.onbeforeunload = () => {
    localStorage.clear();
};

// This button copies the name of the city written on it, pastes it into the input field, and initializes the first OpenWeatherMap API call.
// searchHistory.addEventListener("click", function(event) {
//     if (event.target && event.target.nodeName == "BUTTON") {
//         event.preventDefault();
//         var oldCityName = event.target.id;
//         navigator.clipboard.writeText(oldCityName)
//             .then(() => {
//                 navigator.clipboard.readText();
//             })
//             .finally(() => {
//                 document.getElementById('cityName').focus();
//                 document.getElementById('cityName').value = oldCityName;
//                 document.getElementById('submitCity').focus();
//                 document.getElementById('submitCity').click();
//             })
//             .catch(error => {
//                 console.error('Failed: ', error);
//             })
//     }
// });

// Runs the GET request and displays the weather data for the user-submitted city
function geoToData() {
    fetch('/api')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Display the city name and today's date
            cityDateWeather.textContent = `${data.weatherDataEntry[0].city} (${data.weatherDataEntry[0].date})`
            
            // Create a weather icon image for current conditions
            var weatherIcon = document.createElement('img');
            weatherIcon.setAttribute('src', data.weatherDataEntry[0].iconUrl);
            cityDateWeather.appendChild(weatherIcon);

            // Display the city's temperature, wind speed, and humidity
            todayTemp.textContent = `Temp: ${data.weatherDataEntry[0].temp}`
            todayWind.textContent = `Wind: ${data.weatherDataEntry[0].wind}`
            todayHumidity.textContent = `Humidity: ${data.weatherDataEntry[0].humidity}`

            // Resets 5-day forecast content for every city after the first
            if (fiveDayEl.children.length > 0) {
                fiveDayEl.replaceChildren();
            }

            for (let i = 0; i < fiveDayForecast.length; i++) {
                // Set the temperature, wind, and humidity for the 5-day forecast
                fiveDayForecast[i].temp = data.weatherDataEntry[1][i].temp;
                fiveDayForecast[i].wind = data.weatherDataEntry[1][i].wind;
                fiveDayForecast[i].humidity = data.weatherDataEntry[1][i].humidity;

                // Create card elements for the 5-day forecast
                var cardDiv = document.createElement("div");
                var cardBody = document.createElement("div");
                var h5El = document.createElement("h5");
                var p1El = document.createElement("p");
                var p2El = document.createElement("p");
                var p3El = document.createElement("p");
                var futureIcon = document.createElement("img");

                // Adds CSS classes to card elements
                cardDiv.classList.add("card", "bg-info");
                cardBody.classList.add("card-body");
                h5El.classList.add("card-title");

                // Displays 5-day forecast data
                h5El.textContent = data.weatherDataEntry[1][i].day;
                futureIcon.setAttribute('src', data.weatherDataEntry[1][i].iconUrl);
                p1El.textContent = data.weatherDataEntry[1][i].temp;
                p2El.textContent = data.weatherDataEntry[1][i].wind;
                p3El.textContent = data.weatherDataEntry[1][i].humidity;

                // Sets card style and attaches all elements
                cardDiv.setAttribute("style", "width: 11rem");
                fiveDayEl.appendChild(cardDiv);
                cardDiv.appendChild(cardBody);
                cardBody.appendChild(h5El);
                cardBody.appendChild(p1El);
                cardBody.appendChild(p2El);
                cardBody.appendChild(p3El);
                h5El.appendChild(futureIcon);
            }
            // Clears the input field
            document.getElementById("cityName").value = "";
        })
}

// Function for delaying the GET request to ensure that it has the data
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* 
    - Stores the city name in localStorage
    - Creates a button with that city's name
    - Adds the button and city name to search history
    - Sends the user-submitted city as a stringified message in JSON to /api
*/
submittedCity.addEventListener("click", async function(event) {
    event.preventDefault();
    var cities = JSON.parse(localStorage.getItem("allCities")) || [];
    var data = document.getElementById("cityName").value;
    cities.push(data);
    localStorage.setItem("allCities", JSON.stringify(cities));
    var newCityButton = document.createElement('button');
    newCityButton.textContent = data;
    newCityButton.setAttribute('class', 'btn btn-info mt-3');
    newCityButton.setAttribute('id', data);
    searchHistory.appendChild(newCityButton);
    // API call
    try {
        // POST request
        const postResponse = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: data })
        })
        const result = await postResponse.json();

        // GET request
        await delay(1000);
        const getResponse = await fetch("/api");
        // console.log("🚀 ~ getResponse:", getResponse);
        const returnedData = await getResponse.json();
        console.log("🚀 ~ returnedData:", returnedData);
        geoToData();
    } catch (error) {
        console.error(`Error submitting form: ${error}`);
    }
});
