console.log("script is running ...");

const apiKey = "3e4fc0c79896fe05c7fd9258c07f1819";

const getCurrentWeather = async () => {
  // get the input
  const input = document.querySelector("#user-input").value;
  // determine if input is a zip or cityname
  const parseInput = isNaN(parseInt(input));
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`;

  if (!parseInput) {
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${apiKey}&units=imperial`;
  }

  // fetch call get api data
  const res = await fetch(requestUrl);
  const data = await res.json();

  // display the data
  let template = "";
  if (data.cod !== "404") {
    template = `
        <div class="weather-card">
            <div class="weather-card-header">
                <h2 class="weather-card-name">${data.name}</h2>
                <h2>(${new Date().toLocaleDateString()})</h2>
                <img class="icon" src="https://openweathermap.org/img/w/${
                  data.weather[0].icon
                }.png"/>
            </div>
            <div class="weather-card-detail">Temp: ${data.main.temp}F</div>
            <div class="weather-card-detail">Wind Speed: ${
              data.wind.speed
            }mph</div>
            <div class="weather-card-detail">Humidity: ${
              data.main.humidity
            }%</div>
            <div class="weather-card-detail">Coordinates: (${data.coord.lon},${
      data.coord.lat
    })</div>
        </div>
      `;
  } else {
    template = `<h3 class="error-message">Invalid City or Zip Code</h3>`;
  }

  document.querySelector("#current-weather").innerHTML = template;
};

document
  .querySelector("#user-input")
  .addEventListener("change", getCurrentWeather);
