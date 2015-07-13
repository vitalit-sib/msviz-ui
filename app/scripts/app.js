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
    'matches-proteins',
    'matches-search',
    'matches-search-results-filter',
    'multi-matches-search',
    'ssm',
    'sequences',
    'experimental'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/searches', {
        templateUrl: 'views/matches/searches/search-list.html',
        controller: 'SearchListCtrl'
      })
      .when('/proteins/:searchId', {
        templateUrl: 'views/matches/searches/proteinsID-list.html',
        controller: 'ProteinIDsListCtrl'
      })
      .when('/compare/:searchIds', {
        templateUrl: 'views/matches/searches/multiSearchProteins-list.html',
        controller: 'MultiSearchListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
