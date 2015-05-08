'use strict';
angular.module('matches-proteins', ['thirdparties', 'environment'])

/**
 * @ngdoc service
 * @name matches.service:proteinMatchesRefService
 * @description
 * Access proteinIds via the matches spaces (no sequence, but the list of protein Ids etc.)
 *
 */
  .service('proteinMatchesRefService', function (httpProxy) {
    var ProteinMatchesRefService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:proteinMatchesRefService#findBySearchId
     * @methodOf matches.service:proteinMatchesRefService
     * @description get the list of protein based on a search
     * @param {String} searchId the search in which to look for protein names
     * @returns {httpPromise} of an array of protein Id
     */
    ProteinMatchesRefService.prototype.findBySearchId = function (searchId) {
      return httpProxy.get('/match/proteins/' + searchId);
    };
    return new ProteinMatchesRefService();
  })
;
