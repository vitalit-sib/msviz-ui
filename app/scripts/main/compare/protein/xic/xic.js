'use strict';
angular.module('xic', ['thirdparties', 'environment', 'xic-services'])

/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
.directive('xicFishtones', function (pviz, xicFishtonesView, _, httpProxy, $q) {

    var link = function (scope, elm) {

      var updateXics = function(xics){
        var view = xicFishtonesView(elm, xics, scope.searchIds);
        return view;
      }

      var getXic = function(searchId, moz){
        var uri = '/exp/xic/' + searchId + '/' + moz; // + '?tolerance=0.001';
        return httpProxy.get(uri);
      }

      scope.$on('show-xic-broadcast', function (undefined, ms2Info) {

        // we have to remove all existing SVG elements
        for(var i=0; i<elm.children().length; i++){
          elm.children()[i].remove();
        }

        if (ms2Info) {
          var backendCalls = [];

          scope.searchIds.forEach(function(searchId) {
            backendCalls.push(getXic(searchId, ms2Info.precMoz));
          });

          $q.all(
            backendCalls
          ).then(function(args){
              updateXics(args);
            })
        }

      });

      // create an empty xic on startup
      // updateXic([],[]);

    };

  return {
    link: link,
    restrict: 'A'
  };
})


