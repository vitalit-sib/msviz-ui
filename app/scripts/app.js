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
      .when('/wewe', {
        templateUrl: 'views/matches/searches/proteinsID-list.html',
        controller: 'ProteinIDsListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
