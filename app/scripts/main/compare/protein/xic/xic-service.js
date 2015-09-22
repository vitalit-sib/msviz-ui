'use strict';
angular.module('xic-services', ['thirdparties', 'environment', 'fishtones-wrapper'])


.factory('xicFishtonesView', function (fishtones) {

    var xicFishtonesView = function(elm, xics, searchIds) {
      var _this = this;

      // create an unused injection object
      var injection = new fishtones.wet.Injection();

      //XIC will be added to the collection, triggering an automatic render event
      var xicCol = new fishtones.wet.XICCollection();

      // group by name
      var groupFunction = function(xic){
        return xic.attributes.name;
      }

      var view = new fishtones.wet.XICMultiPaneView({
        model: xicCol,
        el: elm,
        groupBy: groupFunction
      });

      for(var i=0; i<xics.length; i++){
        var xicData = xics[i];

        var xic = new fishtones.wet.XIC();

        xic.set({'retentionTimes': xicData.rt});
        xic.set({'intensities': xicData.intensities});
        xic.set({'injection': injection});
        xic.set({'name': searchIds[i]});

        xicCol.add(xic);
      }

      return _this;
    }

    return xicFishtonesView;
})

