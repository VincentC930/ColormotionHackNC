# Colormotion
## Chrome Extension
1. Clone or download the chrome extension folder
2. Navigate to the manage extensions tab in chrome
3. Turn on developer mode
4. Select load unpacked and drag in the Colormotion chrome extension
5. Turn on Colormotion and select any video of your choosing on Youtube

## Mobile Application
```
expo start --dev-client
```
- Scan the QR code with your Android or IOS device
## Making API Calls
In order to make API calls, the Bearer token will need to be replaced, the provided bearer token in the apicall.js file as well as in the script.js file will not be functional for security reasons
```
headers: {
     Authorization: "Bearer XYZ",
     'Content-Type': 'application/json',
},
method: "POST",
body: JSON.stringify(data),
 ```
