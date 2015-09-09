'use strict';
angular.module('qcSummary-list', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name service:qcSummaryService
 * @description
 * Access to qcSummary
 *
 */
  .service('QcSummaryService', function (httpProxy) {
    var QcSummaryService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:qcSummaryService#findAllBtw2Date
     * @methodOf service:qcSummaryService
     * @description get the list of all qcSummaries
     * @returns {httpPromise} of an array of string
     */

    QcSummaryService.prototype.findAllBtw2Date = function (dateFrom,dateTo) {

      return httpProxy.get('/qc/summary' + '/'+ dateFrom + '/' + dateTo );
    };

    QcSummaryService.prototype.list = function () {

      return httpProxy.get('/qc/summary' );
    };
    return new QcSummaryService();
  }


)

  .controller('QcSummaryListCtrl', function($scope, QcSummaryService,$location){

    QcSummaryService.list().then(function(data){
      $scope.summaries = data;
    });

    $scope.findQcSummary = function(dateFrom,dateTo) {

      if (dateFrom===undefined || dateFrom===''){
        QcSummaryService.list().then(function(data){
        $scope.summaries = data;
      });
      }else {

        QcSummaryService.findAllBtw2Date(dateFrom, dateTo).then(function (data) {
          $scope.summaries = data;

        });
      }
    };

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

