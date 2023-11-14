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

    // Retrieve the captured image from ESP32-CAM
    const photoResponse = await axios.get('http://<IP-ADDRESS>/saved-photo', { responseType: 'arraybuffer' });

    // Save the image and respond
    fs.writeFileSync('public/photo.jpg', photoResponse.data);
    const results = await client.labelDetection('public/photo.jpg');
    res.send('Photo captured and retrieved');
  } catch (error) {
    res.status(500).send('Error in capturing or retrieving photo');
  }
});

app.get('/objectscan', async (req, res) => {
  try {
    const results = await client.labelDetection('public/photo.jpg');
    const filteredResults = results[0].labelAnnotations.map(label => label.description)
    res.json(filteredResults);
  } catch (error) {
      console.error('ERROR:', error);
      res.status(500).send(error.message);
  }
});

app.get('/emotionscan', async (req, res) => {
  try {
    const results = await client.faceDetection('public/photo.jpg');
    const filteredResults = results[0].faceAnnotations.map(face => {
          return {
              joyLikelihood: face.joyLikelihood,
              sorrowLikelihood: face.sorrowLikelihood,
              angerLikelihood: face.angerLikelihood,
              surpriseLikelihood: face.surpriseLikelihood,
              underExposedLikelihood: face.underExposedLikelihood,
              blurredLikelihood: face.blurredLikelihood,
              headwearLikelihood: face.headwearLikelihood
          };
      })
    res.json(filteredResults);
  } catch (error) {
      console.error('ERROR:', error);
      res.status(500).send(error.message);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
