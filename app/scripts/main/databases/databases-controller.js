'use strict';
angular.module('databases-controller', ['thirdparties', 'environment','ngFileUpload','databases-services'])

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
  .controller('DatabasesCtrl', function ($scope,databasesService,$http,EnvConfig) {

    // hide progress bar at the beginning
    $scope.hideProgressBar = true;

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
    };

    var filesData = new FormData();
    $scope.getTheFiles = function ($files) {
      filesData=$files[0];
    };

    //UPLOAD THE FILES.
      $scope.uploadFiles = function () {
        $scope.hideProgressBar = false;

        //Check first if the database was already inserted
        if (($scope.databasesList === undefined) || ($scope.databasesList.indexOf(filesData.name) < 0)){
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
          .success(function () {
            location.reload();
          })
          .error(function () {
          });
      }
        else {
          $scope.databaseFound=filesData.name;
          $scope.$apply();
        }
    };

  });

