'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, $q, _, psmService, ProteinMatch, sequenceService, SearchResultsFilter) {


    var showProtein = function () {
      var prot = $scope.searchResultsFilter.getSelectedProtein();
      $q.all(
        [
          sequenceService.get(prot.AC, prot.source),
          psmService.findAllBySearchIdsAndProteinId($scope.searchResultsFilter.getSelectedSearchIds(), prot.AC)
        ]
      )
        .then(function (args) {
          $scope.proteinMatch = new ProteinMatch(args[0], args[1], {targetModification: $scope.searchResultsFilter.getSelectedModification()});
        });
    };

    $scope.searchResultsFilter = new SearchResultsFilter({onComplete: showProtein});


  });
