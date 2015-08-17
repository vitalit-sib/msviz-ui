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

      return _this;
    };

    return MatchesFishtonesPsmSpectrumView;
  })
/**
 * @ngdoc object
 * @name  matches.view:MatchesFishtonesSSMSpectrumView
 * @description wrapper around the fisthones/d3 view for SSM
 */
  .factory('MatchesFishtonesSSMSpectrumView', function (_, fishtones, fishtonifyService) {
    var MatchesFishtonesSSMSpectrumView = function (elm, ssm) {
      var _this = this;
      var alg = new fishtones.match.SpectraPairAlignment({
        spectrumA: fishtonifyService.convertSpectrum(ssm.sp1),
        spectrumB: fishtonifyService.convertSpectrum(ssm.sp2)
      });

      var view = new fishtones.match.SpectraPairAlignmentView({
        el: elm,
        model: alg,
        fragTol: 50,
        enhanced: true
      });

      view.xZoomable();
      view.render();

      return _this;
    };

    return MatchesFishtonesSSMSpectrumView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
  .directive('matchesFishtonesPsmSpectrum', function (pviz, MatchesFishtonesPsmSpectrumView) {
    var link = function (scope, elm) {
      var view = new MatchesFishtonesPsmSpectrumView(elm, scope.fishtonespsm);
      return view;
    };
    return {
      link: link,
      scope: {
        'fishtonespsm': '='
      },
      restrict: 'A',
      template: '<div ></div>'
    };
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesSsms
 * @description a list of SSM
 */
  .directive('matchesFishtonesSsm', function (pviz, MatchesFishtonesSSMSpectrumView) {
    var link = function (scope, elm) {
      var view = new MatchesFishtonesSSMSpectrumView(elm, scope.fishtonesssm);
      return view;
    };
    return {
      link: link,
      scope: {
        'fishtonesssm': '='
      },
      restrict: 'A',
      template: '<div ></div>'
    };
  })
;
