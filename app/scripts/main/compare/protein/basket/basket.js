'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _, myService,$location) {
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
      $scope.spectras = myService.set(newEntry);
    };

    $scope.zoomSpectrum = function(spectra){
      console.log('zoom spectrum:');
      //console.log(spectra);
      // call service to save the data
      angular.injector(['ng', 'matches-basket']).get("myService").set(spectra);

      //open a new tab for the spectrum
      //var comparePath= 'spectrum'
      //$location.path(comparePath);
      //var url='/#/spectrum/'
      //window.open(url, '_blank');
      var comparePath= 'spectrum'
      $location.path(comparePath);
    };

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


  //Service to share spectrum


.factory('myService', ['$rootScope', function ($rootScope) {
    var savedData = {}

    console.log('saving data');

    function set(data) {
      //savedData = data;
      $rootScope.spectras=data;
      console.log(data);
    }
    function get() {
      console.log('en el get');
      return $rootScope.spectras;
      //return savedData;
    }

    return {
      set: set,
      get: get
    }
}])

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
