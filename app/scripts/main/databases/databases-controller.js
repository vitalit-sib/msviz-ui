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

  .controller('DatabasesCtrl', function ($scope, databasesService, $http, EnvConfig) {

    // hide progress bar at the beginning
    $scope.hideProgressBar = true;

    // set the default values for parsing rules
    $scope.parsingRule = {activated: false, value: undefined, style: {color: 'lightgrey'} };

    $scope.parsingRuleSelected = undefined;

    $scope.parsingRuleDefaults = [
      {name: 'SwissProt_ID', regexp: '>..\\|[^|]*\\|([^ ]*)'},
      {name: 'SwissProt_AC', regexp: '>..\\|([^|]*)'},
      {name: 'Trembl', regexp: '>..\\|[^|]*\\|([^ ]*)'},
      {name: 'custom', regexp: '>([^ ]*)'}
      ];

    // make the label grey if it is not activated
    $scope.changeParsingRuleStyle = function() {
      $scope.parsingRule.style.color = ($scope.parsingRule.activated) ? 'black' : 'lightgrey';
    };

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
        $scope.databaseUploadError = false;

        $scope.hideProgressBar = false;

        //Check first if the database was already inserted
        if (($scope.databasesList === undefined) || ($scope.databasesList.indexOf(filesData.name) < 0)){

          // add the regexp if provided
          var parsingRegexp = ($scope.parsingRule.activated) ?  '?regexp=' + $scope.parsingRuleSelected : '';

          var request = {
            method: 'POST',
            url: EnvConfig.backendUrl + '/sequences/' + filesData.name + '/fasta' + parsingRegexp,
            data: filesData,
            headers: {
              'Content-Type': undefined
            }
          };

          // SEND THE FILES.
          $http(request)
            .success(function () {
              $scope.hideProgressBar = true;
              $scope.databaseUploaded = filesData.name;

              // reload the database
              databasesService.listFasta().then(function (data) {
                $scope.databasesList = data;
              });
            })
            .error(function () {
              $scope.hideProgressBar = true;
              $scope.databaseUploaded = false;
              $scope.databaseUploadError = true;

              // reload the database
              databasesService.listFasta().then(function (data) {
                $scope.databasesList = data;
              });
            });
        }
        else {
          $scope.databaseFound=filesData.name;
          $scope.$apply();
        }
    };

  });

