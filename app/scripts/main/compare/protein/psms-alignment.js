'use strict';
angular.module('psms-alignment', ['matches-modif-filter','matches-protein', 'sequences', 'matches-psms', 'thirdparties', 'environment', 'xic-services'])


  .controller('PsmsAlignmentCtrl', function($scope, $routeParams, $q, psmService, sequenceService, ProteinMatch, ModifFilter, SpectrumModal) {

    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.database = acSourcePair[1];


    $scope.$on('show-xic-emit', function (undefined, args) {
      $scope.$broadcast('show-xic-broadcast', args);

    });
    $scope.$on('show-spectrum-modal', function (undefined, args) {
      console.log('receiving spectra');
      console.log(args);
      var modal = new SpectrumModal(args);
      return modal;
    });

    var showProtein = function () {

      sequenceService.getSource($scope.searchIds[0], $scope.database).then(function(source) {

        $q.all(
          [
            sequenceService.get($scope.proteinAC, source),
            psmService.findAllBySearchIdsAndProteinId($scope.searchIds, $scope.proteinAC)
          ]
        )
          .then(function (args) {
            $scope.proteinMatch = new ProteinMatch(args[0], args[1], {targetModification: $scope.modifFilter.getSelectedModification()});
          });

      });

    };

    $scope.modifFilter = new ModifFilter({onComplete: showProtein, searchIds:$scope.searchIds});

    showProtein();

  })
;
