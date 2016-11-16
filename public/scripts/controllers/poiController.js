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

  function createItineraryHtml(jsonData) {
    const template = Handlebars.compile($('#my-itinerary-template').html());
    return template(jsonData);
  };

  // call the GET all
  poiController.getAll = function(ctx, next) {

    var promise = $.getJSON('/api');

    promise
      .done(allPoi => {
        allPoi.forEach(poi => {
          var parsed = createManyPoiHtml(poi);
          $('#testdiv').append(parsed);   
        });
      })
      .fail(function () {
        $('#testdiv').append('<p>Oh no, something went wrong!</p>');
      });
  };

  poiController.getType = function(ctx, next) {

    var promise = $.getJSON('/api' + ctx.path);

    promise
      .done(type => {
        type.forEach(poi => {
          var parsed = createTypeHtml(poi);
          $('#testdiv').append(parsed);
        });
      })
      .fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  poiController.getId = function(ctx, next) {

    var promise = $.getJSON('/api' + ctx.path);

    promise
      .done(poi => {
        var parsed = createOnePoiHtml(poi);
        $('#testdiv').append(parsed);
      }).
      fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  


  module.poiController = poiController;

})(window);
