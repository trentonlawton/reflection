$(document).ready(function() {
  console.log(load('name'));
  $('#namebox').focus(function() {
    $(this).keypress(function(e) {
      if (e.keyCode === 13) {
        var val = $('#namebox').val();
        localStorage.name = val;
        console.log(val);

        console.log(localStorage);
        $('#hello').fadeOut(2000, function() { $(this).remove(); })
      };
    });
  });

  function load(key) {
    var greeting;
    if (localStorage[key]) {
      greeting = localStorage[key];
      return greeting;
    } else {
      console.log("No name availables");
    }
  }

});
