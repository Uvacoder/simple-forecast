const image = document.querySelector('#body');                  // Body
const mainData = document.querySelector('#main-data');          // Data container
const temp = document.querySelector('#temp');                   // Temperature
const errorMsg = document.querySelector('.errorMsg');           // Error Message
const search = document.querySelector('.search-wrapper');       // Search: Input and Button
const input = search.querySelector('.search-input');            // Search Input
const searchBtn = search.querySelector('.search');              // Search Button
const toggleSearch = document.querySelector('#toggle-search');  // Toggle Search Button
const more = document.querySelector('#more');                   // More Data Button
const city = document.querySelector('#city');                   // City
const status = document.querySelector('#status');               // Weather Status
const options = document.querySelectorAll('.options');          // Menu options
const underline = document.querySelector('.underline');         // Underline on active option
const iconInfo = document.querySelector('.dev');                // Developer and icon info
/* ----- Detailed Weather Information ----- */
const cloudCover = document.querySelector('.cloud-cover');      // Cloud Cover
const humidityMeasure = document.querySelector('.humidity');    // Humidity
const windSpeed = document.querySelector('.wind-speed');        // Wind Speed
const pressureMeasure = document.querySelector('.pressure');    // Pressure
const sunRise = document.querySelector('.sunrise');             // Sunrise time
const sunSet = document.querySelector('.sunset');               // Sunset time

// Check if Geolocation works or if it's allowed or blocked
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success,fail);
} else {
  const errorIcon = "<i class='far fa-exclamation-triangle'></i>"
  errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
  image.style.backgroundImage = "url('media/other.jpg')";
}

// Get Weather data
function getData(data) {
  console.log(data);
  // Get Temperature in Celcius
  let celcius = data.main.temp;
  celcius = celcius.toFixed(1);
  // Get Temperature in Fahrenheit
  let fahrenheit = celcius * 1.8 + 32;
  fahrenheit = fahrenheit.toFixed(1);
  // Write data to temp
  temp.innerHTML = `${celcius}&deg; C`;

  // Updates body image and status icon
  if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
    status.src = 'media/storm-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/storm.jpg')";
  } else if ((data.weather[0].id >= 300 && data.weather[0].id <= 321) || (data.weather[0].id >= 500 && data.weather[0].id <= 531)) {
    status.src = 'media/rainy-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/rainy.jpg')";
  } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
    status.src = 'media/snowy-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/snowy.jpg')";
  } else if ((data.weather[0].id >= 701 && data.weather[0].id <= 781) || (data.weather[0].id >= 951 && data.weather[0].id <= 962)) {
    status.src = 'media/windy-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/windy.jpg')";
  } else if (data.weather[0].id == 800) {
    status.src = 'media/sunny-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/sunny.jpg')";
  } else if (data.weather[0].id == 801) {
    status.src = 'media/halfsunny-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/halfsunny.jpg')";
  } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
    status.src = 'media/cloudy-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/cloudy.jpg')";
  } else if (data.weather[0].id == 906) {
    status.src = 'media/hail-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/hail.jpg')";
  } else {
    status.src = 'media/thermometer-stat.svg';
    image.style.background = "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/other.jpg')";
  }

  // Write Detailed Weather Information
  // Write Humidity
  city.innerHTML = data.name;humidityMeasure.textContent = `${data.main.humidity}%`;
  // Write Wind Speed
  windSpeed.textContent = `${data.wind.speed} m/s`;
  // Write Pressure
  pressureMeasure.textContent = `${data.main.pressure} hPa`;
  // Write Cloud Cover
  cloudCover.textContent = `${data.clouds.all}%`;
  // Write Sunrise
  sunRise.textContent = `Working on it..`;
  // Write Sunset
  sunSet.textContent = `Working on it..`;

  // Display type for children in the Main Data
  for (var i = 0; i < mainData.childElementCount; i++) {
    if (mainData.children[i].tagName == 'TABLE') {
      mainData.children[i].style.display = 'table';
    } else {
      mainData.children[i].style.display = 'block';
    }
  }
  // What menu options do
  options.forEach(option => option.addEventListener('click',function() {
    // If Fahrenheit button is clicked
    if (this.id == 'fahrenheit') {
      iconInfo.classList.remove('display');
      search.classList.remove('toggled-search');
      underline.style.transform = 'translateX(50px)';
      temp.innerHTML = `${fahrenheit}&deg; F`;
    }
    // If More button is clicked
    else if (this.id == 'more') {
      underline.style.transform = 'translateX(100px)';
      this.children[0].classList.toggle('icon-rotate');
      mainData.classList.toggle('expanded-data');
      iconInfo.classList.remove('display');
      search.classList.remove('toggled-search');
    }
    // If Toggle Search button is clicked
    else if (this.id == 'toggle-search') {
      if (mainData.classList.contains('expanded-data')) {
        mainData.classList.remove('expanded-data');
        more.children[0].classList.remove('icon-rotate');
      }
      iconInfo.classList.remove('display');
      underline.style.transform = 'translateX(150px)';
      search.classList.toggle('toggled-search');
      input.focus();
    }
    // If Your location button is clicked
    else if (this.id == 'your-location') {
      iconInfo.classList.remove('display');
      underline.style.transform = 'translateX(200px)';
      search.classList.remove('toggled-search');
      // TODO: Fix weather at current Geolocation
      //       Fix toggle bug
      // function success(position) {
      //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0036c88f0dd7246332045207bf44130f&units=metric`;
      //   $.getJSON(url,function(data) { getData(data) });
      // }
    }
    // If Information button is clicked
    else if (this.id == 'info') {
      iconInfo.classList.toggle('display');
      search.classList.remove('toggled-search');
    }
    // If Celcius button is clicked
    else {
      iconInfo.classList.remove('display');
      search.classList.remove('toggled-search');
      underline.style.transform = 'translateX(0px)';
      temp.innerHTML = `${celcius}&deg; C`;
    }
  }));
}

// Search City Function
function searchCity(cityText) {
  // API URL
  const urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=0036c88f0dd7246332045207bf44130f&units=metric`;
  // Get JSON Data about weather
  $.getJSON(urlByCity,function(data) { getData(data) });
}

// Function to execute if Geolocation is successful
function success(position) {
  // API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0036c88f0dd7246332045207bf44130f&units=metric`;
  // Get JSON Data about weather
  $.getJSON(url,function(data) { getData(data) });
}

// Determine Weather by City Search
input.addEventListener('keypress',function(e) {
  if (this.value && e.keyCode == 13) {
    searchCity(this.value);
    search.classList.remove('toggled-search');
  }
});
searchBtn.addEventListener('click',function() {
  if (input.value) {
    searchCity(input.value);
    search.classList.remove('toggled-search');
  }
});

// Function to execute if Geolocation fails
function fail(error) {
  const errorIcon = "<i class='far fa-exclamation-triangle'></i>"
  errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
  image.style.backgroundImage = "url('media/other.jpg')";
}
