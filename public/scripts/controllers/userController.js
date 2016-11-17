(function(module) {
  $('#login-form').on('submit', function(event) {
    console.log('clicked submit button');
    event.preventDefault();
    var password= $('#POST-password').val();
    var email = $('#POST-email').val();

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
    .done(res => {
      localStorage.setItem('token', res.body.token);
      console.log(res);
    })
    .fail(err => {
      $('#form-response').append(err.responseText);
      console.log(err);
    });

  });

  var userController = {};

  userController.getUser = function(ctx, next) {
    console.log('CONTEXT', ctx);
  };

  module.userController = userController;
})(window);