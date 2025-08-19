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
