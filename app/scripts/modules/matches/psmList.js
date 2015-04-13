'use strict';
angular.module('matches')
  .controller('PsmListCtrl', function ($scope, $q, _, fishtones, spectrumService) {
    $scope.$on('psmAddSelected', function (event, pvizPsm) {
      $scope.addSelectedPSM(pvizPsm);
    });

    $scope.selectedMatches = [];
    $scope.addSelectedPSM = function (pvizPsm) {
      if (_.contains($scope.selectedMatches, pvizPsm)) {
        return;
      }
      pvizPsm.fishTones = {
        richSeq: new fishtones.dry.RichSequence().fromString(pvizPsm.pep.sequence)
      };

      pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

      spectrumService.findByRunIdAndId(pvizPsm.spectrumId.runId, pvizPsm.spectrumId.id).then(function (spectrum) {
        var sp = new fishtones.wet.ExpMSMSSpectrum({
          precMoz: spectrum.ref.precursor.moz,
          mozs: spectrum.peaks.mozs,
          intensities: spectrum.peaks.intensities,
          intensityRanks: spectrum.peaks.intensityRanks
        });
        pvizPsm.fishTones.spectrum = sp;
        $scope.selectedMatches.push(pvizPsm);
      });

    };

  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmListDetails
 * @description show the list of the selected peptides
 */
  .directive('matchesPsmListDetails', function (pviz) {
    return {
      restrict: 'E',
      templateUrl: 'views/matches/searches/matchesPsmListDetails.html'
    };
  })
/**
 * @ngdoc object
 * @name  matches.view:MatchesFishtonesPsmSpectrumView
 * @description wrapper around the fisthones/d3 view
 */
  .factory('MatchesFishtonesPsmSpectrumView', function (_, fishtones) {
    var MatchesFishtonesPsmSpectrumView = function (elm, ftPSM) {
      var _this = this;


      var psm = new fishtones.match.PSMAlignment({
        richSequence: ftPSM.richSeq,
        expSpectrum: ftPSM.spectrum
      });
      new fishtones.match.MatchSpectrumView({
        model    : psm,
        el: elm,
        tol      : 300,
        xZoomable: true
      }).render();

      return _this;
    };

    return MatchesFishtonesPsmSpectrumView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
  .directive('matchesFishtonesPsmSpectrum', function (pviz, MatchesFishtonesPsmSpectrumView) {
    var link = function (scope, elm) {
      var view = new MatchesFishtonesPsmSpectrumView(elm, scope.fishtonespsm);

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

;
