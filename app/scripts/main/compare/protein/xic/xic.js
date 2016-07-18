'use strict';
angular.module('xic', ['thirdparties', 'environment', 'fishtones-wrapper'])

  .controller('xicController', function($scope){
    // remove the popup from the pviz view
    angular.element('#detailInfoPopover').hide();

    angular.element('#xicPopover').popover();

    $scope.$on('show-prec-info', function (undefined, args) {
      $scope.popoverText = args;
      $scope.$apply();
      angular.element('#xicPopover').show();

      // get the current mouse position
      var x = $scope.coordinates[0];
      var y = $scope.coordinates[1];
      angular.element('#xicPopover').css('left', (x + 30) + 'px');
      angular.element('#xicPopover').css('top', (y - 10) + 'px');
    });

    $scope.$on('hide-prec-info', function (undefined) {
      angular.element('#xicPopover').hide();
    });

  })

/**
 * @ngdoc directive
 * @name matches.directive:xicPopover
 * @description the popover when moving over the precursors in the XIC
 */
  .directive('xicPopover', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/main/compare/protein/xic/xic-popover.html'
    };
  })

/**
 * @ngdoc directive
 * @name matches.directive:xicTable
 * @description the table showing the xic values after quantitation
 */
  .directive('xicTable', function () {
    return {
      templateUrl: 'scripts/main/compare/protein/basket/xic-table.html',
      restrict: 'E'
    };
  })

/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
.directive('xicFishtones', function (pviz, _, httpProxy, $q, fishtones) {

    var link = function (scope, elm) {

      var updateXics = function(xics, retentionTime, searchId){

        // the new id should be the one just added
        var newId = _.max(scope.$parent.selectedItems, function(x){return x.id;}).id;

        // and we pass the id to the view
        var view = xicFishtonesView(elm, xics, scope.searchIds, retentionTime, searchId, newId, scope);

        scope.xicModel = view.model;

        _.findWhere(scope.$parent.selectedItems, {id: view.localId}).scalingAreaXic = view.scalingArea;
        _.findWhere(scope.$parent.selectedItems, {id: view.localId}).scalingContextXic= view.scalingContext;

        scope.$on('conflict-table-expanded', function(event, tableExpanded){
          scope.tableExpanded = tableExpanded;
        });

        scope.xicModel.on('change', function(){

          var xicPeaks = _.map(scope.xicModel.models, function(m){

            if(m.get('selected')){
              return {
                searchId: m.get('name'),
                rt: (m.get('selected')[0]/60).toFixed(2),
                int: (m.get('selected')[1]).toExponential(2)
              };
            }else{
              return {searchId: m.get('name')};
            }
          });

          // once we store it for the directive scope
          scope.xicPeaks = xicPeaks;
          // and once for the basket controller scope
          scope.item.xicPeaks = xicPeaks;

          scope.$apply();

        });
        return view;
      };

      var xicFishtonesView = function(elm, xics, searchIds, selRetentionTime, selSearchId, localId, scope) {
        //localId ++;
        var myLocalId = localId;

        // create an unused injection object
        var injection = new fishtones.wet.Injection();

        //XIC will be added to the collection, triggering an automatic render event
        var xicCol = new fishtones.wet.XICCollection();

        // group by name
        var groupFunction = function(xic){
          return xic.attributes.name;
        };

        var view = new fishtones.wet.XICMultiPaneView({
          model: xicCol,
          el: elm,
          groupBy: groupFunction,
          orderBy: searchIds
        });

        //these two lines just to fool out jshint
        var _yo = view.yo;
        _yo++;


        //
        var createPrecursorPeak = function(ms2Info) {
          // create info to show in popover
          var precInfo = ms2Info.ref.precursor;

          var popoverTitle = 'scan: ' +
            ms2Info.ref.scanNumber +
            ' (' + (precInfo.retentionTime / 60).toFixed(1) + 'min) ' +
            precInfo.charge + '+ ' +
            precInfo.moz.toFixed(4) + 'Da';

          return new fishtones.match.PrecursorPeak({
            retentionTime: ms2Info.ref.precursor.retentionTime,
            isSource: (ms2Info.ref.precursor.retentionTime === selRetentionTime) ? (true) : (false),
            //onclickCallback : function() {scope.$broadcast('show-prec-info', 'hoho');}
            mouseoutCallback: function() {scope.$broadcast('hide-prec-info', null);},
            mouseoverCallback: function() {scope.$broadcast('show-prec-info', popoverTitle);},
            mousemoveCallback: function(coordinates) {scope.coordinates = coordinates; console.log(coordinates);}
          });
        };


        // the ms1 and ms2 infos come in pairs
        for(var i=0; i<xics.length; i=i+2){
          var xicMs1Data = xics[i];
          var ms2Data = xics[i+1];

          // create the precursor information objects
          var precursors = _.map(ms2Data, createPrecursorPeak);

          var xic = new fishtones.wet.XIC();

          xic.set({'retentionTimes': xicMs1Data.rt});
          xic.set({'intensities': xicMs1Data.intensities});
          xic.set({'injection': injection});
          xic.set({'name': searchIds[i]});
          xic.set({'target': 0});
          xic.set({'precursors': precursors});

          // add retention time only if it was selected by this searchId
          if(searchIds[i] === selSearchId) {
            xic.set({'selectedRt': selRetentionTime});
          }

          xicCol.add(xic);
        }

        view.localId = myLocalId;

        return view;
      };



      // get the MS1 peaks
      var getXic = function(searchId, moz){
        var uri = '/exp/xic/' + searchId + '/' + moz + '?tolerance=10.0&rtTolerance=10.0';
        return httpProxy.get(uri);
      };

      // and get the MS2 spectra
      var getMs2 = function(searchId, moz){
        var uri = '/exp/spectra/' + searchId + '/' + moz + '?tolerance=10.0';
        return httpProxy.get(uri);
      };

      var ms2Info = scope.item.ms2Info;

      var backendCalls = [];

      scope.searchIds.forEach(function(searchId) {
        backendCalls.push(getXic(searchId, ms2Info.precMoz));
        backendCalls.push(getMs2(searchId, ms2Info.precMoz));
      });

      $q.all(
        backendCalls
      ).then(function(args){
          updateXics(args, ms2Info.retentionTime, ms2Info.searchId);
      });

    };

  return {
    link: link,
    restrict: 'A'
  };

});






