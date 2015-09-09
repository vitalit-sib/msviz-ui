'use strict';
angular.module('xic', ['thirdparties', 'environment', 'xic-services'])

/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
.directive('xicFishtones', function (pviz, xicFishtonesView, _, httpProxy) {

    var link = function (scope, elm) {

      var updateXic = function(retentionTime, intensities){
        var view = xicFishtonesView(elm, retentionTime, intensities);
        return view;
      }

      var getXic = function(searchId, moz){
        var uri = '/exp/xic/' + searchId + '/' + moz; // + '?tolerance=0.001';
        console.log('get ' + uri);
        return httpProxy.get(uri);
      }

      scope.$on('show-xic-broadcast', function (undefined, ms2Info) {

        // we have to remove all existing SVG elements
        for(var i=0; i<elm.children().length; i++){
          elm.children()[i].remove();
        }

        console.log(ms2Info);

        if (ms2Info) {
          getXic('hoho', ms2Info.precMoz).then(function(xic){
            console.log(xic);
            updateXic(xic.rt,xic.intensities)
          });
        }

      });

      // create an empty xic on startup
      updateXic([],[]);

    };

  return {
    link: link,
    restrict: 'A'
  };
})


