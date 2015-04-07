'use strict';
angular.module('matches')
/**
 * @ngdoc service
 * @name matches.service:psmService
 * @description
 * Access to PSMS
 *
 */
  .service('psmService', function ($http, EnvConfig, httpProxy) {
    var PSMService = function () {
      return this;
    };


    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllBySearchIdsAndProteinId
     * @methodOf matches.service:psmService
     * @description get the list of PSMS for one protein on a list of searchId
     * @param {SearchIdSet} searchIds the protein list
     * @param {string} proteinId the protein Id
     * @returns {httpPromise} of a list of PSMs
     */
    PSMService.prototype.findAllBySearchIdsAndProteinId = function (searchIds, proteinId) {
      return httpProxy.get('/matches/psms/' + searchIds.list().join(',') + '/' + proteinId);
    };

    return new PSMService();
  })
;
