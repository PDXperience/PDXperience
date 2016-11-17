(function(module) {

  var userController = {};

  $('#signin-form').on('submit', function(event) {
    event.preventDefault();
    var password= $('#POST-signin-password').val();
    var email = $('#POST-signin-email').val();

    $.ajax({
      method:'POST',
      url: '/api/auth/signin',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        'email': email,
        'password': password
      })
    })
    .fail(err => {
      $('#signin-response').append(err.responseText);
      console.log(err);
    })
    .done(res => {
      localStorage.setItem('token', res.token);
      console.log(res);
    });
  });

  $('#signup-form').on('submit', function(event) {
    event.preventDefault();
    var password= $('#POST-signup-password').val();
    var email = $('#POST-signup-email').val();
    var firstName = $('#POST-signup-firstName').val();

    $.ajax({
      method:'POST',
      url: '/api/auth/signup',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        'email': email,
        'password': password,
        'firstName': firstName
      })
    })
      .fail(err => {
        $('#signup-response').append(err.responseText);
        console.log(err);
      })
      .done(res => {
        localStorage.setItem('token', res.token);
        console.log(res);
      });
  });


  userController.addItinerary = function(ctx, next) {
    console.log('CONTEXT', ctx);

    const path = ctx.path.split('/');
    const id = path[path.length - 1];
    const token = localStorage.getItem('token');

    $.ajax({
      method:'PUT',
      url: '/api/me/itineraries',
      headers: {
        'content-type': 'application/json',
        'authorization': token
      },
      data: JSON.stringify({ 'poiId': id })
    })
      .fail(err => {
        $('#user-info').text("There was an error, please try again.").fadeIn('slow');
        $('#user-info').delay(2500).fadeOut('slow');
        console.log(err);
      })
      .done(res => {
        $('#user-info').text("Added to your itinerary.").fadeIn('slow');
        $('#user-info').delay(2500).fadeOut('slow');
        console.log(res);
      });


  };

  module.userController = userController;

})(window);