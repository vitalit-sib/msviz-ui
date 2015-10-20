'use strict';
angular.module('spectrum-tab', ['thirdparties', 'environment','matches-basket'])
  .controller('SpectrumTabCtrl', function ($scope, $q, _,myService) {
    console.log('new tab');
    $scope.spectra=myService.get();
    console.log($scope.spectra);
  });
