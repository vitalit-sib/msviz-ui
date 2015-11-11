'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _,$location,$routeParams, httpProxy) {
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

    $scope.addToBasket = function(item){

      var myXicPeaks = _.map($scope.xicPeaks, function(el){
        return {"searchId": el.searchId, "rt": Number(el.rt), "intensity": Number(el.int)}
      });

      var basketEntry = {
        "proteinAC":item.firstPsm.proteinList[0].proteinRef.AC,
         "peptideSeq":item.firstPsm.fishTones.richSeqShortcut ,
        "startPos":item.firstPsm.proteinList[0].startPos ,
          "endPos":item.firstPsm.proteinList[0].endPos ,
        "searchIds":$scope.searchIds.join(","),
        "spectrumId": item.firstPsm.spectrumId,
        "score": item.firstPsm.matchInfo.score.mainScore,
        "localizationScore": item.firstPsm.matchInfo.score.scoreMap['Mascot:delta score'],
        "ppmTolerance": 10,
        "rtZoom": {"lowerRt":10, "upperRt":30},
        "rtSelected": {"lowerRt":10, "upperRt":30},
        "xicPeaks": myXicPeaks
      };

      httpProxy.put('/basket', basketEntry, {headers: {'Content-Type': undefined}});

    }

    $scope.zoomSpectrum = function(spectrum){
      //open a new tab for the spectrum
      var spectrumId=spectrum.firstPsm.spectrumId.id;
      var runId=spectrum.firstPsm.spectrumId.runId;
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
