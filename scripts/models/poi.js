(function(module) {


  // call the GET all
  function getAll() {
    var promise = $.getJSON('/api');

    promise
      .done(function (data) {
        $('#testdiv').append(data.text);
      })
      .fail(function () {
        $('#testdiv').append('<p>Oh no, something went wrong!</p>');
      });
  }


  module.getAll = getAll;

})(window);