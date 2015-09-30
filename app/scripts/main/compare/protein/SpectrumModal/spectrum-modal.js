'use strict';
angular.module('spectrum-modal', ['thirdparties', 'environment'])


  .factory('SpectrumModal', function () { //NOSONAR
    console.log('factory');

    var SpectrumModal = function (opts) {

      console.log('modalll');
      console.log(opts);
      //$('#basicModal').modal('show');

    };
    return SpectrumModal;
  })

  .directive('spectrumModal', function (spectra) {
    console.log('modalll directive');
    console.log(spectra);
    //$('#basicModal').modal('show');

    var link = function () {
    };

    return {
      link: link,
      restrict: 'E',
      scope: {
        filter: '='
      },
      templateUrl: 'scripts/main/compare/protein/spectrumModal/spectrum-modal.html'
    };
  });
