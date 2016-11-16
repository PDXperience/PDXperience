(function (module) {

  var poiView = {};

  poiView.renderAll = function(poiHtml) {
    $('.poi').not('#all').empty();
    $('#all').append(poiHtml);  
  };

  poiView.renderType = function(poiHtml) {
    $('.poi').not('#type').empty();
    $('#type').append(poiHtml);  
  };

  module.poiView = poiView;

})(window);