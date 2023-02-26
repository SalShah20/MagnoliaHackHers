updateClock();

/* var metric;
var imperial;
 */
function metric() {
    getWeather("metric");
}

function imperial() {
    getWeather("imperial");
}

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather();
      }
    });

const apiKey = "19c166bda4fde506bf8e0f7c04ff4c98";
var city;
var apiUrl;
var locApi;

function weather () {
    city = document.querySelector(".search-bar").value;
    locApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(locApi)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const icon = data.weather[0].icon;
            const speed = data.wind.speed;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            document.querySelector(".city").innerText = "Weather in " + city;
            document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector(".description").innerText = "Description: " + description;
            document.querySelector(".temperature").innerText = temperature + "°F";
            document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
            locClock();
        })
        .catch(error => {
            console.log('An error occurred:', error);
        });
    })
    }

    function getWeather (units) {
        city = document.querySelector(".search-bar").value;
        locApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
        fetch(locApi)
            .then(response => response.json())
            .then(data => {
                var lat = data[0].lat;
                var lon = data[0].lon;
        apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + units; 
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const icon = data.weather[0].icon;
                const speed = data.wind.speed;
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
    
                document.querySelector(".city").innerText = "Weather in " + city;
                document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                document.querySelector(".description").innerText = "Description: " + description;
                if (units.startsWith("m")) {
                    document.querySelector(".temperature").innerText = temperature + "°C";
                    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
                }
                if (units.startsWith("i")) {
                    document.querySelector(".temperature").innerText = temperature + "°F";
                    document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
                }
                document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                document.querySelector(".weather").classList.remove("loading");
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
                locClock();
            })
            .catch(error => {
                console.log('An error occurred:', error);
            });
        url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            fetch(url)
                .then (response => response.json())
                .then(data => {
                    const aqi = data.list[0].main.aqi;
                    const co = data.list[0].components.co;
                    const no = data.list[0].components.no;
                    const no2 = data.list[0].components.no2;
                    const o3 = data.list[0].components.o3;
                    const so2 = data.list[0].components.so2;
                    const index = ['', '(Good)', '(Fair)', '(Moderate)', '(Poor)', '(Very Poor)'];

                    document.querySelector('.aqi').innerText = "AQI: " + aqi + " " + index[aqi];
                    document.querySelector('.co').innerText = "Carbon Monoxide: " + co;
                    document.querySelector('.no').innerText = "Nitrogen Monoxide: " + no;
                    document.querySelector('.no2').innerText = "Nitrogen Dioxide: " + no2;
                    document.querySelector('.o3').innerText = "Ozone: " + o3;
                    document.querySelector('.so2').innerText = "Sulphur Dioxide: " + so2;
                }
                )
        })
        }

function updateClock() {
    var now = new Date(),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
        time = now.getHours() + ':' + now.getMinutes(), 

        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    document.querySelector('.date').innerText = "Date: " + date;
    document.querySelector('.time').innerText = "Your Time: " + time;

    setTimeout(updateClock, 1000);
}


function locClock() {
    city = document.querySelector(".search-bar").value;
    const apiKey = "2777474ea3a04d8c8e7a63debb9fdca9";
    const apiUrl = "https://timezone.abstractapi.com/v1/current_time/?api_key=" + apiKey + "&location=" + city;

    fetch(apiUrl)
        .then (response => response.json())
        .then (data => {
            const datetime = data.datetime;
            const timezone = data.timezone_abbreviation;
            const dateArray = datetime.split(" ");
            const date = dateArray[0];
            const time = dateArray[1];
            const times = time.split(":");
            const dates = date.split("-");
            const year = dates[0];
            const month = dates[1];
            const day = dates[2];
            months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            document.querySelector(".locDate").innerText = "Date: " + day + " " + months[parseInt(month)] + " " + year;
            document.querySelector(".locTime").innerText = "Time: " + times[0] + ":" + times[1] + " " + timezone;
        }
        )
    setTimeout(locClock, 1000);
}