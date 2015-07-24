'use strict';
angular.module('psms-alignment', ['matches-modif-filter', 'matches-proteins', 'sequences', 'matches-psms', 'thirdparties', 'environment'])


  .controller('PsmsAlignmentCtrl', function($scope, $routeParams, $q, psmService, sequenceService, ProteinMatch, ModifFilter) {

    $scope.searchIds = $routeParams.searchIds.split(',');

    var showProtein = function () {
      $q.all(
        [
          sequenceService.get($routeParams.proteinAC, 'SwissProt_2013_12.fasta'),
          psmService.findAllBySearchIdsAndProteinId($scope.searchIds, $routeParams.proteinAC)
        ]
      )
        .then(function (args) {
          $scope.proteinMatch = new ProteinMatch(args[0], args[1], {targetModification: $scope.modifFilter.getSelectedModification()});
        });
    };

    $scope.modifFilter = new ModifFilter({onComplete: showProtein, searchIds:$scope.searchIds});

    showProtein();

  })
;
