function createRain() {
    const rainContainer = document.querySelector('.rain');

    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        rainContainer.appendChild(raindrop);
    }
}

function removeRain() {
    const rainContainer = document.querySelector('.rain');
    while (rainContainer.firstChild) {
        rainContainer.removeChild(rainContainer.firstChild);
    }
}


async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'Your API Key';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 
        if (data.cod === 200) {
            const weatherResult = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherResult;

            
            const weatherDescription = data.weather[0].description.toLowerCase();
            if (weatherDescription.includes('rain')) {
                document.body.className = 'rainy';
                createRain();
            } else if (weatherDescription.includes('clear')) {
                document.body.className = 'sunny';
                removeRain();
            } else if (weatherDescription.includes('snow')) {
                document.body.className = 'winter';
                removeRain();
            } else if (weatherDescription.includes('cloud')) {
                document.body.className = 'cloudy';
                removeRain();
            } else if (weatherDescription.includes('haze')) {
                document.body.className = 'haze';
                removeRain();
            } else if (weatherDescription.includes('mist')) {
                document.body.className = 'mist';
                removeRain();
            } else {
                document.body.className = '';
                removeRain();
            }
        } else {
            document.getElementById('weather-result').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}
