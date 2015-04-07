'use strict';

/**
 * @ngdoc overview
 * @name msvizUiApp
 * @description
 * # msvizUiApp
 *
 * Main module of the application.
 */
angular
  .module('msvizUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'matches',
    'thirparties',
    'environment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
