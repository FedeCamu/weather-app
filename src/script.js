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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              
              <div class="col-2">
                <div class="weather-forecast-day">${day}</div>
                <div class="future-weather-icons">
               <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="" width="48">
              </div>
             <div class="weather-forecast-temp"> <span class="weather-forecast-min">10º</span> <span class="weather-forecast-max">15º</span></div>
              </div>
              
              `;
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

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  // console.log(response.data);

  let currentDayTime = document.querySelector("#current-day-time");
  let currentDate = document.querySelector("#current-date");

  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-temp-C").innerHTML = `${Math.round(
    celsiusTemperature
  )}º`;

  document.querySelector("#current-humidity").innerHTML = `  ${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector("#current-wind").innerHTML = `  ${Math.round(
    response.data.wind.speed
  )}km/h`;

  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#temp-min-max").innerHTML = `  ${Math.round(
    response.data.main.temp_min
  )}º | ${Math.round(response.data.main.temp_max)}º`;

  currentDayTime.innerHTML = formatDate(response.data.dt * 1000);
  currentDate.innerHTML = formatDateCifre(response.data.dt * 1000);

  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
  // currentWeatherIcon.setAttribute("width", "160");

  getForecast(response.data.coord);
}

// **********************************
// **********************************
// API CALL + Show default city (New York) at load
// **********************************
// **********************************

function search(city) {
  // let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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
  // console.log(lat);
  // console.log(long);

  let units = "metric";
  // let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`)
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

// **********************************
// **********************************
// Change C to F and viceversa
// **********************************
// **********************************

function showCentDegreeTemp(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#current-temp-C");
  currentTempC.innerHTML = `${Math.round(celsiusTemperature)}º`;
  centDegree.classList.add("cent-far-selected");
  farDegree.classList.remove("cent-far-selected");
}

function showFarDegreeTemp(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#current-temp-C");
  currentTempF.innerHTML = `${Math.round((celsiusTemperature * 9) / 5 + 32)}º`;
  farDegree.classList.add("cent-far-selected");
  centDegree.classList.remove("cent-far-selected");
}

let celsiusTemperature = null;

let centDegree = document.querySelector("#cent-degree");

centDegree.addEventListener("click", showCentDegreeTemp);

let farDegree = document.querySelector("#far-degree");

farDegree.addEventListener("click", showFarDegreeTemp);
