'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, $q, _, searchService, psmService, SearchSet, matchesProteinRefService, sequenceService) {
    searchService.list().then(function (data) {
      $scope.searches.all = data;
    });


    $scope.searches = {selected: []};
    $scope.proteinRefs = {};
    $scope.proteinMatch = {};

    $scope.$watch('searches.selected', function (searches) {
      if (searches === undefined || _.size(searches) === 0) {
        return;
      }
      $scope.searchSet = new SearchSet().add(searches);
      matchesProteinRefService.findBySearchId(searches[0].searchId)
        .then(function (protRefs) {
          $scope.proteinRefs.all = protRefs;
        });
    });

    //when the protein is selected, we populate the scope proteinMatch with the protein def (Sequence) and PSMs
    $scope.showProtein = function () {
      $q.all(
        [
          sequenceService.get($scope.proteinRefs.selected.AC, $scope.proteinRefs.selected.source),
          psmService.findAllBySearchIdsAndProteinId(_.pluck($scope.searchSet.list(), 'searchId'), $scope.proteinRefs.selected.AC)
        ]
      )
        .then(function (args) {
          $scope.proteinMatch.protein = args[0];
          $scope.proteinMatch.psms = args[1];
        });
    };


  });
