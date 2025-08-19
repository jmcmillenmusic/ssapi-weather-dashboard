// Requires Express and DayJS node package
const express = require('express');
const dayjs = require('dayjs');

// Creates the app
const app = express();

// Establishes port for listening
app.listen(3000, () => 
    console.log('Listening at port 3000!')
);

// Serve all files in the Public folder after listening
app.use(express.static('public'));

app.post('/api', (request, response) => {
    console.log('Here is where the request goes.');
});

// Initial critical variables to be used throughout the script
var cityName = '';
var lat = '';
var lon = '';

// Array that stores all cities searched by the user
var cities = [];

// Initialize DayJS and get the dates for today and the next 5 days
const now = dayjs();
const currentDate = now.format('MM/DD/YYYY');
const datePlusOne = now.add(1, 'day').format('MM/DD/YYYY');
const datePlusTwo = now.add(2, 'day').format('MM/DD/YYYY');
const datePlusThree = now.add(3, 'day').format('MM/DD/YYYY');
const datePlusFour = now.add(4, 'day').format('MM/DD/YYYY');
const datePlusFive = now.add(5, 'day').format('MM/DD/YYYY');
console.log("🚀 ~ currentDate:", currentDate)
console.log("🚀 ~ datePlusOne:", datePlusOne)
console.log("🚀 ~ datePlusTwo:", datePlusTwo)
console.log("🚀 ~ datePlusThree:", datePlusThree)
console.log("🚀 ~ datePlusFour:", datePlusFour)
console.log("🚀 ~ datePlusFive:", datePlusFive)

// Object array that stores the date, temperature, wind speed, and humidity for the next 5 days (starting tomorrow)
var fiveDayForecast = [
    {
        date: datePlusOne,
        temp: '',
        wind: '',
        humidity: ''
    },
    {
        date: datePlusTwo,
        temp: '',
        wind: '',
        humidity: ''
    },
    {
        date: datePlusThree,
        temp: '',
        wind: '',
        humidity: ''
    },
    {
        date: datePlusFour,
        temp: '',
        wind: '',
        humidity: ''
    },
    {
        date: datePlusFive,
        temp: '',
        wind: '',
        humidity: ''
    },
];
console.log("🚀 ~ fiveDayForecast:", fiveDayForecast)

// function cityToGeo(geoCall) {
//     var geoCall = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=fec5efe77b667f6d2583b855e054f8db`;
//     fetch(geoCall)
//         .then(function (response) {
//             console.log("🚀 ~ cityToGeo ~ response:", response)
//             return response.json();
//         })
//         .then(function (data) {
//             console.log("🚀 ~ cityToGeo ~ data:", data)
//             lat = data[0].lat.toString();
//             console.log("🚀 ~ cityToGeo ~ lat:", lat)
//             lon = data[0].lon.toString();
//             console.log("🚀 ~ cityToGeo ~ lon:", lon)
//             geoToData();
//         });
// }
// cityToGeo();
