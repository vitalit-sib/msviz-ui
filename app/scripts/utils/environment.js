'use strict';
angular.module('environment', ['angularytics'])
/**
 * @ngdoc function
 * @name environment.service:EnvConfig
 * @description
 * # EnvConfig
 * configure handler with backendUrl pointer. For the moment, the url is either set to localhost or swissqt depending on the current page location
 */
  .config(function (AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  })
  .service('EnvConfig', function ($location, Angularytics) {
    if ($location.$$port === 80) {
      return {
        isProd: true,
        backendUrl: 'http://msviz.vital-it.ch/backend'
      };
    } else if ($location.$$port === 443){
      return {
        isProd: true,
        backendUrl: 'https://msviz.vital-it.ch/backend'
      };
    } else{
      return {
        isProd: false,
        backendUrl: 'http://localhost:9000'
      };
    }

      Angularytics.init();
  })
/**
 * @ngdoc service
 * @name environment.service:httpProxy
 * @description wrap common call (GET ...) to the backend , prefixing backendUrl and getting data out of response
 */
  .service('httpProxy', function($http, EnvConfig){
      var HttpProxy = function(){
        return this;
      };
    /**
     * @ngdoc method
     * @name environment.service:httpProxy#get
     * @methodOf environment.service:httpProxy
     * @description wrap GET call
     * @param {String} uri the absolute uri to pass to the backend
     * @param {Object} opts options to pass to $http.get
     * @return {httpPromise} of the returned response.data
     */

    HttpProxy.prototype.get = function(uri, opts){
      return $http.get(EnvConfig.backendUrl+uri, opts)
        .then(function(resp){
          return resp.data;
        });
    };

    HttpProxy.prototype.delete = function(uri, data, opts){
      return $http.delete(EnvConfig.backendUrl+uri, data, opts)
        .then(function(resp){
          return resp;
        });
    };

    HttpProxy.prototype.post = function(uri, data, opts){
      return $http.post(EnvConfig.backendUrl+uri, data, opts)
        .then(function(resp){
          return resp;
        });
    };


    HttpProxy.prototype.put = function(uri, data, opts){
      return $http.put(EnvConfig.backendUrl+uri, data, opts)
        .then(function(resp){
          return resp;
        });
    };

    return new HttpProxy();
  })

  .directive('swaggerDoc', function (EnvConfig) {
    return {
      restrict: 'EA',
      template: '<a href="' + EnvConfig.backendUrl + '/docs/index.html">backend REST doc</a>'
    };
  })
;
