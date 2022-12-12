// **********************************
// **********************************
// DATE AND TIME
// **********************************
// **********************************

function formatDate(timestamp) {
  let currentDay = new Date(timestamp);

  let currentHour = currentDay.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = currentDay.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let today = currentDay.getDay();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${weekDays[today]} ${currentHour}:${currentMinute}`;
}

function formatDateCifre(timestamp) {
  let now = new Date(timestamp);
  let currentYear = now.getFullYear();

  let currentMonth = now.getMonth();

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let currentDayOfMonth = now.getDate();
  if (currentDayOfMonth < 10) {
    currentDayOfMonth = `0${currentDayOfMonth}`;
  }

  return `${currentYear}-${months[currentMonth]}-${currentDayOfMonth}`;
}

// **********************************
// **********************************
//DISPLAY FORECAST
// **********************************
// **********************************

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              
              <div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.time
                )}</div>
                <div class="future-weather-icons">
               <img src="${forecastDay.condition.icon_url}" alt="" width="48">
              </div>
             <div class="weather-forecast-temp"> <span class="weather-forecast-min">${Math.round(
               forecastDay.temperature.minimum
             )}º</span> <span class="weather-forecast-max">${Math.round(
          forecastDay.temperature.maximum
        )}º</span></div>
              </div>
              
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

// **********************************
// **********************************
// Search engine city - connect to API for city name  - date and time -  temperature - humidity - wind - description - temp min & Max
// **********************************
// **********************************

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "5t09f3f74eo3075d13ef8b9d94aa5421";

  let units = "metric";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let currentDayTime = document.querySelector("#current-day-time");
  let currentDate = document.querySelector("#current-date");

  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#current-city").innerHTML = response.data.city;

  document.querySelector("#current-temp-C").innerHTML = `${Math.round(
    celsiusTemperature
  )}ºC`;

  document.querySelector("#current-humidity").innerHTML = `  ${Math.round(
    response.data.temperature.humidity
  )}%`;

  document.querySelector("#current-wind").innerHTML = `  ${Math.round(
    response.data.wind.speed
  )}km/h`;

  document.querySelector("#current-weather-description").innerHTML =
    response.data.condition.description;

  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}º <span class="real-feel">Real Feel</span>`;

  currentDayTime.innerHTML = formatDate(response.data.time * 1000);
  currentDate.innerHTML = formatDateCifre(response.data.time * 1000);

  currentWeatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  currentWeatherIcon.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

// **********************************
// **********************************
// API CALL + Show default city (New York) at load
// **********************************
// **********************************

function search(city) {
  let apiKey = "5t09f3f74eo3075d13ef8b9d94aa5421";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

// **********************************
// **********************************
// Show weather of submitted city
// **********************************
// **********************************

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  search(city);
}

// **********************************
// **********************************
// show current location
// **********************************
// **********************************

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);

  let units = "metric";

  let apiKey = "5t09f3f74eo3075d13ef8b9d94aa5421";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios
    .get(`${apiUrl}lon=${long}&lat=${lat}&key=${apiKey}&units=${units}`)
    .then(showTemperature);
}
function showCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let curentLocationButton = document.querySelector("#Current-location-button");
curentLocationButton.addEventListener("click", showCurrentLocationWeather);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSubmit);

search("New York");
