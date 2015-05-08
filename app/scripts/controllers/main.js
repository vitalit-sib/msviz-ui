'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, $q, _, searchService, psmService, SearchSet, proteinMatchesRefService, sequenceService, SearchResultsFilter) {

    $scope.proteinMatch = {};

    var showProtein = function () {
      console.log('showProtein');
      var prot = $scope.searchResultsFilter.getSelectedProtein();
      $q.all(
        [
          sequenceService.get(prot.AC, prot.source),
          psmService.findAllBySearchIdsAndProteinId($scope.searchResultsFilter.getSelectedSearchIds(), prot.AC)
        ]
      )
        .then(function (args) {
          $scope.proteinMatch.protein = args[0];
          $scope.proteinMatch.psms = args[1];
        });
    };

    $scope.searchResultsFilter = new SearchResultsFilter({onComplete: showProtein});


  });
