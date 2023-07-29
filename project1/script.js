const apikey = "985a87bc3afd0049c1a716e53801b7d8";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorBox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");

async function checkweather(city) { 
   const response = await fetch(apiurl + city + `&appid=${apikey}`);
   if (response.status == 404) { 
      errorBox.style.display = "block";
      weatherBox.style.display = "none";
   } else { 
      var data = await response.json();
      errorBox.style.display = "none";
      weatherBox.style.display = "block";

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds"){
         weatherIcon.src = "images/clouds.png" ;
      } 
      else if (data.weather[0].main == "Clear"){
         weatherIcon.src = "images/Clear.png";
      }
       else if (data.weather[0].main == "Rain"){
         weatherIcon.src = "images/rain.png";
      } 
      else if (data.weather[0].main == "Drizzle"){
         weatherIcon.src = "images/drizzle.png";
      } 
      else if (data.weather[0].main == "Mist"){
         weatherIcon.src = "images/mist.png";
      }
   }
}

searchBtn.addEventListener("click", () => {
   const cityName = searchBox.value;
   if (cityName.trim() !== "") {
      checkweather(cityName);
   }
});