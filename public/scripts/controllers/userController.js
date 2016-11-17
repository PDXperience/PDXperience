(function(module) {

  $('#signin-form').on('submit', function(event) {
    console.log('clicked submit button');
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
      localStorage.setItem('token', res.body.token);
      console.log(res);
    });

  });

  var userController = {};

  userController.getUser = function(ctx, next) {
    console.log('CONTEXT', ctx);
  };

  module.userController = userController;
})(window);