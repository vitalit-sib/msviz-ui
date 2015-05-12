'use strict';
angular.module('ssm', ['fishtones-wrapper'])
/**
 * @ngdoc service
 * @name ssm.service:ssmService
 * @description
 * Access to Spectrum/Spectrum matches
 *
 */
  .service('ssmService', function ($http, EnvConfig, httpProxy) {
    var SSMService = function () {
      return this;
    };


    /**
     * @ngdoc method
     * @name ssm.service:ssmService#findSimilarSpectra
     * @methodOf ssm.service:ssmService
     * @description load similarSpectra
     * @param {Object} spectrumRef with runId/id
     * @returns {httpPromise} of a list of SSM
     */
    SSMService.prototype.findSimilarSpectra = function (spectrumRef) {
      return httpProxy.get('/match/sim/' + spectrumRef.runId+'/'+spectrumRef.id+'/0.3/0.2');
    };


    return new SSMService();
  })
;
