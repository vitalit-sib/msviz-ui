'use strict';
angular.module('xic', ['thirdparties', 'environment', 'fishtones-wrapper', 'experimental', 'psm-service', 'matches-protein', 'table-expand-service'])

  .controller('XicController', function(){
    // we need this controller to store the mouse coordinates
  })

/**
 * @ngdoc directive
 * @name matches.directive:xicPopover
 * @description the popover when moving over the precursors in the XIC
 */
  .directive('xicPopover', function () {

    function link(scope){
      var elId = '#xicPopover-' + scope.myId;

      angular.element(elId).popover();

      scope.$on('show-prec-info', function (undefined, args) {
        scope.popoverPsm = args;

        scope.$apply();
        angular.element(elId).show();

        // get the current mouse position
        var x = scope.$parent.coordinates[0];
        var y = scope.$parent.coordinates[1];
        angular.element(elId).css('left', (x - 280) + 'px');
        angular.element(elId).css('top', (y - 20) + 'px');
      });

      scope.$on('hide-prec-info', function (undefined) {
        angular.element(elId).hide();
      });
    }

    return {
      restrict: 'E',
      templateUrl: 'scripts/main/compare/protein/xic/xic-popover.html',
      scope:{myId: '@myId'},
      link: link
    };
  })

/**
 * @ngdoc directive
 * @name matches.directive:xicTable
 * @description the table showing the xic values after quantitation
 */
  .directive('xicTable', function (TableExpandedService) {

    var link = function(scope) {

      // set default for tableExpanded
      scope.tableExpanded = false;

      // we set the isExpanded from the conflict table (in psms.js)
      var setIsExpanded = function(isExpanded){
        scope.tableExpanded = isExpanded;
      };

      TableExpandedService.notifyOnChange(scope.item.id, setIsExpanded);
    };

    return {
      templateUrl: 'scripts/main/compare/protein/basket/xic-table.html',
      restrict: 'E',
      scope: false,
      link: link
    };
  })

