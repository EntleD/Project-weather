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

function showForecast(response) {
  console.log(response);
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row align-items-end"`;
  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col"></div>
       <div>${day}</div>
       <div>30°C</div><div><img src="clipart216360.png" alt="sunny weather" width="50px" /></div>
       <div>20km/h</div> 
       <div>39%</div>
            </div>
            </div>
            </div>
`;
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

  mainCelsius = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(mainCelsius);
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

function fahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let celsToFah = (mainCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(celsToFah);
}

function celsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(mainCelsius);
}

let mainCelsius = null;

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);

liveCity("Cape Town");
