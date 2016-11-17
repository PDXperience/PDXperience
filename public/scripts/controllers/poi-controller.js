(function(module) {

  var poiController = {};

  function createManyPoiHtml(jsonData) {
    const template = Handlebars.compile($('#view-many-template').html());
    return template(jsonData);
  };

  function createTypeHtml(jsonData) {
    const template = Handlebars.compile($('#view-type-template').html());
    return template(jsonData);
  };

  function createOnePoiHtml(jsonData) {
    const template = Handlebars.compile($('#view-one-template').html());
    return template(jsonData);
  };

  function createStarsHtml(jsonData) {
    const template = Handlebars.compile($('#my-stars-template').html());
    return template(jsonData);
  };


  $('#selectmenu').on('change', function() {
    if ($(this).val() === 'all') {
      poiController.getAll();
    }
    $('.poi').empty();

    poiController.getType($(this).val());
  });

  $('#location').on('click', function() {
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
    var promise = $.getJSON('/api/type/' + path);

    promise
      .done(type => {
        type.forEach(poi => {
          var poiHtml = createTypeHtml(poi);
          poiView.renderType(poiHtml);
        });
      })
      .fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  poiController.getId = function(ctx, next) {

    var promise = $.getJSON('/api' + ctx.hash);

    promise
      .done(poi => {
        var poiHtml = createOnePoiHtml(poi);
        poiView.renderId(poiHtml);
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
      })
      .fail(function() {
        console.log('Get Geo did not work');
      });
  };

  module.poiController = poiController;

})(window);
