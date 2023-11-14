# aisecuritycamera
An AI-powered security camera that analyzes footage using ESP32-CAM, Nodejs, and the Google Vision AI API. 

This is a web app that does AI photo analysis with footage recorded by an ESP32-CAM locally. The web app can request the ESP-32 CAM connected to the device to take photos and send them back to the app. Once received, a user can then use Google's Vision AI API to scan the footage for object recognition and emotion recognition. 

Requirements:
NodeJS, ESP32-CAM, Arduino IDE, Google Vision AI API

Setup:
Hardware
1. Connect ESP32-CAM to device and open Arduino IDE
2. Configure the IDE to use the AI Thinker ESP32-CAM board and the port that work for you.
3. Compile and upload camera.ino to the device (Fill in the SSID and password of the network you wish to connect to)
4. Open the serial Monitor to check the IP address of the ESP32-CAM (Copy this for the server code)

Server
1. Copy and instantiate server
- git clone https://github.com/ronantakizawa/aisecuritycamera.git
- cd aisecuritycamera
- npm install
2. Fill the IP address of the ESP32-CAM in server.js
3. Log into your Google Cloud account, and get a credentials.json file for your service account to allow API access
4. Start Server (Will open on localhost:3000)
- npm run server

App
1. Click Capture Photo to take a photo (Will take around 5-30 seconds).
2. Click Object / Emotion scan to run a scan of the photo using the Vision AI API






<img width="1110" alt="Screenshot 2023-11-14 at 14 41 53" src="https://github.com/ronantakizawa/aisecuritycamera/assets/71115970/19cdc36a-12d6-4d45-8842-0594f0b82573">

