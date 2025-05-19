document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundImage = "url('assets/default light.jpg')";
});

const apiKey = '0d44b92e22d27d190e05c2c2718e1a3f';

async function getWeather() {
    if (!navigator.onLine) {
        alert('You are offline. Please check your internet connection.');
        return;
    }
    
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById('weatherResult').innerHTML = '<p style="color:red;">City not found. Try again.</p>';
            return;
        }

        const { main, weather, name } = data;
        document.getElementById('weatherResult').innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Condition: ${weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
        `;

        updateBackground(weather[0].main);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = '<p style="color:red;">Error fetching data.</p>';
    }
}

function updateBackground(condition) {
    let backgroundImage = '';
    switch (condition.toLowerCase()) {
        case 'clear': backgroundImage = 'sunny.jpg'; break;
        case 'clouds': backgroundImage = 'cloudy.jpg'; break;
        case 'rain': backgroundImage = 'rainy.jpg'; break;
        case 'thunderstorm': backgroundImage = 'storm.jpg'; break;
        case 'snow': backgroundImage = 'snow.jpg'; break;
        case 'fog': backgroundImage = 'foggy.jpg'; break;
        case 'haze': backgroundImage = 'haze.jpg'; break;
        case 'mist': backgroundImage = 'mist.jpg'; break;
        case 'thunder': backgroundImage = 'thunder.jpg'; break;
        case 'wind': backgroundImage = 'windy.jpg'; break;
        case 'storm': backgroundImage = 'strom.jpg'; break;
        default: backgroundImage = 'default light.jpg'; break;
    }
    document.body.style.backgroundImage = `url('assets/${backgroundImage}')`;
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundImage = "url('assets/home dark.jpg')";
    } else {
        document.body.style.backgroundImage = "url('assets/default light.jpg')";
    }
});
