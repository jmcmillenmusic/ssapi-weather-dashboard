// Requires Express
const express = require('express');

// Creates the app
const app = express();

// Establishes the port for serving information
app.listen(3000, () => console.log('Listening at 3000'));

// Use the public folder
app.use(express.static('public'));

app.post('/api', (request, response) => {
    console.log("🚀 ~ request:", request)
});