(function(module) {

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

  var userController = {};

  userController.getUser = function(ctx, next) {
    console.log('CONTEXT', ctx);
  };

  module.userController = userController;
})(window);