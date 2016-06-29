'use strict';
angular.module('uploads-controller', ['thirdparties', 'environment','ngFileUpload'])

  .directive('ngFiles', ['$parse', function ($parse) {

    function fnLink(scope, element, attrs) {
      var onChange = $parse(attrs.ngFiles);
      element.on('change', function (event) {
        onChange(scope, { $files: event.target.files });
      });
    }

    return {
      link: fnLink
    };
  } ])

  .controller('UploadsCtrl', function ($scope,$http,EnvConfig) {

    // hide progress bar at the beginning
    $scope.hideProgressBar = true;

    // default fileType
    $scope.fileType = 'mascot';

    var filesData = new FormData();
    $scope.getTheFiles = function ($files) {
      filesData=$files[0];
    };

    $scope.uploadFiles = function () {

      $scope.hideProgressBar = false;

        var request = {
          method: 'POST',
          url: EnvConfig.backendUrl + '/uploads/' + $scope.fileType,
          data: filesData,
          headers: {
            'Content-Type': undefined
          }
        };

        // SEND THE FILES.
        $http(request)
          .success(function () {
            $scope.fileUploaded='upload';
            $scope.hideProgressBar = true;
          })
          .error(function () {
            $scope.fileFailed='error';
            $scope.hideProgressBar = true;
          });
    };
});