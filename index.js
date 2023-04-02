let now = new Date();
console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
console.log(days[now.getDay()]);
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
let month = months[now.getMonth()];
console.log(months[now.getMonth()]);

let date = now.getDate();
console.log(now.getDate);

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getUTCMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
console.log(now.getFullYear);
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function loading(event) {
  event.preventDefault();
  document.querySelector("#city-search").innerHTML = response.data.name;
}

function showConditions(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentBlow = Math.round(response.data.wind.speed);
  let description = document.querySelector("#weather-description");
  let blowElement = document.querySelector("#wind-bar");
  let mightRain = document.querySelector("#humidity");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${currentTemperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  blowElement.innerHTML = `Wind: ${currentBlow} km/h`;
  mightRain.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "32b60624683015da61e2ddd35066df2b";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function currentPosition(position) {
  let apiKey = "32b60624683015da61e2ddd35066df2b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#latitude-longtitude");
  showCurrentPosition.innerHTML = `Latitude: ${lat} Longtitude:${lon}`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentArea(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector("#area-button");
currentLocation.addEventListener("click", showCurrentArea);

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("submit", searchCity);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", loading);
