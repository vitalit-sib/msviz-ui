'use strict';

/* Controllers */
 google.load('visualization', '1', {
  packages: ['corechart']
});

 google.setOnLoadCallback(function () {
  //angular.bootstrap(document.body, ['qcSummary-chart']);
});

angular.module('qcSummary-chart', ['thirdparties', 'environment'])

  .controller('QcSummaryChartCtrl', function($scope,$routeParams) {
    $scope.chartId = $routeParams.chartId;
    console.log('chartId'+ $scope.chartId);

      var data = google.visualization.arrayToDataTable([
        ['Month', 'val1', 'val2', 'val3','Average'],
        ['150507',  165,      938,         522,      541.6],
        ['150520',  135,      1120,        ,      627],
        ['150525',  200,  ,, 200]
      ]);

      var options = {
        title : 'Monthly Coffee Production by Country',
        vAxis: {title: $scope.chartId},
        hAxis: {title: 'Dates'},
        seriesType: 'scatter',
        series: {3: {type: 'line'}}
      };


      var chart = new google.visualization.ComboChart(document.getElementById('chartdiv'));
      chart.draw(data, options);



  });
