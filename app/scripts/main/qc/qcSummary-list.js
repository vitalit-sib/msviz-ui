'use strict';
angular.module('qcSummary-list', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name matches.service:searchService
 * @description
 * Access to Searches
 *
 */
  .service('qcSummaryService', function (httpProxy) {
    var QcSummaryService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:searchService#findAllSearchIds
     * @methodOf matches.service:searchService
     * @description get the list of all searchIds
     * @returns {httpPromise} of an array of string
     */
    QcSummaryService.prototype.list = function () {
      return httpProxy.get('/qc/summary');
    };

    return new QcSummaryService();
  })

  .controller('QcSummaryListCtrl', function($scope, qcSummaryService){
    qcSummaryService.list().then(function(data){
      $scope.summaries=data;
    });

    $scope.entries= [];
    $scope.selectedEntries = [];

    $scope.addId = function($index){
      $scope.entries.push($index);
    };
    $scope.updateId= function($index){
      var i=$scope.selectedEntries.indexOf($index);
      if(i> -1){
        $scope.selectedEntries.splice(i,1);
      }
      else{
        $scope.selectedEntries.push($index);
      }
    };

    $scope.checkAll = function () {
      $scope.summaries.forEach(function (summary) {
        summary.Selected = true;
        //set true
        console.log(summary);
        //$scope.selected[item].checked = true ;
        ////add to selected
        //$scope.selectedEntries.push(item);
      });
    };


});

