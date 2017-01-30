'use strict';
angular.module('matches-basket', ['thirdparties', 'environment', 'searches-list'])
  .controller('MatchesBasketCtrl', function ($scope, $q, _,$location,$routeParams, httpProxy, svgExport, d3, searchService) {

    $scope.showAddedLabel = false;
    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.selectedItems = [];
    $scope.runAndSpUniqueIds = [];
    $scope.selectedItemsId = -1;


    $scope.exportSvg = function(elId, svgType, fileType){

      // select the correct SVG element
      var selEl = d3.select('#' + svgType + '_' + elId)[0][0];
      var svg = (svgType === 'xic') ? selEl.childNodes[0] : selEl.childNodes[1];

      // get the height of this SVG element
      var height = svg.getBBox().height;
      var width = svg.getBoundingClientRect().width;

      var svgString = svgExport.getSvgString(svg, width, height);

      if(fileType === 'png'){
        // prepare the callback
        var save = function(dataBlob){
          saveAs(dataBlob, svgType + '.png');
        };

        // save the PNG
        svgExport.svgString2Png(svgString, width, height, save);
      }else{
        var blob = new Blob([ svgString ], {type: 'image/svg+xml;charset=utf-8'});
        saveAs(blob, svgType + '.svg');
      }

    };

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
        // we store the fragment precision into the fishTones for correct peak-matching
        searchService.get(newEntry.firstPsm.searchId).then(function(res){
          var resArr = res.fragmentTolerance.split(/\s+/);
          newEntry.firstPsm.fishTones.fragmentTolerance = resArr[0];

          switch(resArr[1].charAt(0).toLowerCase()){
            case 'p':
              newEntry.firstPsm.fishTones.fragmentToleranceUnit = 'ppm';
              break;
            case 'd':
              newEntry.firstPsm.fishTones.fragmentToleranceUnit = 'dalton';
              break;
            default:
              newEntry.firstPsm.fishTones.fragmentToleranceUnit = undefined;
          }

          $scope.selectedItems.push(newEntry);
        });

      }else{
        newEntry = {id: $scope.selectedItemsId, type:item.type, fishTones: {spectrum: item.bean.spectrum}, ms2Info: ms2Info};
        $scope.selectedItems.push(newEntry);
      }

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
      var sortedSearchId = $scope.searchIds.concat().sort();

      // we also have to sort the myXicPeaks
      var sortedXicPeaks = _.sortBy(myXicPeaks, function(el){
        return el.searchId;
      });

      var resultEntry = {
        'proteinAC':item.firstPsm.proteinList[0].proteinRef.AC,
        'peptideSeq':item.firstPsm.fishTones.richSeq.toString(),
        'startPos':item.firstPsm.proteinList[0].startPos,
        'endPos':item.firstPsm.proteinList[0].endPos,
        'searchIds':sortedSearchId.join(','),
        'spectrumId': item.firstPsm.spectrumId,
        'score': item.firstPsm.matchInfo.score.mainScore,
        'localizationScore': item.firstPsm.matchInfo.score.scoreMap['Mascot:delta score'],
        'ppmTolerance': 10,
        'rtZoom': {'lowerRt':10, 'upperRt':30},
        'rtSelected': {'lowerRt':10, 'upperRt':30},
        'xicPeaks': sortedXicPeaks,
        'nextAA': item.firstPsm.nxtAA,
        'prevAA': item.firstPsm.prevAA,
        'ppmDiff': item.firstPsm.ppmDiff
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
    $scope.zoomSpectrum = function(searchId, scanNr){
      //open a new tab for the spectrum
      var url='/#/details/' + $scope.searchIds + '/protein/' +$scope.proteinAC + '/spectrumId/' + scanNr + '/runId/' + searchId;
      window.open(url, '_blank');
    };

    $scope.resetSpectrum = function(id, target){
      target[id].model.reset();
    };

    $scope.resetXic = function(id, target){
      target[id].model.reset();
    };

    $scope.zoomAllOther = function(id, target){

      var selItem = _.findWhere($scope.selectedItems, {id: id})[target];
      var xDomain = selItem.scalingContext._xDomain;

      $scope.selectedItems.forEach(function(item){
        if(item.id !== id){
          if(item[target].zoomX){
            item[target].zoomX(xDomain);
          }else{
            item[target].scalingContext.xDomain(xDomain);
          }
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