/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
.directive('xicFishtones', function (pviz, _, httpProxy, $q, fishtones, fishtonifyService, spectrumService, psmService, psmConvertionService) {

    var link = function (scope, elm) {

      var updateXics = function (xics, retentionTime, searchId, charge) {

        // the new id should be the one just added
        var newId = _.find(scope.$parent.selectedItems, function (x) {
          return x.id === id;
        }).id;

        // and we pass the id to the view
        var view = xicFishtonesView(elm, xics, scope.searchIds, retentionTime, searchId, newId, scope, charge);

        scope.xicModel = view.model;

        // we don't care about the XIC zoom when in the spectra zoom view
        if(scope.$parent.selectedItems){
          var selItems = _.findWhere(scope.$parent.selectedItems, {id: view.localId});
          selItems.xicView = view;
        }

        scope.xicModel.on('change', function () {

          var xicPeaks = _.map(scope.xicModel.models, function (m) {

            if (m.get('selected')) {
              return {
                searchId: m.get('name'),
                rt: (m.get('selected')[0] / 60).toFixed(2),
                int: (m.get('selected')[1]).toExponential(2)
              };
            } else {
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

      var xicFishtonesView = function (elm, xics, searchIds, selRetentionTime, selSearchId, localId, scope, selCharge) {
        //localId ++;
        var myLocalId = localId;

        // create an unused injection object
        var injection = new fishtones.wet.Injection();

        //XIC will be added to the collection, triggering an automatic render event
        var xicCol = new fishtones.wet.XICCollection();

        // group by name
        var groupFunction = function (xic) {
          return xic.attributes.name;
        };

        var view = new fishtones.wet.XICMultiPaneView({
          // we have to store the mouse position in the parent scope, for that the xicPopover can access it
          mousemoveCallback: function (coordinates) {
            scope.$parent.coordinates = coordinates;
          },
          model: xicCol,
          el: elm,
          groupBy: groupFunction,
          orderBy: searchIds
        });

        //these two lines just to fool out jshint
        var _yo = view.yo;
        _yo++;

        // create a PrecursorPeak from the ms2Info
        var createPrecursorPeak = function (ms2Info) {
          // create info to show in popover
          var precInfo = ms2Info.precursor;

          var popoverTitle = 'scan: ' +
            ms2Info.scanNumber +
            ' (' + (precInfo.retentionTime / 60).toFixed(1) + 'min) ';

          var popoverPsm = {title:''};

          var chargeStr = ' (' + precInfo.charge + '+' + ')';

          // create the PSM info if available
          if(ms2Info.psm){
            // take moz from matchInfo if available
            var moz = ms2Info.psm.matchInfo.correctedMoz ? ms2Info.psm.matchInfo.correctedMoz : precInfo.moz;
            popoverTitle += 'm/z: ' + moz.toFixed(4) + chargeStr;

            var rs = fishtonifyService.buildRichSeq(ms2Info.psm);
            ms2Info.psm.fishTones = rs;
            popoverPsm.prevAA = (_.first(ms2Info.psm.proteinList)).previousAA.toString();
            popoverPsm.nxtAA= (_.first(ms2Info.psm.proteinList)).nextAA.toString();
            popoverPsm.richSeq = rs.richSeq.toString();
            popoverPsm.mainScore = ms2Info.psm.matchInfo.score.mainScore;
            popoverPsm.isRejected = ms2Info.psm.matchInfo.isRejected;
            popoverPsm.localisationScore = psmConvertionService.posScoreFromMatchInfo(ms2Info.psm.matchInfo, 1);
            //We add the whole list for the correspondent protein
            var acList = _.map(ms2Info.psm.proteinList, function(x) {return x.proteinRef.AC;});
            popoverPsm.AC = acList.join() ;

            //Add massDiff to title
            var ppmDiff = psmService.convertToPpm(ms2Info.psm.pep.molMass, ms2Info.psm.matchInfo.massDiff, ms2Info.psm.matchInfo.chargeState, ms2Info.psm.matchInfo.massDiffUnit);
            popoverTitle= popoverTitle + ' massDiff: ' + ppmDiff.toFixed(2) + ' ppm';
          }else{
            popoverTitle += 'm/z: ' + precInfo.moz.toFixed(4) + chargeStr;
          }

          popoverPsm.title =popoverTitle;

          return new fishtones.match.PrecursorPeak({
            retentionTime: ms2Info.precursor.retentionTime,
            isSource: (ms2Info.precursor.retentionTime === selRetentionTime) ? (true) : (false),
            sameChargeAsSource: (ms2Info.precursor.charge === selCharge) ? (true) : (false),
            isIdentified: (popoverPsm.richSeq) ? (true) : (false),
            onclickCallback: function() {
              // create object to send to basket
                spectrumService.findSpByRunIdAndId(ms2Info.spectrumId.runId, ms2Info.spectrumId.id).then(function (spectrum) {
                  // we take the moz from the PSM if available
                  var moz = (ms2Info.psm && ms2Info.psm.matchInfo.correctedMoz) ? ms2Info.psm.matchInfo.correctedMoz : spectrum.ref.precursor.moz;
                  var sp = fishtonifyService.convertSpectrum(spectrum, moz);

                  // if there is no psm available, it will be of type 'sp'
                  if(ms2Info.psm){
                    ms2Info.psm.fishTones.spectrum = sp;
                    ms2Info.psm.matchInfo.posScore = psmConvertionService.posScoreFromMatchInfo(ms2Info.psm.matchInfo, 1);

                    ms2Info.psm.prevAA = (_.first(ms2Info.psm.proteinList)).previousAA.toString();
                    ms2Info.psm.nxtAA= (_.first(ms2Info.psm.proteinList)).nextAA.toString();

                    ms2Info.psm.ppmDiff = psmService.convertToPpm(ms2Info.psm.pep.molMass, ms2Info.psm.matchInfo.massDiff, ms2Info.psm.matchInfo.chargeState, ms2Info.psm.matchInfo.massDiffUnit);

                    scope.$emit('basket-add', {type: 'psm', bean: ms2Info.psm});
                  } else {
                    var onlySp = spectrum.ref;
                    onlySp.spectrum = sp;
                    scope.$emit('basket-add', {type: 'sp', bean: onlySp});
                  }

                  // tell pviz that a new psm was selected
                  var spectrumId = {id: spectrum.ref.spectrumId.id};
                  scope.$emit('psm-selected', {searchId: spectrum.ref.spectrumId.runId, spectrumId: spectrumId});
                });
            },
            mouseoutCallback: function () {
              scope.$broadcast('hide-prec-info', null);
            },
            mouseoverCallback: function () {
              scope.$broadcast('show-prec-info', popoverPsm);
            }
          });
        };

          // the ms1 and ms2 infos come in pairs
          for (var i = 0; i < xics.length; i++) {
            var xicMs1Data = xics[i];
            var ms2Data = xicMs1Data.ms2;

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
            if (searchIds[i] === selSearchId) {
              xic.set({'selectedRt': selRetentionTime});
            }

            xicCol.add(xic);
          }

          view.localId = myLocalId;

          return view;
        };


      /**
       *
       * Services to make calls to the backend
       *
       **/

      // get the MS1 peaks
      var getXic = function (searchId, moz, xicTolerance) {
        var uri = '/exp/xic/' + searchId + '/' + moz + '?tolerance=' + xicTolerance + '&rtTolerance=10.0';
        return httpProxy.get(uri);
      };

      // and get the MS2 spectra
      var getMs2 = function (searchId, moz, charge, xicTolerance) {
        var massUri = (charge) ? ('by-mass/' + moz + '/' + charge) : (moz);
        var uri = '/exp/spectra-ref/' + searchId + '/' + massUri + '?tolerance=' + xicTolerance;
        return httpProxy.get(uri);
      };

      // and get the match information
      var getPSM = function (searchId, spectrumId) {
        var uri = '/match/psms/' + searchId + '/by-spectrum/' + spectrumId;
        return httpProxy.get(uri);
      };

      /**
       *
       * Create the xic object
       *
       **/

      /**
       * create Xics for the given searchIds
        * @param searchIds
       */
      var createXics = function (searchIds) {

        // add backendCalls for xic and MS2 to a list
        var xicBackendCalls = [];
        var ms2BackendCalls = [];

        searchIds.forEach(function (searchId) {
          xicBackendCalls.push(getXic(searchId, ms2Info.precMoz, ms2Info.xicTolerance));
          ms2BackendCalls.push(getMs2(searchId, ms2Info.precMoz, ms2Info.precCharge, ms2Info.xicTolerance));

        });

        // get XIC and MS2 info
        $q.all(
          xicBackendCalls.concat(ms2BackendCalls)
        ).then(function(xicAndMs2) {
            var merged = mergeXicAndMs2(xicAndMs2);
            addPsm(merged);
          });

      };

      /**
       * merge xic and ms2 lists into a list of xic objects
       * @param xicAndMs2
       * @returns {Array}
       */
      var mergeXicAndMs2 = function(xicAndMs2){
        // only the second half of the data is Ms2
        var ms2Idx = xicAndMs2.length / 2;
        var xics = xicAndMs2.slice(0, ms2Idx);
        var ms2s = xicAndMs2.slice(ms2Idx);

        var merged = [];

        for(var i=0; i < xics.length; i++){
          merged[i] = xics[i];
          merged[i].ms2 = ms2s[i];
        }

        return merged;
      };

      /**
       * add the PSM to the xics
       * @param xicAndMs2
       */
      var addPsm = function(xicAndMs2){
        var psmBackendCalls = [];

        // add backend calls for psm
        for(var i=0; i < xicAndMs2.length; i++){
          var ms2List = xicAndMs2[i].ms2;
          for(var k=0; k < ms2List.length; k++){
            var ms2 = ms2List[k];
            psmBackendCalls.push(getPSM(ms2.spectrumId.runId, ms2.spectrumId.id));
          }
        }

        // get psms
        $q.all(
          psmBackendCalls
        ).then(function(psms) {
            var xicAndPsm = mergeXicAndPsm(xicAndMs2, psms);
            updateXics(xicAndPsm, ms2Info.retentionTime, ms2Info.searchId, ms2Info.precCharge, ms2Info.scanNr, id);
        });

      };

      /**
       * merge the PSM into the MS2 infos
       * @param xicAndMs2
       * @param psms
       * @returns {*}
       */
      var mergeXicAndPsm = function(xicAndMs2, psms){
        // psm index
        var idx = 0;

        // loop over xic
        for(var i=0; i < xicAndMs2.length; i++){
          var xic = xicAndMs2[i];
          // loop over ms2
          for(var k=0; k < xic.ms2.length; k++){
            var psm = psms[idx];
            // keep only the first ranking psm
            var bestPsm = _.filter(psm, function(x) { return x.matchInfo.rank === 1; });
            xicAndMs2[i].ms2[k].psm = bestPsm[0];

            idx++;
          }
        }
        return xicAndMs2;
      };

      /**
       * Start the XIC creation
       *
       */
      var ms2Info = scope.item.ms2Info;
      var id = scope.item.id;
      createXics(scope.searchIds);

    };

  return {
    link: link,
    restrict: 'A'
  };

});






