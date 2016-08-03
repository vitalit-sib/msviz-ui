'use strict';
angular.module('matches-basket', ['thirdparties', 'environment'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _,$location,$routeParams, httpProxy) {

    $scope.showAddedLabel = false;
    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.selectedItems = [];
    $scope.runAndSpUniqueIds = [];
    $scope.selectedItemsId = -1;

    $scope.$on('basket-add', function (event, item) {

      // we only add elements to the basket if they're not already there
      var newRunAndSpUniqueId = item.bean.spectrumId.runId + item.bean.spectrumId.id;
      if(! _.find($scope.runAndSpUniqueIds, function(x){ return x === newRunAndSpUniqueId; })) {
        $scope.runAndSpUniqueIds.push(newRunAndSpUniqueId);

        $scope.addSelected(item);
      }

    });

    /**
     * add a new element to the basket
     * @param item
     */
    $scope.addSelected = function (item) {
      $scope.selectedItemsId ++;

      var sp = (item.bean.fishTones) ? (item.bean.fishTones.spectrum.attributes) : (item.bean.spectrum.attributes);
      var ms2Info = {precCharge: sp.precCharge, precIntensity: sp.precIntensity, precMoz: sp.precMoz, retentionTime: sp.retentionTime, searchId: item.bean.spectrumId.runId, scanNr: item.bean.spectrumId.id};

      // construct info for XIC
      // check wether psm info is available
      var newEntry;
      if(item.type === 'psm'){
        newEntry = {id: $scope.selectedItemsId, type:item.type, firstPsm: item.bean, otherPsms: [], ms2Info: ms2Info};
      }else{
        newEntry = {id: $scope.selectedItemsId, type:item.type, fishTones: {spectrum: item.bean.spectrum}, ms2Info: ms2Info};
      }
      $scope.selectedItems.push(newEntry);
    };

    /**
     * add the selected rt and intensities to the results
     * @param item
     */
    $scope.addToResults = function(item){

      var myXicPeaks = _.map(item.xicPeaks, function(el){
        return {'searchId': el.searchId, 'rt': Number(el.rt), 'intensity': Number(el.int)};
      });

      // sort the searchIds in ascending order
      //not sorting anymore, otherwise is not keeping the order given by user
      //var sortedSearchId = $scope.searchIds.sort();

      var resultEntry = {
        'proteinAC':item.firstPsm.proteinList[0].proteinRef.AC,
        'peptideSeq':item.firstPsm.fishTones.richSeq.toString(),
        'startPos':item.firstPsm.proteinList[0].startPos,
        'endPos':item.firstPsm.proteinList[0].endPos,
        //'searchIds':sortedSearchId.join(','),
        'searchIds':$scope.searchIds.join(','),
        'spectrumId': item.firstPsm.spectrumId,
        'score': item.firstPsm.matchInfo.score.mainScore,
        'localizationScore': item.firstPsm.matchInfo.score.scoreMap['Mascot:delta score'],
        'ppmTolerance': 10,
        'rtZoom': {'lowerRt':10, 'upperRt':30},
        'rtSelected': {'lowerRt':10, 'upperRt':30},
        'xicPeaks': myXicPeaks
      };

      // put the data to the bakend and show the label
      httpProxy.put('/basket', resultEntry, {headers: {'Content-Type': undefined}}).then(function (){
        item.showAddedLabel = true;
      });

      // remove the label after 2 seconds
      setTimeout(function(){
        $scope.$apply(function () {
          item.showAddedLabel = false;
        });
      }, 2000);

    };

    /**
     * open a new tab showing a large version of the spectrum and XIC
     *
     * @param spectrum
     */
    $scope.zoomSpectrum = function(spectrum){
      //open a new tab for the spectrum
      var spectrumId=spectrum.firstPsm.spectrumId.id;
      var runId=spectrum.firstPsm.spectrumId.runId;


      var url='/#/details/' + $scope.searchIds + '/protein/' +$scope.proteinAC + '/spectrumId/' + spectrumId + '/runId/' + runId;
      window.open(url, '_blank');
    };

    $scope.resetSpectrum = function(id, target){
      target[id].model.reset();
    };

    $scope.resetXic = function(id, target){
      target[id].model.reset();
    };

    $scope.zoomAllOther = function(id, target){
      var xDomain = _.findWhere($scope.selectedItems, {id: id})[target]._xDomain;

      $scope.selectedItems.forEach(function(item){
        if(item.id !== id){
          item[target].xDomain(xDomain);
        }
      });
    };

    $scope.removeSelectedPSM = function (searchId, scanNr) {
      $scope.removeSelectedSp(searchId, scanNr);

      var psmInfo = {
        // rank: psm.matchInfo.rank,
        searchId: searchId,
        spNr: scanNr
      };
      $scope.$emit('basket-remove', psmInfo);
    };

    $scope.removeSelectedSp = function(searchId, scanNr) {
      // remove the items in the basket
      $scope.selectedItems = _.filter($scope.selectedItems, function (e) {
        return (e.ms2Info.spectrumId !== searchId && e.ms2Info.scanNr !== scanNr);
      });

      // remove the list of unique id's
      var runAndSpUniqueId = searchId + scanNr;
      $scope.runAndSpUniqueIds = _.filter($scope.runAndSpUniqueIds, function(e) {
        return e !== runAndSpUniqueId;
      });
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
