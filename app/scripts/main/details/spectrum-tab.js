'use strict';
angular.module('spectrum-tab', ['thirdparties', 'environment','matches-basket','psm-service'])
  .controller('DetailsTabCtrl', function ($scope, $q, _,psmService, spectrumService, fishtones, fishtonifyService, pviz, $routeParams) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    var proteinAC = acSourcePair[0];
    var runId=$routeParams.runId;
    var spectrumId=$routeParams.spectrumId;
    $scope.spectra=[];


    psmService.findAllBySearchIdAndSpectrumId(runId, spectrumId)
     .then(function (psm) {
       addSelectedPSM(psm);
      });

      var addSelectedPSM = function(pvizPsmList){

        var pvizPsm = undefined;

        // if there are no psms found
        if(pvizPsmList.length < 1){
          pvizPsm = pvizPsmList[0];
        }

        spectrumService.findSpByRunIdAndId(runId, spectrumId).then(function (spectrum) {
          var fishtonesSp = fishtonifyService.convertSpectrum(spectrum);

          var ms2Info = {
            precCharge: spectrum.ref.precursor.charge,
            precIntensity: spectrum.ref.precursor.intensity,
            precMoz: spectrum.ref.precursor.moz,
            retentionTime: spectrum.ref.precursor.intensity.retentionTime,
            searchId: runId,
            scanNr: spectrumId
          };

          // info for spectrum and XIC
          var newEntry;
          if(pvizPsm){
            pvizPsm.fishTones.spectrum = fishtonesSp;
            pvizPsm.fishTones.spectrum.richSeq = fishtonifyService.buildRichSeq(pvizPsm);
            pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

            newEntry = {type:'psm', firstPsm: pvizPsm, otherPsms: [], ms2Info: ms2Info, fishTones: {spectrum: fishtonesSp}};
          }else{
            newEntry = {type:'sp', ms2Info: ms2Info, firstPsm: {fishTones: {spectrum: fishtonesSp} } };
          }

          $scope.spectra.push(newEntry);
        });
      };

  });
