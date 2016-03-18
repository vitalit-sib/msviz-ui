'use strict';
angular.module('databases-controller', ['thirdparties', 'environment','ngFileUpload','databases-services'])

  .directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
      var onChange = $parse(attrs.ngFiles);
      element.on('change', function (event) {
        onChange(scope, { $files: event.target.files });
      });
    };

    return {
      link: fn_link
    }
  } ])
  .controller('DatabasesCtrl', function ($scope,databasesService,$http,EnvConfig) {


    databasesService.listFasta().then(function (data) {
      $scope.databasesList = data;
    });

    //Delete selected searchIds
    $scope.deleteEntry = function(sourceId){
      databasesService.deleteFasta(sourceId).then(function () {
        databasesService.listFasta().then(function (data) {
          $scope.databasesList = data;
        });
      });
    }


    var filesData = new FormData();
    $scope.getTheFiles = function ($files) {
      filesData=$files[0]
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {
      var request = {
        method: 'POST',
        url: EnvConfig.backendUrl + '/sequences/' + filesData.name + '/fasta',
        data: filesData,
        headers: {
          'Content-Type': undefined
        }
      };

      // SEND THE FILES.
      $http(request)
        .success(function (d) {
          location.reload();
        })
        .error(function () {
        });
    }
  });
/*
  .controller('DatabasesCtrl', function($scope, databasesService,Upload,$timeout,EnvConfig) {
    databasesService.listFasta().then(function (data) {
      $scope.databasesList = data;
    });

    //add method


    $scope.uploadFiles = function (file) {
      console.log(file)
        if (file) {
          file.upload= Upload.upload({

            url: EnvConfig.backendUrl + '/sequences/' + file[0].name + '/fasta',
            data: {
              file: file
            },
            headers: {'method':'POST', 'Content-Type': undefined}
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
          });
        }
    };
  })*/

