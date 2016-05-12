'use strict';
angular.module('matches-psms-list', ['thirdparties', 'environment', 'fishtones-wrapper'])
/**
 * @ngdoc object
 * @name  matches.view:MatchesFishtonesPsmSpectrumView
 * @description wrapper around the fisthones/d3 view for psm
 */
  .factory('MatchesFishtonesPsmSpectrumView', function (_, fishtones) {
    var MatchesFishtonesPsmSpectrumView = function (elm, ftPSM) {
      var _this = this;

      var psm = new fishtones.match.PSMAlignment({
        richSequence: ftPSM.richSeq,
        expSpectrum: ftPSM.spectrum
      });
      var view = new fishtones.match.MatchSpectrumView({
        model: psm,
        el: elm,
        tol: 1000,
        xZoomable: true
      });
      view.render();

      _this.scalingArea = view.scalingArea;
      _this.scalingContext = view.scalingContext;


      return _this;
    };

    return MatchesFishtonesPsmSpectrumView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
  .directive('matchesFishtonesPsmSpectrum', function (pviz, _, MatchesFishtonesPsmSpectrumView) {

    var link = function (scope, elm) {
      var view = new MatchesFishtonesPsmSpectrumView(elm, scope.fishtonespsm);

      // lets store the view in main scope
      var currentId = scope.$parent.selectedItemsId;
      _.findWhere(scope.$parent.$parent.selectedItems, {id: currentId}).scalingArea = view.scalingArea;
      _.findWhere(scope.$parent.$parent.selectedItems, {id: currentId}).scalingContext = view.scalingContext;

      return view;
    };
    return {
      link: link,
      scope: {
        'fishtonespsm': '='
      },
      restrict: 'A',
      template: '<div></div>'
    };
  })
;
