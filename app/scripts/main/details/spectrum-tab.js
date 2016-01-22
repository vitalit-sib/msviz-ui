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
       addSelectedPSM(psm[0]);
     });


      var addSelectedPSM = function(pvizPsm){
        pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);

        pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);


        //we change runId by searchId to make it compatible with MaxQuant
        //console.log("estoy buscando por esto" + $scope.runId)
        //console.log("debería buscar por " + $scope.searchId)
        spectrumService.findByRunIdAndId($scope.searchId, $scope.spectrumId).then(function (spectrum) {
          pvizPsm.fishTones.spectrum = fishtonifyService.convertSpectrum(spectrum);
          var spAttr = pvizPsm.fishTones.spectrum.attributes;
          var ms2Info = {precCharge: spAttr.precCharge, precIntensity: spAttr.precIntensity, precMoz: spAttr.precMoz, retentionTime: spAttr.retentionTime, searchId: pvizPsm.searchId};

          // info for spectrum and XIC
          var newEntry = {type:pvizPsm.type, firstPsm: pvizPsm, otherPsms: [], ms2Info: ms2Info};
          $scope.spectra.push(newEntry);
        });
      };

  });
