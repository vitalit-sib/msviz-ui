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

    //UPLOAD THE FILES.
      $scope.uploadFiles = function () {
        if (($scope.databasesList.indexOf(filesData.name) < 0)){

          console.log("no existe" + filesData.name)
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
        else {
          console.log("yaaa existe" + filesData.name)
          $scope.databaseFound=filesData.name
          $scope.$apply();
        }
    }

  });

