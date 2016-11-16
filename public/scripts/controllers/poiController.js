(function(module) {

  var poiController = {};

  // call the GET all
  poiController.getAll = function(ctx, next) {

    console.log('the ctx object is ', ctx);

    var promise = $.getJSON('/api');

    promise
      .done(function (data) {
        console.log('heres the data', data);
        $('#testdiv').append(data);
      })
      .fail(function () {
        $('#testdiv').append('<p>Oh no, something went wrong!</p>');
      });
  };

  // poiController.getParks = function(ctx, next) {

  //   console.log('the ctx object is ', ctx);
    
  //   var promise = $.getJSON('/api/type/park');

  //   promise
  //     .done(function (data) {
  //       //use handlebars to render to the page
  //       console.log('heres the parks: ', data);
  //     }).
  //     fail(function () {
  //       console.log('something went wrong trying to get the parks');
  //     });
  // };

  // poiController.getMuseums = function(ctx, next) {

  //   console.log('the ctx object is ', ctx);
    
  //   var promise = $.getJSON('/api/type/museum');

  //   promise
  //     .done(function (data) {
  //       //use handlebars to render to the page
  //       console.log('heres the museums: ', data);
  //     }).
  //     fail(function () {
  //       console.log('something went wrong trying to get the museums');
  //     });
  // };

  // poiController.getTheatres = function(ctx, next) {

  //   console.log('the ctx object is ', ctx);
    
  //   var promise = $.getJSON('/api/type/theatre');

  //   promise
  //     .done(function (data) {
  //       //use handlebars to render to the page
  //       console.log('heres the theatres: ', data);
  //     }).
  //     fail(function () {
  //       console.log('something went wrong trying to get the theatres');
  //     });
  // };


  module.poiController = poiController;

})(window);
