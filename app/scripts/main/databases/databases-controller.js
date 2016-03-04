'use strict';
angular.module('databases-controller', ['thirdparties', 'environment','ngFileUpload'])

  .controller('DatabasesCtrl', function($scope, databasesService,Upload,$timeout) {
    databasesService.listFasta().then(function (data) {
      $scope.databasesList = data;
    });

    //add method
    $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
          Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
              files: files
            }
          }).then(function (response) {
            $timeout(function () {
              $scope.result = response.data;
            });
          }, function (response) {
            if (response.status > 0) {
              $scope.errorMsg = response.status + ': ' + response.data;
            }
          }, function (evt) {
            $scope.progress =
              Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      console.log("add into mongo databases")
      $scope.files.forEach(function(fasta) {
        var fastaName= fasta.name.substr(0, fasta.name.indexOf('.'));
        databasesService.addFasta(fastaName)
      })

      databasesService.listFasta().then(function (data) {
        $scope.databasesList = data;
      });

      };

    /**
     * delete the selected searchIds
     */
    $scope.deleteEntry = function(sourceId){

        databasesService.deleteFasta(sourceId).then(function () {
          // reload the list when entries were deleted
         console.log("clean time")
          databasesService.listFasta().then(function (data) {
            $scope.databasesList = data;
          });
        });

    };


  })

