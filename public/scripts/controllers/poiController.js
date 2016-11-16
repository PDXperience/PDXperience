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

  // $('#selectmenu').on('change', function() {
  //   console.log($(this).val());
  //   poiController.type = $(this).val();
  //   poiController.getType();
  // });

  // call the GET all
  poiController.getAll = function(ctx, next) {

    var promise = $.getJSON('/api');

    promise
      .done(allPoi => {
        allPoi.forEach(poi => {
          var poiHtml = createManyPoiHtml(poi);
          poiView.renderAll(poiHtml);
          next();
        });
      })
      .fail(function () {
        $('#testdiv').append('<p>Oh no, something went wrong!</p>');
      });
  };

  poiController.getType = function(ctx, next) {
    console.log('CTX ',ctx);
    var promise = $.getJSON('/api' + ctx.path);

    promise
      .done(type => {
        type.forEach(poi => {
          var poiHtml = createTypeHtml(poi);
          poiView.renderType(poiHtml);
          next();
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
        var poiHtml = createOnePoiHtml(poi);
        poiView.render(poiHtml);
      }).
      fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  


  module.poiController = poiController;

})(window);
