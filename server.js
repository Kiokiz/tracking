const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Variables to store GPS data
let gpsData = { latitude: null, longitude: null };

// Endpoint to receive GPS data
app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude && longitude) {
    gpsData = { latitude, longitude };
    console.log('Location updated:', gpsData);
    res.status(200).send('Location updated');
  } else {
    res.status(400).send('Invalid data');
  }
});

// Endpoint to serve GPS data
app.get('/location', (req, res) => {
  res.json(gpsData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
