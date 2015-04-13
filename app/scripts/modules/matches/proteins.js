'use strict';
angular.module('matches')

/**
 * @ngdoc service
 * @name matches.service:matchesProteinRefService
 * @description
 * Access proteinIds via the matches spaces (no sequence, but the list of protein Ids etc.)
 *
 */
  .service('matchesProteinRefService', function (httpProxy) {
    var MatchesProteinRefService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:matchesProteinRefService#findBySearchId
     * @methodOf matches.service:matchesProteinRefService
     * @description get the list of protein based on a search
     * @param {String} searchId the search in which to look for protein names
     * @returns {httpPromise} of an array of protein Id
     */
    MatchesProteinRefService.prototype.findBySearchId = function (searchId) {
      return httpProxy.get('/match/proteins/' + searchId);
    };
    return new MatchesProteinRefService();
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesProteinRefSelect
 * @description select a protein among thegiven list
 */
  .directive('matchesProteinRefSelect', function () {
    var link = function (scope, elm) {
    };
    return {
      restrict: 'E',
      link: link,
      templateUrl: 'views/matches/searches/matchesProteinRefSelect.html'
    };
  })
;
