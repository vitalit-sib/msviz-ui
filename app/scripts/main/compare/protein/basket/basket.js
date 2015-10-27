'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _,$location,$routeParams) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.selectedItems = [];
    $scope.$on('basket-add', function (event, item) {
      $scope.addSelected(item);
    });

    $scope.addSelected = function (item) {
      // info for XIC
      var sp = item.bean.fishTones.spectrum.attributes;
      var ms2Info = {precCharge: sp.precCharge, precIntensity: sp.precIntensity, precMoz: sp.precMoz, retentionTime: sp.retentionTime, searchId: item.bean.searchId};

      // info for spectrum and XIC
      var newEntry = {type:item.type, firstPsm: item.bean, otherPsms: [], ms2Info: ms2Info};
      $scope.selectedItems.push(newEntry);
    };

    $scope.zoomSpectrum = function(spectra){
      console.log('zoom spectrum:');
      //open a new tab for the spectrum
      var spectrumId=spectra.firstPsm.spectrumId.id;
      var runId=spectra.firstPsm.spectrumId.runId;
      var url='/#/details/' + $scope.searchIds + '/protein/' +$scope.proteinAC + '/spectrumId/' + spectrumId + '/runId/' + runId;
      window.open(url, '_blank');
    };

    $scope.removeSelectedPSM = function (psm) {
      $scope.selectedItems = _.filter($scope.selectedItems, function (e) {
        return e.firstPsm !== psm;
      });

      var psmInfo = {
        // rank: psm.matchInfo.rank,
        searchId: psm.searchId,
        spNr: psm.spectrumId.id
      };
      $scope.$emit('basket-remove', psmInfo);
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
