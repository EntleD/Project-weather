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
h2.innerHTML = ` Last updated: ${day} ${hours}:${minutes}`;

function showConditions(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let description = document.querySelector("#weather-description");
  let blowElement = document.querySelector("#wind-bar");
  let fogElement = document.querySelector("#humidity");
  let mainIcon = document.querySelector("#weather-icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  blowElement.innerHTML = Math.round(response.data.wind.speed);
  fogElement.innerHTML = response.data.main.humidity;
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function liveCity(city) {
  let apiKey = "32b60624683015da61e2ddd35066df2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-button");
  liveCity(enterCity.value);
}

liveCity("Cape Town");

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchCity);
