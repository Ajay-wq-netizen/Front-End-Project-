const apiKey = "d07f0516d514728c9fac0041e80cefdf"; // Replace with your OpenWeather API key

document.getElementById("search-btn").addEventListener("click", getWeather);
document.getElementById("location-btn").addEventListener("click", getLocationWeather);

function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    fetchWeather(city);
}

function fetchWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) throw new Error(data.message);
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Error fetching weather data. Please try again.");
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") throw new Error(data.message);
            displayForecast(data.list);
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
            alert("Error fetching forecast data. Please try again.");
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById("temp-div");
    const weatherInfo = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");

    tempDiv.innerHTML = `${Math.round(data.main.temp)}°C`;
    weatherInfo.innerHTML = `<p>${data.name}</p><p>${data.weather[0].description}</p>`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherIcon.classList.remove("hidden");
}

function displayForecast(forecastData) {
    const forecastDiv = document.getElementById("forecast");
    const forecastHeading = document.getElementById("forecast-heading");

    forecastDiv.innerHTML = "";
    forecastHeading.classList.remove("hidden");

    const dailyForecast = {};
    forecastData.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyForecast[date]) {
            dailyForecast[date] = {
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                description: item.weather[0].description,
            };
        }
    });

    Object.keys(dailyForecast).slice(0, 5).forEach(date => {
        const { temp, icon, description } = dailyForecast[date];
        const forecastItem = `
            <div class="forecast-item">
                <span>${date}</span>
                <img src="https://openweathermap.org/img/wn/${icon}.png" class="w-12 h-12">
                <span>${temp}°C</span>
                <span>${description}</span>
            </div>
        `;
        forecastDiv.innerHTML += forecastItem;
    });
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            alert("Location access denied. Please enter city manually.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchWeatherByCoords(lat, lon) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching weather:", error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data.list))
        .catch(error => console.error("Error fetching forecast:", error));
}
