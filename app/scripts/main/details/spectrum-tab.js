'use strict';
angular.module('spectrum-tab', ['thirdparties', 'environment','matches-basket','psm-service','searches-list', 'matches-protein'])
  .controller('DetailsTabCtrl', function ($scope, $q, _,psmService, spectrumService, fishtones, fishtonifyService, pviz, $routeParams, searchService, psmConvertionService) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    var runId=$routeParams.runId;
    var spectrumId=$routeParams.spectrumId;
    $scope.spectra=[];


    psmService.findAllBySearchIdAndSpectrumId(runId, spectrumId)
     .then(function (psm) {
       addSelectedPSM(psm);
      });

      var addSelectedPSM = function(pvizPsmList){
        var pvizPsm;

        // if there are  psms found
        if(pvizPsmList.length >= 1){
          pvizPsm = pvizPsmList[0];
          pvizPsm = _.find(pvizPsmList, function(x){ return x.matchInfo.rank === 1; });
          pvizPsm.matchInfo.posScore = psmConvertionService.posScoreFromMatchInfo(pvizPsm.matchInfo, 1);
        }

        spectrumService.findSpByRunIdAndId(runId, spectrumId).then(function (spectrum) {
          // we take the moz from the PSM if available
          var moz = (pvizPsm && pvizPsm.matchInfo.correctedMoz) ? pvizPsm.matchInfo.correctedMoz : spectrum.ref.precursor.moz;

          var fishtonesSp = fishtonifyService.convertSpectrum(spectrum, moz);

          var ms2Info = {
            precCharge: spectrum.ref.precursor.charge,
            precIntensity: spectrum.ref.precursor.intensity,
            precMoz: moz,
            retentionTime: spectrum.ref.precursor.retentionTime,
            searchId: runId,
            scanNr: spectrumId
          };

          // info for spectrum and XIC
          var newEntry;
          if(pvizPsm){
            pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);
            pvizPsm.fishTones.spectrum = fishtonesSp;
            pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

            newEntry = {type:'psm', firstPsm: pvizPsm, otherPsms: [], ms2Info: ms2Info};
            // we store the fragment precision into the fishTones for correct peak-matching
            searchService.get(newEntry.firstPsm.searchId).then(function(res) {
              var resArr = res.fragmentTolerance.split(/\s+/);
              newEntry.firstPsm.fishTones.fragmentTolerance = resArr[0];

              switch (resArr[1].charAt(0).toLowerCase()) {
                case 'p':
                  newEntry.firstPsm.fishTones.fragmentToleranceUnit = 'ppm';
                  break;
                case 'd':
                  newEntry.firstPsm.fishTones.fragmentToleranceUnit = 'dalton';
                  break;
                default:
                  newEntry.firstPsm.fishTones.fragmentToleranceUnit = undefined;
              }

              $scope.spectra.push(newEntry);
            });

          }else{
            newEntry = {type:'sp', ms2Info: ms2Info, firstPsm: {fishTones: {spectrum: fishtonesSp} } };
            $scope.spectra.push(newEntry);
          }

        });
      };

  });
