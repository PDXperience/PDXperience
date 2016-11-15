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

  poiController.getParks = function(ctx, next) {
    

  };


  module.poiController = poiController;

})(window);
