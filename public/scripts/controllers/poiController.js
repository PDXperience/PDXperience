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

  poiController.getType = function(ctx, next) {

    console.log('the ctx object is ', ctx);
    console.log('route' + '/api' + ctx.path);
    var promise = $.getJSON('/api' + ctx.path);

    promise
      .done(function (data) {
        //use handlebars to render to the page
        console.log('heres the parks: ', data);
      }).
      fail(function () {
        console.log('something went wrong trying to get the parks');
      });
  };

  


  module.poiController = poiController;

})(window);
