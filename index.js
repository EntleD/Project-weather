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

function fixDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
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
  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecasts-date">${fixDay(
              forecastDay.time
            )}</div>
            <div class="weather-forecasts-maxTemp">${Math.round(
              forecastDay.temperature.day
            )}°C</div> 
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="" width="80" />
                 <div class="weather-forecasts-conditions">
                <span class="weather-forecasts-description">${
                  forecastDay.condition.description
                }</span>  
          </div>
      </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function showConditions(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let description = document.querySelector("#weather-description");
  let blowElement = document.querySelector("#wind-bar");
  let fogElement = document.querySelector("#humidity");
  let mainIcon = document.querySelector("#weather-icon");

  mainCelsius = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(mainCelsius);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  blowElement.innerHTML = Math.round(response.data.wind.speed);
  fogElement.innerHTML = response.data.temperature.humidity;

  mainIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  liveForecast(response.data.coordinates);
}

function liveForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1283946bf8748d1390tfdoecb43eac44";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function liveCity(city) {
  let apiKey = "1283946bf8748d1390tfdoecb43eac44";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-button");
  liveCity(enterCity.value);
}

let mainCelsius = null;

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchCity);

liveCity("Cape Town");
