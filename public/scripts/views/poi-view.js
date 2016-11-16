(function (module) {

  var poiView = {};

  poiView.render = function(poiHtml) {
    $('#testdiv').append(poiHtml);  
  };

  module.poiView = poiView;

})(window);