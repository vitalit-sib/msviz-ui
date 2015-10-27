'use strict';
angular.module('spectrum-tab', ['thirdparties', 'environment','matches-basket','psm-service'])
  .controller('DetailsTabCtrl', function ($scope, $q, _,psmService,spectrumService,fishtones,fishtonifyService,pviz,$routeParams) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.runId=$routeParams.runId;
    $scope.spectrumId=$routeParams.spectrumId;
    $scope.spectra=[];

     psmService.findAllBySearchIdAndSpectrumId($scope.runId,$scope.spectrumId)
     .then(function (psm)
     {
       addSelectedPSM(psm[0])
     });


      var addSelectedPSM = function(pvizPsm){
        pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);

        pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

        spectrumService.findByRunIdAndId($scope.runId, $scope.spectrumId).then(function (spectrum) {
          var sp = fishtonifyService.convertSpectrum(spectrum);
          pvizPsm.fishTones.spectrum = sp;
          var sp = pvizPsm.fishTones.spectrum.attributes;
          var ms2Info = {precCharge: sp.precCharge, precIntensity: sp.precIntensity, precMoz: sp.precMoz, retentionTime: sp.retentionTime, searchId: pvizPsm.searchId};

          // info for spectrum and XIC
          var newEntry = {type:pvizPsm.type, firstPsm: pvizPsm, otherPsms: [], ms2Info: ms2Info};
          $scope.spectra.push(newEntry);
        });
      };

  });
