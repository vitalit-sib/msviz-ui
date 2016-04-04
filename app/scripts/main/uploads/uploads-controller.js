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

    var filesData = new FormData();
    $scope.getTheFiles = function ($files) {
      filesData=$files[0];
    };

    $scope.uploadFiles = function () {
        var fileType='maxquant';
        var request = {
          method: 'POST',
          url: EnvConfig.backendUrl + '/uploads/' + fileType,
          data: filesData,
          headers: {
            'Content-Type': undefined
          }
        };

        // SEND THE FILES.
        $http(request)
          .success(function () {
            location.reload();
            $scope.fileUploaded='upload';
          })
          .error(function () {
          });
    };
});
