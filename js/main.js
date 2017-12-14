$.ready(function() {
  var msg = 'Sorry, we were unable to get your location.';

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        temp.innerHTML = "Geolocation is not supported by this browser.";
    }
  } 

});
