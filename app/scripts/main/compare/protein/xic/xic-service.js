'use strict';
angular.module('xic-services', ['thirdparties', 'environment', 'fishtones-wrapper'])


.factory('xicFishtonesView', function (fishtones, _) {

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

      //
      var createPrecursorPeak = function(ms2Info) {
        return new fishtones.match.PrecursorPeak({
          retentionTime: ms2Info.ref.precursor.retentionTime,
          isSource: (ms2Info.ref.precursor.retentionTime === selRetentionTime) ? (true) : (false)
        });
      };


      // the ms1 and ms2 infos come in pairs
      for(var i=0; i<xics.length; i=i+2){
        var xicMs1Data = xics[i];
        console.log(xicMs1Data);
        var ms2Data = xics[i+1];
        console.log(ms2Data);

        // create the precursor information objects
        var precursors = _.map(ms2Data, createPrecursorPeak);

        console.log(precursors);

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

    return xicFishtonesView;
});

