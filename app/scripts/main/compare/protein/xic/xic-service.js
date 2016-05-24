'use strict';
angular.module('xic-services', ['thirdparties', 'environment', 'fishtones-wrapper'])


.factory('xicFishtonesView', function (fishtones) {

    //var localId = -1;

    var xicFishtonesView = function(elm, xics, searchIds, selRetentionTime, selSearchId, localId) {
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

      for(var i=0; i<xics.length; i++){
        var xicData = xics[i];

        var xic = new fishtones.wet.XIC();

        xic.set({'retentionTimes': xicData.rt});
        xic.set({'intensities': xicData.intensities});
        xic.set({'injection': injection});
        xic.set({'name': searchIds[i]});
        xic.set({'target': 0});

        // add retention time only if it was selected by this searchId
        if(searchIds[i] === selSearchId) {
          xic.set({'selectedRt': selRetentionTime});
        }

        xicCol.add(xic);
      }

      view.localId = myLocalId;

      return view;
    };

    return xicFishtonesView;
});

