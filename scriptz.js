$(document).ready(function() {
  var address;
  getcurLocation();
  startTime();
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#clock').text(h + ":" + m + ":" + s).appendTo('body');
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
  }

  console.log(load('name'));
  $('#namebox').focus(function() {
    $(this).keypress(function(e) {
      if (e.keyCode === 13) {
        var val = $('#namebox').val();
        save('name', val)
        console.log(val);

        console.log(localStorage);
        $('#hello').fadeOut(2000, function() { $(this).remove(); })
        location.reload()
      };
    });
  });

  function save(key, val) { localStorage[key] = val; }

  function load(key) {
    var greeting;
    if (localStorage[key]) {
      greeting = localStorage[key];
      $('#hello').remove();
      $('<section id="data" class="col-md-4 ">').appendTo('body');
      $('<h1 id="name"></h1>').text("Hey, " + greeting).appendTo('#data');
      return greeting;
    } else {
      console.log("No name availables");
      $('#hello').show();
    }
  }
  function getcurLocation() {
    var startPos;

    var geoOptions = {enableHighAccuracy : true};
    var geoSuccess = function(position) {
      startPos = position;
      var lat = startPos.coords.latitude;
      var long = startPos.coords.longitude;
      console.log(lat + "," + long);
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                    lat + ',' + long +
                    '&key=AIzaSyD0kEx9LiveBojcr8gAl0CpKDUJcQl0E_o',
                function(data) {
                  address = data.results[0].address_components[3].long_name;
                  $('<h2 id="city">').text(address).appendTo('#data')
                  curTemp(address);
                });

    };

    var geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
  };
  function curTemp(val) {

    $.getJSON(
        'http://api.apixu.com/v1/current.json?key=4b5048a31458486897852500162908&q=' +
            val,
        function(data) {

          var temp = Math.round(data.current.temp_f)
          $('<h1 id="temp">').text(temp + 'º').appendTo('#data')
        });
  }

});
