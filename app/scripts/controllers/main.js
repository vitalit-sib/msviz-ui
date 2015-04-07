'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, searchService, matchesProteinRefService, sequenceService) {
    searchService.list().then(function (data) {
      console.info('getting all', data);
      $scope.searches.all = data.searchIds;
    });


    $scope.searches = {};
    $scope.proteinRefs = {};

    $scope.$watch('searches.selected', function (searchId) {
      if (searchId === undefined) {
        return;
      }
      matchesProteinRefService.findBySearchId(searchId)
        .then(function (protRefs) {
          $scope.proteinRefs.all = protRefs;
        });
    });

    $scope.showProtein = function(){

      console.log('SHOWING PROT ',$scope.proteinRefs.selected);
      sequenceService.get($scope.proteinRefs.selected.AC, $scope.proteinRefs.selected.source)
        .then(function(prot){
          console.lot(prot);
        });
    };
  });
