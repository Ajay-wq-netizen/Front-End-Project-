🌦** Overview**
This is a JavaScript-based Weather Forecast Application that provides real-time weather updates using an external API. Users can check the weather for their current location or search for cities. The app displays temperature, humidity, wind speed, and extended forecasts in a clean, responsive UI.

**Tech Stack**
Frontend: HTML, Tailwind CSS, JavaScript
API: OpenWeatherMap (or any chosen weather API)
Version Control: Git & GitHub

**Features**
✅ Search Weather by City – Users can enter a city name to get weather data.
✅ Current Location Forecast – Fetches weather details for the user's current location.
✅ Extended 5-Day Forecast – Displays upcoming weather conditions.
✅ Recent Searches – Saves the last searched cities in a dropdown menu.
✅ Responsive Design – Works on desktops, tablets, and mobile devices.
✅ Error Handling – Displays alerts for invalid inputs or API errors.
✅ Weather Icons – Uses icons to visually represent weather conditions.

**Installation & Setup**

1️⃣ **Clone the Repository**
bash
Copy
Edit
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
2️⃣ **Open the Project**
Simply open the index.html file in your browser.

3️⃣ **API Key Configuration**
Sign up at OpenWeatherMap (or another chosen API).
Get an API key and replace YOUR_API_KEY in the JavaScript file:
javascript
Copy
Edit
const API_KEY = "YOUR_API_KEY";

**How to Use**
1️⃣ Enter a city name in the search bar and press enter.
2️⃣ Click on "Use My Location" to get the weather for your current location.
3️⃣ View the current temperature, wind speed, humidity, and weather conditions.
4️⃣ Check the 5-day forecast with date-wise weather details.
5️⃣ Select recently searched cities from the dropdown to fetch their weather quickly.

**Error Handling**
If the API request fails, an error message is shown.
If the user enters an invalid city, a warning appears.
Ensures input validation to prevent empty searches.
