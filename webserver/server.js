const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3000;

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'credentials.json'
});


app.use(express.static('public'));
app.use(express.raw({type: 'image/jpeg', limit: '10mb'}));

app.get('/capture', async (req, res) => {
  try {
    // Send capture command to ESP32-CAM
    await axios.get('http://172.20.10.4/saved-photo');

    // Retrieve the captured image from ESP32-CAM
    const photoResponse = await axios.get('http://172.20.10.4/saved-photo', { responseType: 'arraybuffer' });

    // Save the image and respond
    fs.writeFileSync('public/photo.jpg', photoResponse.data);
    const results = await client.labelDetection('public/photo.jpg');
    res.send('Photo captured and retrieved');
  } catch (error) {
    res.status(500).send('Error in capturing or retrieving photo');
  }
});

app.get('/analyze-photo', async (req, res) => {
  try {
    const results1 = await client.labelDetection('public/photo.jpg');
    const results2 = await client.faceDetection('public/photo.jpg');
    const combinedResults = {
        labels: results1[0].labelAnnotations,
        faces: results2[0].faceAnnotations
    };
    res.json(combinedResults);
  } catch (error) {
      console.error('ERROR:', error);
      res.status(500).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
