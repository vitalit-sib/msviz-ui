'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _, fishtones, spectrumService, fishtonifyService, ssmService) {
    $scope.selectedItems = [];

    $scope.$on('basket-add', function (event, item) {
      $scope.addSelected(item);
    });

    $scope.addSelected = function (item) {
      if (_.contains($scope.selectedItems, item)) {
        return;
      }
      $scope.selectedItems.push(item);
    };

    $scope.getSimSpectra = function (spectrumRef) {
      ssmService.findSimilarSpectra(spectrumRef).then(function (spspMatches) {
        var ssms = {
          type: 'SSM',
          ref: spectrumRef,
          matches: spspMatches
        };
        $scope.selectedItems.push(ssms);

      });
    };

    $scope.removeSelectedPSM = function (psm) {
      $scope.selectedItems = _.filter($scope.selectedItems, function (e) {
        return e !== psm;
      });
    };

  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmListDetails
 * @description show the list of the selected peptides
 */
  .directive('matchesBasketDetailsAll', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/matches/basket/detailed-all.html'
    };
  })

;
