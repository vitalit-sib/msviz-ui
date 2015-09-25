'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _) {
    $scope.selectedItems = [];

    $scope.$on('basket-add', function (event, item) {
      $scope.addSelected(item);
    });

    $scope.addSelected = function (item) {
      var newEntry = {type:item.type, firstPsm: item.bean, otherPsms: []};
      $scope.selectedItems.push(newEntry);
    };


    $scope.zoomSpectrum = function(spectra){
      console.log('sending spectra');
      $scope.$emit('show-spectrum-modal', spectra.firstPsm);
    };

    //$scope.addSelectedOther = function (psm, item) {
    //  console.log("here");
    //};

    // we're currently not looking for similar spectra
    //$scope.getSimSpectra = function (spectrumRef) {
    //  ssmService.findSimilarSpectra(spectrumRef).then(function (spspMatches) {
    //    var ssms = {
    //      type: 'SSM',
    //      ref: spectrumRef,
    //      matches: spspMatches
    //    };
    //    $scope.selectedItems.push(ssms);
    //
    //  });
    //};

    $scope.removeSelectedPSM = function (psm) {
      $scope.selectedItems = _.filter($scope.selectedItems, function (e) {
        return e.firstPsm !== psm;
      });
    };

    $scope.loadXic = function (psm) {
      // create object of intersting information
      var sp = psm.firstPsm.fishTones.spectrum.attributes;
      var ms2Info = {precCharge: sp.precCharge, precIntensity: sp.precIntensity, precMoz: sp.precMoz, retentionTime: sp.retentionTime, searchId: psm.firstPsm.searchId};

      // first we send it up
        $scope.$emit('show-xic-emit', ms2Info);
    };

  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmListDetails
 * @description show the list of the selected peptides
 */
  .directive('matchesBasketDetailsAll', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/main/compare/protein/basket/detailed-all.html'
    };
  })

;
