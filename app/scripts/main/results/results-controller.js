'use strict';
angular.module('results-controller', ['thirdparties', 'environment'])

  .controller('ResultsCtrl', function($scope, resultsService) {
    resultsService.list().then(function (data) {
      var dataModif = _.map(data, function(x) {

        var lastModif = (x.lastModif) ? (new Date(x.lastModif)) : null;
        var firstModif = (x.firstModif) ? (new Date(x.firstModif)) : null;
        // put entries with no date information at the end of the list
        var rawLastModif = (x.lastModif) ? (x.lastModif) : 0;

        return {'searchId' :x._id, 'lastModif' : lastModif, 'firstModif' : firstModif, rawLastModif: rawLastModif};
      });
      $scope.resultList = dataModif;
    });

  })

  .controller('OneResultCtrl', function($scope, $routeParams, resultsService, _) {
    $scope.searchId = $routeParams.searchId;
    $scope.searchIds = $scope.searchId.split(',');
    $scope.rts = _.map($scope.searchIds, function(id){return 'rt '+ id;});
    $scope.ints = _.map($scope.searchIds, function(id){return 'int '+ id;});

    resultsService.findBySearchId($scope.searchId).then(function (data) {
      $scope.entries = data;
    });

    $scope.deleteEntry = function (id) {
      resultsService.deleteEntry(id).then(function(){
        // refresh the basket list after deleting an entry
        resultsService.findBySearchId($scope.searchId).then(function (data) {
          $scope.entries = data;
        });
      });
    };

    $scope.downloadTsv = function () {
      resultsService.findBySearchIdTsv($scope.searchId).then(function (data) {

        var anchor = angular.element('<a/>');
        anchor.css({display: 'none'}); // Make sure it's not visible
        angular.element(document.body).append(anchor); // Attach to document

        anchor.attr({
          href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
          target: '_blank',
          download: 'results.csv'
        })[0].click();

      });
    };

});

