'use strict';


angular
  .module('msvizUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'thirdparties',
    'environment',
    'fishtones-wrapper',
    'matches-psms',
    'matches-basket',
    'matches-psms-list',
    'matches-protein',
    'searches-list',
    'matches-modif-filter',
    'multi-searches',
    'psms-alignment',
    'spectrum-tab',
    'sequences',
    'experimental',
    'xic',
    'results-services',
    'results-controller',
    'databases-services',
    'databases-controller',
    'uploads-controller',
    'as.sortable',
    'svg-export'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/searches'
      })
      .when('/searches', {
        templateUrl: 'scripts/main/searches/searches-list.html',
        controller: 'SearchListCtrl'
      })
      .when('/results', {
        templateUrl: 'scripts/main/results/results-list.html',
        controller: 'ResultsCtrl'
      })
      .when('/databases', {
        templateUrl: 'scripts/main/databases/databases.html',
        controller: 'DatabasesCtrl'
      })
      .when('/uploads', {
        templateUrl: 'scripts/main/uploads/uploads.html',
        controller: 'UploadsCtrl'
      })
      .when('/result/:searchId', {
        templateUrl: 'scripts/main/results/result.html',
        controller: 'OneResultCtrl'
      })
      .when('/proteins/:searchId', {
        templateUrl: 'scripts/main/searches/proteinsID-list.html',
        controller: 'ProteinIDsListCtrl'
      })
      .when('/compare/:searchIds', {
        templateUrl: 'scripts/main/compare/searches/multi-searches.html',
        controller: 'MultiSearchListCtrl'
      })
     .when('/compare/:searchIds/protein/:proteinAC', {
        templateUrl: 'scripts/main/compare/protein/compare-protein.html',
        controller: 'PsmsAlignmentCtrl'
      })
      .when('/details/:searchIds/protein/:proteinAC/spectrumId/:spectrumId/runId/:runId', {
        templateUrl: 'scripts/main/details/spectrum-tab.html',
        controller: 'DetailsTabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
