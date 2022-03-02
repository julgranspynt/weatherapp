/**
 *  OpenWeatherMap-template
 *	Documentation: https://openweathermap.org/current#data
 *  Generate an API key here: 
 */


/**
* According to documentation, I need at least 2 parameters when calling the API http://api.openweathermap.org/data/2.5/weather?
* 1 Required parameter: api-key (appid)
* 2 Required parameter: location (q / lat,lon)
* Setting unit to metric standard 
* Parameters are to be separated by ampersand (&)
*
*/


let weather = {
    "apiKey": "0b9e9e4b85c9e31ac72a376760232e36",
    fetchWeather: function (city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, feels_like, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + " °C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});
 
document.querySelector(".show").addEventListener("click", function () {
    weather.search();
});
