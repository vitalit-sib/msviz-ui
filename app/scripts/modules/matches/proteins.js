'use strict';
angular.module('matches-proteins', ['thirdparties', 'environment'])

/**
 * @ngdoc service
 * @name proteinMatches.service:proteinMatchesService
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
     * @name proteinMatches.service:proteinMatchesService#findBySearchId
     * @methodOf proteinMatches.service:proteinMatchesService
     * @description get the list of protein based on a search
     * @param {String} searchId the search in which to look for protein names
     * @returns {httpPromise} of an array of protein Id
     */
    ProteinMatchesRefService.prototype.findBySearchId = function (searchId) {
      return httpProxy.get('/match/proteins/' + searchId);
    };
    return new ProteinMatchesRefService();
  })
/**
 * @ngdoc object
 * @name proteinMatches.object:ProteinMatch
 * @description
 *
 *
 */
  .factory('ProteinMatch', function (_) {
    var ProteinMatch = function (protein, psms, opts) {
      var _this = this;
      opts = _.extend({}, opts);
      _this.protein = protein;
      _this.psms = psms;
      return _this;
    };

    return ProteinMatch;
  })
;
