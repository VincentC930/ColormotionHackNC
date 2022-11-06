# Colormotion
<img src="https://user-images.githubusercontent.com/74493352/200152323-3a74faf5-ea31-41c0-a1aa-df829d39d39f.png" alt="colormotion" width="200"/>

## Chrome Extension
<img width="200" alt="Screen Shot 2022-11-05 at 11 25 31 PM" src="https://user-images.githubusercontent.com/74493352/200152696-ad70a016-02d3-4542-a9f3-8584848ff90b.png">

1. Clone or download the chrome extension folder
2. Navigate to the manage extensions tab in chrome
3. Turn on developer mode
4. Select load unpacked and drag in the Colormotion chrome extension
5. Turn on Colormotion and select any video of your choosing on Youtube

## Mobile Application
<img src="https://user-images.githubusercontent.com/74493352/200152371-383f6edb-541c-4e11-b1eb-57f645bc0b5d.png" alt="appimg" width="200"/>

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
