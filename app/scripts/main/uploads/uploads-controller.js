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

    // set the default values for ms1 intensity threshold filters
    $scope.intThreshold = {activated: false, value: 10000, style: {color: 'lightgrey'} };

    // make the label grey if it is not activated
    $scope.changeIntThresholdStyle = function() {
      $scope.intThreshold.style.color = ($scope.intThreshold.activated) ? 'black' : 'lightgrey';
    };

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

        var intThresh = ($scope.intThreshold.activated) ? ($scope.intThreshold.value) : 1;

        var request = {
          method: 'POST',
          url: EnvConfig.backendUrl + '/uploads/' + $scope.fileType + '?intensityThr=' + intThresh,
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
