'use strict';
angular.module('about-msviz', ['environment'])

  .controller('AboutCtrl', function(httpProxy, $scope) {

    $scope.frontendVersion = '1.0.8';

    httpProxy.get('/version').then(function(data){
      $scope.backendVersion = data;
    });

  });
