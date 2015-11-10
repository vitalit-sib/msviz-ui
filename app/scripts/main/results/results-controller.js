'use strict';
angular.module('results-controller', ['thirdparties', 'environment'])

  .controller('ResultsCtrl', function($scope, resultsService) {
    resultsService.list().then(function (data) {
      $scope.searchIds = data;
    });

  });

