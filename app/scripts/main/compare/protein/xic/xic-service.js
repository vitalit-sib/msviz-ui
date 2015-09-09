'use strict';
angular.module('xic-services', ['thirdparties', 'environment', 'fishtones-wrapper'])


.factory('xicFishtonesView', function (fishtones) {

    var xicFishtonesView = function(elm, retentionTimes, intensities) {
      var _this = this;

      var injection = new fishtones.wet.Injection();
      var xic = new fishtones.wet.XIC();

      xic.set({'retentionTimes': retentionTimes});
      xic.set({'intensities': intensities});
      xic.set({'injection': injection});
      xic.set({'name': 'hoho'});

      var view = new fishtones.wet.XICView({
        model: xic,
        el: elm
      });

      view.xZoomable();
      view.render();

      return _this;
    }

    return xicFishtonesView;
})

  //.service('xicService', function (_, $http, EnvConfig, httpProxy) {
  //  var XicService = function () {
  //    return this;
  //  };
  //
  //  XicService.prototype.findAllMozAndSearchId = function (moz, searchId) {
  //    var _this = this;
  //    var uri = '/exp/xic/' + searchId + '/' + moz + '&tolerance=0.001';
  //    return httpProxy.get(uri);
  //  };
  //
  //  return XicService;
  //
  //})
