var cityName = "";
var lat = "";
var lon = "";

var sumbittedCity = document.getElementById("submitCity");
var cityDateWeather = document.getElementById("cityDateWeather");
var currentDate = dayjs().format("MM/DD/YYYY");
var todayTemp = document.getElementById("todayTemp");
var todayWind = document.getElementById("todayWind");
var todayHumidity = document.getElementById("todayHumidity");

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
        });
}

sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    cityName = document.getElementById("cityName").value;
    cityToGeo();
});
