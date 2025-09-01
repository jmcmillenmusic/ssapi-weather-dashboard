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

// Enables the parsing of form data (i.e. a user-submitted city)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET request for sending the weather data to script.js
app.get('/api', (request, response) => {
    response.json({
        weatherDataEntry: weatherDataEntry
    })
});

// Makes a POST request to the API to get weather data for the user-submitted city
app.post('/api', (request, response) => {
    const cityName = request.body.message;
    console.log(`** City Name: ${cityName} **`);
    const serverResponse = 'City submitted successfully!';
    response.json({ message: serverResponse });

    localForecast.length = 0;
    weatherDataEntry.length = 0;

    let weather = new OpenWeatherAPI({
        key: apiKey,
        locationName: `${cityName}`,
        units: 'imperial'
    });
    weather.getCurrent().then(data => {
        let currentWeather = {
            city: cityName,
            date: currentDate,
            iconUrl: data.weather.icon.url,
            temp: `${Math.floor(data.weather.temp.cur)}\u00B0F`,
            wind: `${Math.floor(data.weather.wind.speed)} MPH`,
            humidity: `${data.weather.humidity}%`,
        }
        weatherDataEntry.push(currentWeather);
    });
    weather.getDailyForecast().then(data => {
        data.forEach((w, d) => {
            if (d < 5) {
                let newEntry = {};
                newEntry.day = fiveDayForecast[d];
                newEntry.temp = `Temp: ${Math.floor(w.weather.temp.max)}\u00B0F`;
                newEntry.wind = `Wind: ${Math.floor(w.weather.wind.speed)} MPH`;
                newEntry.humidity = `Humidity: ${w.weather.humidity}%`
                newEntry.iconUrl = w.weather.icon.url;
                localForecast.push(newEntry);
            }
        })
        weatherDataEntry.push(localForecast);
        allWeatherData.push(weatherDataEntry);
    });
});

let localForecast = [];
let weatherDataEntry = [];
let allWeatherData = [];

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
