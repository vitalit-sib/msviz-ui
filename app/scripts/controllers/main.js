'use strict';

/**
 * @ngdoc function
 * @name msvizUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the msvizUiApp
 */
angular.module('msvizUiApp')
  .controller('MainCtrl', function ($scope, searchService, matchesProteinRefService) {
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
  });
