'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _, fishtones, spectrumService, fishtonifyService, ssmService) {
    $scope.$on('psmAddSelected', function (event, pvizPsm) {
      $scope.addSelectedPSM(pvizPsm);
    });

    $scope.selectedMatches = [];
    $scope.addSelectedPSM = function (pvizPsm) {
      if (_.contains($scope.selectedMatches, pvizPsm)) {
        return;
      }
      pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);


      pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

      spectrumService.findByRunIdAndId(pvizPsm.spectrumId.runId, pvizPsm.spectrumId.id).then(function (spectrum) {
        var sp = fishtonifyService.convertSpectrum(spectrum);
        pvizPsm.fishTones.spectrum = sp;
        pvizPsm.type = 'PSM';
        $scope.selectedMatches.push(pvizPsm);
      });
    };

    $scope.getSimSpectra = function (spectrumRef) {
      ssmService.findSimilarSpectra(spectrumRef).then(function (spspMatches) {
        var ssms = {
          type: 'SSM',
          ref: spectrumRef,
          matches: spspMatches
        };
        $scope.selectedMatches.push(ssms);

      });
    };

    $scope.removeSelectedPSM = function (psm) {
      $scope.selectedMatches = _.filter($scope.selectedMatches, function (e) {
        return e !== psm;
      });
    };

  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmListDetails
 * @description show the list of the selected peptides
 */
  .directive('matchesBasket', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/matches/searches/matches-basket.html'
    };
  })

;
