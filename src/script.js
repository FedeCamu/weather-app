// **********************************
// **********************************
// DATE AND TIME
// **********************************
// **********************************

function formatDate() {
  let currentDay = now.getDay();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let today = weekDays[currentDay];

  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${today} ${currentHour}:${currentMinute}`;
}

let currentDayTime = document.querySelector("#current-day-time");

let now = new Date();

currentDayTime.innerHTML = formatDate(now);

function formatDateCifre() {
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

  return `${currentYear}-${months[currentMonth]}-${currentDayOfMonth}`;
}

let currentDate = document.querySelector("#current-date");

currentDate.innerHTML = formatDateCifre(now);

// **********************************
// **********************************
// Search engine city - connect to API for city name -  temperature - humidity - wind - description - temp min & Max
// **********************************
// **********************************

function showTemperature(response) {
  // console.log(response.data);

  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-city").innerHTML = document
    .querySelector("#current-city")
    .innerHTML.toUpperCase();

  document.querySelector("#current-temp-C").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;

  document.querySelector("#current-humidity").innerHTML = `  ${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector(
    "#current-wind"
  ).innerHTML = `  ${response.data.wind.speed}km/h`;

  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-weather-description").innerHTML = document
    .querySelector("#current-weather-description")
    .innerHTML.toUpperCase();

  document.querySelector("#temp-min-max").innerHTML = `  ${Math.round(
    response.data.main.temp_min
  )}º | ${Math.round(response.data.main.temp_max)}º`;
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
  currentTempC.innerHTML = `15º`;
  centDegree.classList.add("cent-far-selected");
  farDegree.classList.remove("cent-far-selected");
}

let centDegree = document.querySelector("#cent-degree");

centDegree.addEventListener("click", showCentDegreeTemp);

function showFarDegreeTemp(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#current-temp-C");
  currentTempF.innerHTML = `66º`;
  farDegree.classList.add("cent-far-selected");
  centDegree.classList.remove("cent-far-selected");
}

let farDegree = document.querySelector("#far-degree");

farDegree.addEventListener("click", showFarDegreeTemp);
