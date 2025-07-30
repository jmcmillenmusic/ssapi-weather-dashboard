// Initial critical variables to be used throughout the script
var cityName = "";
var lat = "";
var lon = "";

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
var sumbittedCity = document.getElementById("submitCity");
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

// This function makes a call to the OpenWeatherMap GeoCoding API while passing in the user-submitted city and returns the latitude and longitude of said city. Then, it calls the next function.
function cityToGeo(geoCall) {
    var geoCall = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=fec5efe77b667f6d2583b855e054f8db";
    // console.log("🚀 ~ cityToGeo ~ cityName:", cityName);
    fetch(geoCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat.toString();
            lon = data[0].lon.toString();
            geoToData();
        });
}

// This function makes a call to the OpenWeatherMap OneCall API while passing in the latitude and longitude of the user-submitted city and returns the date, current weather conditions, temperature in Fahrenheit, wind speed in miles per hour, and humidity. This process is repeated for each of the next 5 days as well (starting tomorrow), dynamically creating cards to store and display this information. The input field is then cleared and replaced with placeholder text ("Austin").
function geoToData(dataCall) {
    var dataCall = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=fec5efe77b667f6d2583b855e054f8db";
    fetch(dataCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
            cityDateWeather.textContent = cityName + " (" + currentDate + ")";
            cityDateWeather.appendChild(weatherIcon);
            todayTemp.textContent = "Temp: " + Math.floor(data.current.temp) + "\xB0F";
            todayWind.textContent = "Wind: " + Math.floor(data.current.wind_speed) + " MPH";
            todayHumidity.textContent = "Humidity: " + data.current.humidity + "%";
            if (fiveDayEl.children.length > 0) {
                fiveDayEl.replaceChildren();
            }
            for (i = 0; i < fiveDayForecast.length; i++) {
                fiveDayForecast[i].temp = data.daily[(i + 1)].temp.max;
                fiveDayForecast[i].wind = data.daily[(i + 1)].wind_speed;
                fiveDayForecast[i].humidity = data.daily[(i + 1)].humidity;
                var cardDiv = document.createElement("div");
                var cardBody = document.createElement("div");
                var h5El = document.createElement("h5");
                var p1El = document.createElement("p");
                var p2El = document.createElement("p");
                var p3El = document.createElement("p");
                var futureIcon = document.createElement("img");
                cardDiv.classList.add("card", "bg-info");
                cardBody.classList.add("card-body");
                h5El.classList.add("card-title");
                h5El.textContent = fiveDayForecast[i].date;
                futureIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[(i + 1)].weather[0].icon + ".png");
                p1El.textContent = "Temp: " + Math.floor(fiveDayForecast[i].temp) + "\xB0F";
                p2El.textContent = "Wind: " + Math.floor(fiveDayForecast[i].wind) + " MPH";
                p3El.textContent = "Humidity: " + fiveDayForecast[i].humidity + "%";
                cardDiv.setAttribute("style", "width: 11rem");
                fiveDayEl.appendChild(cardDiv);
                cardDiv.appendChild(cardBody);
                cardBody.appendChild(h5El);
                cardBody.appendChild(p1El);
                cardBody.appendChild(p2El);
                cardBody.appendChild(p3El);
                h5El.appendChild(futureIcon);
            }
            document.getElementById("cityName").value = "";
        });
}

// This button listens for the user-submitted city, stores the city name in localStorage, creates a button with that city's name on it, places it below the Search button, and initializes the first OpenWeatherMap API call.
sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    var cities = JSON.parse(localStorage.getItem("allCities")) || [];
    cityName = document.getElementById("cityName").value;
    cities.push(cityName);
    localStorage.setItem("allCities", JSON.stringify(cities));
    var newCityButton = document.createElement("button");
    newCityButton.textContent = cityName;
    newCityButton.setAttribute("class", "btn btn-info mt-3");
    newCityButton.setAttribute("id", cityName);
    searchHistory.appendChild(newCityButton);
    // console.log(cityName);
    // console.log(cities);
    cityToGeo();
});

// This button listens for the name of the city written on it, passes that value into the cityName variable, and initializes the first OpenWeatherMap API call.
// This section is currently not working as intended.
searchHistory.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "BUTTON") {
        event.preventDefault();
        // document.getElementById('cityName').value = event.target.id;
        // var cityName = event.target.id;
        // console.log("🚀 ~ cityName:", cityName);
        // var oldCityName = document.querySelector('.form-control');
        // oldCityName = cityName;
        // console.log("🚀 ~ oldCityName:", oldCityName);
        // var cities = JSON.parse(localStorage.getItem("allCities"));
        // console.log("🚀 ~ cities:", cities);
        // navigator.clipboard.writeText(cityName);
        // var oldCityName = navigator.clipboard.readText();
        // console.log("🚀 ~ oldCityName:", oldCityName);
        // var oldForm = document.getElementsByClassName('form-control');
        // if (oldForm) {
        //     oldForm.innerText = oldCityName;
        // } else {
        //     console.error('Cannot find element:', oldForm);
        // }
        // cityToGeo();
    }
});