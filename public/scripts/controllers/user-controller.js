(function(module) {

  var userController = {};

  function createItineraryHtml(jsonData) {
    const template = Handlebars.compile($('#my-itinerary-template').html());
    return template(jsonData);
  };

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
      $(this).hide();
      $('.log-menu').hide();
      $('#itinerary-div').css('display', 'block');
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
        $(this).hide();
        $('.log-menu').hide();
        $('#itinerary-div').css('display', 'block');
        console.log(res);
      });
  });

  $('#itinerarybutton').on('click', function(event) {
    event.preventDefault();
    $('.poi').empty();
    const token = localStorage.getItem('token');

    $.ajax({
      method:'GET',
      url: '/api/me/itineraries',
      headers: {
        'content-type': 'application/json',
        'authorization': token
      }
    })
      .fail(err => {
        console.log(err);
      })
      .done(type => {
        console.log(type);
        type.savedPoi.forEach(poi => {
          var poiHtml = createItineraryHtml(poi);
          poiView.renderItinerary(poiHtml);
        });
        $('.star-rating').rating();
        $('.star').on('click', function() {
          let poiId = ($(this).parents('.star-rating').data('id'))
          let star = $(this).attr('title');
          let result = {
            data: JSON.stringify({'stars': {'rating': star}, 'reviews': `I gave a ${star}`}),
            id: poiId
          }
          poiController.sendStar(result);
        });
      });
  });

  userController.addItinerary = function(ctx, next) {
    const id = ctx.hash;
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

  userController.deleteItinerary = function(ctx, next) {
    const id = ctx.hash;
    const token = localStorage.getItem('token');

    $.ajax({
      method:'DELETE',
      url: '/api/me/itineraries/' + id,
      headers: {
        'content-type': 'application/json',
        'authorization': token
      }
    })
      .fail(err => {
        let $message = $('#itinerary-response-text');
        $message.text("There was an error, please try again.").fadeIn('slow');
        $message.delay(2500).fadeOut('slow');
      })
      .done(res => {
        let $message = $('#itinerary-response-text');
        $message.text("Removed from your itinerary.").fadeIn('slow');
        $('#' + id).delay(1000).fadeOut('slow');
        $message.delay(2500).fadeOut('slow');
      });

  };

  module.userController = userController;

})(window);
