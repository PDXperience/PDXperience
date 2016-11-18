(function(module) {

  var poiController = {};

  function createManyPoiHtml(jsonData) {
    const template = Handlebars.compile($('#view-many-template').html());
    return template(jsonData);
  }

  function createTypeHtml(jsonData) {
    const template = Handlebars.compile($('#view-type-template').html());
    return template(jsonData);
  }

  function createOnePoiHtml(jsonData) {
    const template = Handlebars.compile($('#view-one-template').html());
    return template(jsonData);
  }


  $('#selectmenu').on('change', function() {
    if ($(this).val() === 'all') {
      poiController.getAll();
    }
    $('.poi').empty();

    poiController.getType($(this).val());
  });

  $('.star-rating').on('change', function() {
    let star = Number(this.value);
    let result = JSON.stringify({'stars': [{'rating': star}]});
    poiController.sendStar(result);
  });

  $('#location').on('click', function() {
    $('.poi').empty();
    function success(position) {
      let coords = `${position.coords.latitude}/${position.coords.longitude}`;
      poiController.getGeo(coords);
      return coords;
    }

    function error(){
      console.log('Unable to retrieve location');
      return({code: 400, error: 'Unable to retrieve location'});
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });

  // call the GET all
  poiController.getAll = function() {

    var promise = $.getJSON('/api');

    promise
      .done(allPoi => {
        allPoi.forEach(poi => {
          var poiHtml = createManyPoiHtml(poi);
          poiView.renderAll(poiHtml);
        });

      })
      .fail(function () {
        $('#testdiv').append('<p>Oh no, something went wrong!</p>');
      });
  };

  poiController.getType = function(path) {

    if (path === 'natural_area') { path = 'natural area'; }

    var promise = $.getJSON('/api/type/' + path);

    promise
      .done(type => {
        type.forEach(poi => {
          var poiHtml = createTypeHtml(poi);
          poiView.renderType(poiHtml);

        });
        $('.star-rating').rating();
        $('.star').on('click', function() {
          let poiId = ($(this).parents('.star-rating').data('id'));
          let star = $(this).attr('title');
          let result = {
            data: JSON.stringify({'stars': {'rating': star}, 'reviews': `I gave a ${star}`}),
            id: poiId
          };
          poiController.sendStar(result);
        });
      })
      .fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  poiController.getId = function(ctx, next) {

    var promise = $.getJSON('/api/id/' + ctx.hash);
    promise
      .done(poi => {
        var poiHtml = createOnePoiHtml(poi);
        poiView.renderId(poiHtml);
        $('.star-rating').rating();
      })
      .fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  poiController.getGeo = function(ctx, next) {
    var promise = $.getJSON('/api/location/' + ctx);

    promise
      .done(poi => {
        poi.forEach(location => {
          var poiHtml = createTypeHtml(location);

          poiView.renderType(poiHtml);
        });
        $('.star-rating').rating();
      })
      .fail(function() {
        console.log('Get Geo did not work');
      });
  };

  poiController.sendStar = function(results) {
    let token = localStorage.getItem('token');
    $.ajax({
      type: 'PUT',
      url: '/api/me/review/' + results.id,
      headers: {
        'authorization': token,
        'content-type': 'application/json'
      },
      data: results.data
    })
    .fail(err => {
      console.log(err);
    })
    .done(res => {
      console.log(res);
    });
  };

  module.poiController = poiController;

})(window);
