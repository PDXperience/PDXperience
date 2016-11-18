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

  poiView.renderId = function(poiHtml) {
    $('.poi').not('#id').empty();
    $('#id').append(poiHtml);  
  };

  poiView.renderItinerary = function(poiHtml) {
    $('.poi').not('#itinerary').empty();
    $('#itinerary').append(poiHtml);  
  };

  module.poiView = poiView;

})(window);
