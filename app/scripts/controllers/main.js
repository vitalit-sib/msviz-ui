'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, $q, searchService, psmService, SearchIdSet, matchesProteinRefService, sequenceService) {
    searchService.list().then(function (data) {
      $scope.searches.all = data.searchIds;
    });


    $scope.searches = {};
    $scope.proteinRefs = {};
    $scope.proteinMatch = {};

    $scope.$watch('searches.selected', function (searchId) {
      if (searchId === undefined) {
        return;
      }
      $scope.searchIdSet = new SearchIdSet().add(searchId);
      matchesProteinRefService.findBySearchId(searchId)
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
          $scope.proteinMatch.protein = args[0];
          $scope.proteinMatch.psms = args[1];
          console.info('CHANGED proteinMatch',$scope.proteinMatch);
        });
    };
  });
