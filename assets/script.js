var cityName = "";
var lat = "";
var lon = "";

var sumbittedCity = document.getElementById("submitCity");
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
            cityDateWeather.textContent = cityName + " (" + currentDate + ")";
            todayTemp.textContent = "Temp: " + data.current.temp;
            todayWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
            todayHumidity.textContent = "Humidity: " + data.current.humidity + "%";
            for (i = 0; i < fiveDayForecast.length; i++) {
                fiveDayForecast[i].temp = data.daily[(i + 1)].temp.max;
                fiveDayForecast[i].wind = data.daily[(i + 1)].wind_speed;
                fiveDayForecast[i].humidity = data.daily[(i + 1)].humidity;
                var cardDiv = document.createElement("div");
                var cardBody = document.createElement("div");
                var h5El = document.createElement("h5");
                cardDiv.classList.add("card");
                cardBody.classList.add("card-body");
                h5El.classList.add("card-title");
                h5El.textContent = fiveDayForecast[i].date;
                cardDiv.setAttribute("style", "width: 11rem");
                fiveDayEl.appendChild(cardDiv);
                cardDiv.appendChild(cardBody);
                cardBody.appendChild(h5El);
            }
            console.log(fiveDayForecast);
        });
}

sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    cityName = document.getElementById("cityName").value;
    cityToGeo();
});
