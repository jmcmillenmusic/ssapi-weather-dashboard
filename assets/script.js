// var cityName = "";
var lat = "";
var lon = "";
var geoCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=fec5efe77b667f6d2583b855e054f8db";
var dataCall = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=fec5efe77b667f6d2583b855e054f8db";

// $('#submitCity').on("click", function(event) {
//     event.preventDefault();
//     var cityName = $(this).parent().find(".form-control").val();
//     console.log("City: " + cityName);
// });

var sumbittedCity = document.getElementById("submitCity");

sumbittedCity.addEventListener("click", function(event) {
    event.preventDefault();
    var cityText = document.getElementById("cityName").value;
    // cityText.value = cityName;
    console.log("City: " + cityText);
});