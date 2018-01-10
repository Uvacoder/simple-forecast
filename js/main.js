const mainData = document.querySelector('#main-data');
const temp = document.querySelector('#temp');
const errorMsg = document.querySelector('.errorMsg');
const city = document.querySelector('#city');
const options = document.querySelectorAll('.options');
const iconInfo = document.querySelector('#dev');
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
        underline.style.transform = 'translateX(50px)';
        temp.innerHTML = `${fahrenheit}&deg;F`;
      } else if (this.id == 'more') {
        underline.style.transform = 'translateX(100px)';
        this.children[0].classList.toggle('icon-rotate');
        if (iconInfo.style.display == 'block') {
          iconInfo.style.display = 'none';
        }
        if (this.children[0].classList.contains('icon-rotate')) {
          mainData.style.height = '350px';
          mainData.style.marginTop = '-25px';
        } else {
          mainData.style.height = '160px';
          mainData.style.marginTop = '100px';
        }
      } else if (this.id == 'info') {
        if (iconInfo.style.display == 'none') {
          iconInfo.style.display = 'block';
        } else {
          iconInfo.style.display = 'none';
        }

      } else {
        underline.style.transform = 'translateX(0px)';
        temp.innerHTML = `${celcius}&deg;C`;
      }
    }));
  });

}
function fail(error) {
  const errorIcon = "<i class='far fa-exclamation-triangle'></i>"
  errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
}
