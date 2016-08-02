'use strict';
angular.module('experimental', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name experimental.service:spectrumService
 * @description
 * Access to MS/MS basket
 *
 */
  .service('spectrumService', function ($http, EnvConfig, httpProxy) {
    var SprectrumService = function () {
      return this;
    };


    /**
     * @ngdoc method
     * @name experimental.service:spectrumService#findSpByRunIdAndId
     * @methodOf experimental.service:spectrumService
     * @description get one spectrum based on runId & id
     * @param {String} runId the run id
     * @param {string} pid the spextrum id within that run
     * @returns {httpPromise} of an ExpMSMSSpectrum
     */
    SprectrumService.prototype.findSpByRunIdAndId = function (searchId, id) {
      return httpProxy.get('/exp/spectrum/' + searchId + '/' + id+'?sortByMoz=true&mostIntense=200');
    };

    /**
     * @ngdoc method
     * @name experimental.service:spectrumService#findSpRefByRunIdAndId
     * @methodOf experimental.service:spectrumService
     * @description get one spectrum reference based on runId & id
     * @param {String} runId the run id
     * @param {string} pid the spextrum id within that run
     * @returns {httpPromise} of an ExpMSMSSpectrum
     */
    SprectrumService.prototype.findSpRefByRunIdAndId = function (searchId, id) {
      return httpProxy.get('/exp/spectrum-ref/' + searchId + '/' + id);
    };


    return new SprectrumService();
  })
;
