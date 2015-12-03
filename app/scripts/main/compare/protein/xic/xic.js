'use strict';
angular.module('xic', ['thirdparties', 'environment', 'xic-services'])

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
.directive('xicFishtones', function (pviz, xicFishtonesView, _, httpProxy, $q) {

    var link = function (scope, elm) {

      var updateXics = function(xics, retentionTime, searchId){
        var view = xicFishtonesView(elm, xics, scope.searchIds, retentionTime, searchId);

        scope.xicModel = view.model;

        // lets store the view in main scope
        var currentId = scope.$parent.selectedItemsId;
        _.findWhere(scope.$parent.selectedItems, {id: currentId}).scalingAreaXic = view.scalingArea;
        _.findWhere(scope.$parent.selectedItems, {id: currentId}).scalingContextXic= view.scalingContext;

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

      var getXic = function(searchId, moz){
        var uri = '/exp/xic/' + searchId + '/' + moz + '?tolerance=10.0&rtTolerance=10.0';
        return httpProxy.get(uri);
      };

      var ms2Info = scope.item.ms2Info;

      var backendCalls = [];

      scope.searchIds.forEach(function(searchId) {
        backendCalls.push(getXic(searchId, ms2Info.precMoz));
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






