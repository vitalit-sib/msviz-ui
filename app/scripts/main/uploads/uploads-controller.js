'use strict';
angular.module('uploads-controller', ['thirdparties', 'environment','ngFileUpload'])

.controller('UploadsCtrl', function ($scope,$http,EnvConfig) {

    var filesData = new FormData();
    $scope.getTheFiles = function ($files) {
      filesData=$files[0];
    };

    $scope.uploadFiles = function () {

        var request = {
          method: 'POST',
          url: EnvConfig.backendUrl + '/uploads/',
          data: filesData,
          headers: {
            'Content-Type': undefined
          }
        };

        // SEND THE FILES.
        $http(request)
          .success(function () {
            location.reload();
          })
          .error(function () {
          });
    };
});
