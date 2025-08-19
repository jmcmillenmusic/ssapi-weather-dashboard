// Requires Express, DayJS, OpenWeatherAPI, and Dotenv node packages
const express = require('express');
const dayjs = require('dayjs');
const { OpenWeatherAPI } = require('openweather-api-node');
const dotenv = require('dotenv');

// Allows the retrieval of API key from .env file
dotenv.config();
apiKey = process.env.API_KEY;

// Creates the app
const app = express();

// Establishes port for listening
app.listen(3000, () => 
    console.log('Listening at port 3000!')
);

// Serve all files in the Public folder after listening
app.use(express.static('public'));

// This may no longer be necessary thanks to the Openweather API Node Package.
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

// Object array that stores the date, temperature, wind speed, and humidity for the next 5 days (starting tomorrow)
var fiveDayForecast = [
    datePlusOne,
    datePlusTwo,
    datePlusThree,
    datePlusFour,
    datePlusFive
];

let weather = new OpenWeatherAPI({
    key: apiKey,
    locationName: 'Austin',
    units: 'imperial'
});
weather.getCurrent().then(data => {
    // console.log(`Current temperature in Austin is: ${data.weather.temp.cur}\u00B0F`);
    console.log("🚀 ~ data:", data)
    // City name is not getting passed in just yet.
    console.log(`Austin (${currentDate})`);
    console.log(`Temp: ${Math.floor(data.weather.temp.cur)}\u00B0F`);
    console.log(`Wind: ${Math.floor(data.weather.wind.speed)} MPH`);
    console.log(`Humidity: ${data.weather.humidity}%`);
});
weather.getDailyForecast().then(data => {
    // console.log("🚀 ~ data:", data)
    // console.log(`${fiveDayForecast[0]}`);
    // console.log(`Temp: ${Math.floor(data[0].weather.temp.max)}\u00B0F`);
    // console.log(`Wind: ${Math.floor(data[0].weather.wind.speed)} MPH`);
    // console.log(`Humidity: ${data[0].weather.humidity}%`);
    let forecastTable = [];
    data.forEach((w, d) => {
        let newEntry = {};
        newEntry.day = fiveDayForecast[d];
        newEntry.temp = `Temp: ${Math.floor(w.weather.temp.max)}\u00B0F`;
        newEntry.wind = `Wind: ${Math.floor(w.weather.wind.speed)} MPH`;
        newEntry.humidity = `Humidity: ${w.weather.humidity}%`
        forecastTable.push(newEntry);
    })
    console.table(forecastTable);
});
