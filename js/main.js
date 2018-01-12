const mainData = document.querySelector('#main-data');
const temp = document.querySelector('#temp');
const errorMsg = document.querySelector('.errorMsg');
const image = document.querySelector('#bkg-img');
const city = document.querySelector('#city');
const status = document.querySelector('#status');
const options = document.querySelectorAll('.options');
const iconInfo = document.querySelector('.dev');
const underline = document.querySelector('.underline');
const cloudCover = document.querySelector('.cloud-cover');
const humidityMeasure = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const pressureMeasure = document.querySelector('.pressure');
const sunRise = document.querySelector('.sunrise');
const sunSet = document.querySelector('.sunset');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success,fail);
} else {
  const errorIcon = "<i class='far fa-exclamation-triangle'></i>"
  errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
  image.style.backgroundImage = "url('media/other.jpg')";
}

function success(position) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0036c88f0dd7246332045207bf44130f&units=metric`;
  $.getJSON(url,function(data) {
    console.log(data);
    let celcius = data.main.temp;
    celcius = celcius.toFixed(1);
    let fahrenheit = celcius * 1.8 + 32;
    fahrenheit = fahrenheit.toFixed(1);
    temp.innerHTML = `${celcius}&deg;C`;

    if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      status.src = 'media/storm-stat.svg';
      image.style.backgroundImage = "url('media/storm.jpg')";
    } else if ((data.weather[0].id >= 300 && data.weather[0].id <= 321) || (data.weather[0].id >= 500 && data.weather[0].id <= 531)) {
      status.src = 'media/rainy-stat.svg';
      image.style.backgroundImage = "url('media/rainy.jpg')";
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      status.src = 'media/snowy-stat.svg';
      image.style.backgroundImage = "url('media/snowy.jpg')";
    } else if ((data.weather[0].id >= 701 && data.weather[0].id <= 781) || (data.weather[0].id >= 951 && data.weather[0].id <= 962)) {
      status.src = 'media/windy-stat.svg';
      image.style.backgroundImage = "url('media/windy.jpg')";
    } else if (data.weather[0].id == 800) {
      status.src = 'media/sunny-stat.svg';
      image.style.backgroundImage = "url('media/sunny.jpg')";
    } else if (data.weather[0].id == 801) {
      status.src = 'media/halfsunny-stat.svg';
      image.style.backgroundImage = "url('media/halfsunny.jpg')";
    } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
      status.src = 'media/cloudy-stat.svg';
      image.style.backgroundImage = "url('media/cloudy.jpg')";
    } else if (data.weather[0].id == 906) {
      status.src = 'media/hail-stat.svg';
      image.style.backgroundImage = "url('media/hail.jpg')";
    } else {
      status.src = 'media/thermometer-stat.svg';
      image.style.backgroundImage = "url('media/other.jpg')";
    }
    city.innerHTML = data.name;humidityMeasure.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressureMeasure.textContent = `${data.main.pressure} hPa`;
    cloudCover.textContent = `${data.clouds.all}%`;
    sunRise.textContent = `Working on it..`;
    sunSet.textContent = `Working on it..`;

    for (var i = 0; i < mainData.childElementCount; i++) {
      if (mainData.children[i].tagName == 'TABLE') {
        mainData.children[i].style.display = 'table';
      } else {
        mainData.children[i].style.display = 'block';
      }
    }

    options.forEach(option => option.addEventListener('click',function() {
      if (this.id == 'fahrenheit') {
        if (iconInfo.classList.contains('display')) {
          iconInfo.classList.remove('display');
        }
        underline.style.transform = 'translateX(50px)';
        temp.innerHTML = `${fahrenheit}&deg;F`;
      } else if (this.id == 'more') {
        underline.style.transform = 'translateX(100px)';
        this.children[0].classList.toggle('icon-rotate');
        if (iconInfo.classList.contains('display')) {
          iconInfo.classList.remove('display');
        }
        if (this.children[0].classList.contains('icon-rotate')) {
          mainData.style.height = '350px';
          mainData.style.marginTop = '-25px';
        } else {
          mainData.style.height = '160px';
          mainData.style.marginTop = '100px';
        }
      } else if (this.id == 'info') {
        iconInfo.classList.toggle('display');
      } else if (this.classList.contains('search')) {
        if (iconInfo.classList.contains('display')) {
          iconInfo.classList.remove('display');
        }
        underline.style.transform = 'translateX(150px)';
      } else {
        if (iconInfo.classList.contains('display')) {
          iconInfo.classList.remove('display');
        }
        underline.style.transform = 'translateX(0px)';
        temp.innerHTML = `${celcius}&deg;C`;
      }
    }));
  });

}
function fail(error) {
  const errorIcon = "<i class='far fa-exclamation-triangle'></i>"
  errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
  image.style.backgroundImage = "url('media/other.jpg')";
}
