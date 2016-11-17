(function (module) {

  var userView = {};
  // on load, hide the sign in form
  $('#signin-form').hide();

  $('#signin-link').on('click', function() {
    console.log('clicked', this);
    $('#signup-link').removeClass('selected');
    $(this).addClass('selected');
    $('#signup-form').hide();
    $('#signin-form').show();
  });

  $('#signup-link').on('click', function() {
    console.log('clicked', this);
    $('#signin-link').removeClass('selected');
    $(this).addClass('selected');
    $('#signin-form').hide();
    $('#signup-form').show();
  });

  module.userView = userView;

})(window);