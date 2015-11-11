'use strict';
angular.module('results-controller', ['thirdparties', 'environment'])

  .controller('ResultsCtrl', function($scope, resultsService) {
    resultsService.list().then(function (data) {
      $scope.searchIds = data;
    });

  })

  .controller('OneResultCtrl', function($scope, $routeParams, resultsService, _) {
    $scope.searchId = $routeParams.searchId
    $scope.searchIds = $scope.searchId.split(',')
    $scope.rts = _.map($scope.searchIds, function(id){return 'rt '+ id})
    $scope.ints = _.map($scope.searchIds, function(id){return 'int '+ id})

    resultsService.findBySearchId($scope.searchId).then(function (data) {
      $scope.entries = data;
    });

});

