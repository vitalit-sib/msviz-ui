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
    'ssm',
    'sequences',
    'experimental'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/searches'
      })
      .when('/searches', {
        templateUrl: 'main/searches/searches-list.html',
        controller: 'SearchListCtrl'
      })
      .when('/proteins/:searchId', {
        templateUrl: 'main/searches/proteinsID-list.html',
        controller: 'ProteinIDsListCtrl'
      })
      .when('/compare/:searchIds', {
        templateUrl: 'main/compare/searches/multi-searches.html',
        controller: 'MultiSearchListCtrl'
      })
     .when('/compare/:searchIds/protein/:proteinAC', {
        templateUrl: 'main/compare/protein/compare-protein.html',
        controller: 'PsmsAlignmentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
