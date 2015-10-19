'use strict';
angular.module('xic', ['thirdparties', 'environment', 'xic-services'])

  .directive('xicFishtones', function (pviz, xicFishtonesView, _, httpProxy, $q) {
    var link = function(scope, elm){
      scope.$on("");
    }

    return {
      template: '<span>{{searchId}}</span>',
      link: link,
      restrict: 'A'
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

        scope.xicPeaks = undefined;

        scope.xicModel.on('change', function(){
          console.log('xic model changed');
          //scope.selectedXic = scope.xicModel.models;
          //console.log(scope.selectedXic);
          var xicPeaks = _.map(scope.xicModel.models, function(m){
            console.log(m);
            if(m.get('selected')){
              return {
                searchId: m.get('name'),
                rt: m.get('selected')[0]/60,
                int: (m.get('selected')[1]).toExponential()
              }
            }else{
              return undefined;
            }
          });

          scope.$emit("selected-xic-region", xicPeaks);
          console.log(xicPeaks);

//          var xic = scope.xicModel.models[0];
//          console.log(xic.get('selected')[0]);
//          if(scope.xicModel.hasChanged('selected')){
//            console.log('selected changed');
//          }
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






