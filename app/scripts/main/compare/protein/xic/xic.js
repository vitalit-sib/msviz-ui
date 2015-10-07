'use strict';
angular.module('xic', ['thirdparties', 'environment', 'xic-services'])

/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
.directive('xicFishtones', function (pviz, xicFishtonesView, _, httpProxy, $q) {

    var link = function (scope, elm) {

      var updateXics = function(xics, retentionTime, searchId){
        var view = xicFishtonesView(elm, xics, scope.searchIds, retentionTime, searchId);
        return view;
      };

      var getXic = function(searchId, moz){
        var uri = '/exp/xic/' + searchId + '/' + moz + '?tolerance=10.0&rtTolerance=10.0';
        return httpProxy.get(uri);
      };

      var ms2Info = scope.item.ms2Info;

      // we have to remove all existing SVG elements
      //for(var i=0; i<elm.children().length; i++){
      //  elm.children()[i].remove();
      //}

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


