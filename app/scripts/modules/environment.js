'use strict';
angular.module('environment', ['angularytics'])
/**
 * @ngdoc function
 * @name swissqtEnvironment.service:EnvConfig
 * @description
 * # EnvConfig
 * configure handler with backendUrl pointer. For the moment, the url is either set to localhost or swissqt depending on the current page location
 */
  .config(function (AngularyticsProvider) {
//    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  })
  .service('EnvConfig', function ($location, Angularytics) {
    var isProd = $location.$$port === 80;
    if (isProd) {
      return {
        isProd: true,
        backendUrl: 'http://msviz.vital-it.ch/backend'
      };
    } else {
      return {
        isProd: false,
        backendUrl: 'http://localhost:9000'
      };
    }

//    if (isProd) {
      Angularytics.init();
//    }
  })
  .directive('swaggerDoc', function (EnvConfig) {
    return {
      restrict: 'EA',
      template: '<a href="' + EnvConfig.backendUrl + '/docs/index.html">backend REST doc</a>'
    };
  })
;
