var cityName = "";
var lat = "";
var lon = "";

var sumbittedCity = document.getElementById("submitCity");
var cities = [];
var searchHistory = document.getElementById("searchHistory");
var cityDateWeather = document.getElementById("cityDateWeather");
var currentDate = dayjs().format("MM/DD/YYYY");
var datePlusOne = dayjs().add(1, "day").format("MM/DD/YYYY");
var datePlusTwo = dayjs().add(2, "day").format("MM/DD/YYYY");
var datePlusThree = dayjs().add(3, "day").format("MM/DD/YYYY");
var datePlusFour = dayjs().add(4, "day").format("MM/DD/YYYY");
var datePlusFive = dayjs().add(5, "day").format("MM/DD/YYYY");
var todayTemp = document.getElementById("todayTemp");
var todayWind = document.getElementById("todayWind");
var todayHumidity = document.getElementById("todayHumidity");
var fiveDayEl = document.getElementById("fiveDay");
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

function cityToGeo(geoCall) {
    var geoCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=fec5efe77b667f6d2583b855e054f8db";
    fetch(geoCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat.toString();
            lon = data[0].lon.toString();
            geoToData();
        });
}

function geoToData(dataCall) {
    var dataCall = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=fec5efe77b667f6d2583b855e054f8db";
    fetch(dataCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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
            console.log(fiveDayForecast);
        });
}

sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    cityName = document.getElementById("cityName").value;
    cities.push(cityName);
    console.log(cities);
    localStorage.setItem("City Name: ", cities);
    var cityButton = document.createElement("button");
    cityButton.textContent = cityName;
    cityButton.setAttribute("class", "btn btn-info mt-3");
    cityButton.setAttribute("id", "submitCity");
    searchHistory.appendChild(cityButton);
    cityToGeo();
});
