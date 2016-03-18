'use strict';
angular.module('databases-controller', ['thirdparties', 'environment','ngFileUpload','databases-services'])

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
  })

