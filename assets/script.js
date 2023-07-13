var cityName = "";
var lat = "";
var lon = "";

var sumbittedCity = document.getElementById("submitCity");
var h2El = document.createElement("h2")
var localWeatherArea = document.getElementById("localWeather");
var currentDate = dayjs().format("MM/DD/YYYY");

function cityToGeo(geoCall) {
    var geoCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=fec5efe77b667f6d2583b855e054f8db";
    fetch(geoCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat.toString();
            // console.log(lat);
            lon = data[0].lon.toString();
            // console.log(lon);
            geoToData();
        });
}

function geoToData(dataCall) {
    var dataCall = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=fec5efe77b667f6d2583b855e054f8db";
    fetch(dataCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            h2El.textContent = cityName + " (" + currentDate + ")";
            localWeatherArea.appendChild(h2El);
        });
}

sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    cityName = document.getElementById("cityName").value;
    cityToGeo();
});
