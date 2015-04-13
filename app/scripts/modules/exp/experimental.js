'use strict';
angular.module('experimental', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name experimental.service:spectrumService
 * @description
 * Access to MS/MS spectra
 *
 */
  .service('spectrumService', function ($http, EnvConfig, httpProxy) {
    var SprectrumService = function () {
      return this;
    };


    /**
     * @ngdoc method
     * @name experimental.service:spectrumService#findByRunIdAndId
     * @methodOf experimental.service:spectrumService
     * @description get one spectrum based on runId & id
     * @param {String} runId the run id
     * @param {string} pid the spextrum id within that run
     * @returns {httpPromise} of an ExpMSMSSpectrum
     */
    SprectrumService.prototype.findByRunIdAndId = function (runId, id) {
      return httpProxy.get('/exp/spectrum/' + runId + '/' + id);
    };


    return new SprectrumService();
  })
;
