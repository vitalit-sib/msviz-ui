'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, $q, _, searchService, psmService, SearchIdSet, matchesProteinRefService, sequenceService) {
    searchService.list().then(function (data) {
      $scope.searches.all = data.searchIds;
    });


    $scope.searches = {selected: []};
    $scope.proteinRefs = {};
    $scope.proteinMatch = {};

    $scope.$watch('searches.selected', function (searchIds) {
      if (searchIds === undefined || _.size(searchIds) === 0) {
        return;
      }
      $scope.searchIdSet = new SearchIdSet().add(searchIds);
      matchesProteinRefService.findBySearchId(searchIds[0])
        .then(function (protRefs) {
          $scope.proteinRefs.all = protRefs;
        });
    });

    //when the protein is selected, we populate the scope proteinMatch with the protein def (Sequence) and PSMs
    $scope.showProtein = function () {
      $q.all(
        [
          sequenceService.get($scope.proteinRefs.selected.AC, $scope.proteinRefs.selected.source),
          psmService.findAllBySearchIdsAndProteinId($scope.searchIdSet, $scope.proteinRefs.selected.AC)
        ]
      )
        .then(function (args) {
          $scope .proteinMatch.protein = args[0];
          $scope.proteinMatch.psms = args[1];
        });
    };


  });
