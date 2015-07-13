'use strict';
angular.module('multi-matches-search', ['thirdparties', 'environment'])

/**
 * @ngdoc service
 * @name multi-matches.service:multiSearchService
 * @description
 * Access to Searches
 *
 */
  .service('multiSearchService', function (httpProxy) {
    var MultiSearchService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#findByMultiSearchId
     * @methodOf multi-matches.service:multiSearchService
     * @description get the list of all proteins by searchIds
     * @returns {httpPromise} of an array of maps[SearchId,ProteinIdent]
     */
    MultiSearchService.prototype.findByMultiSearchId = function (searchIds) {
      return httpProxy.get('/compare/' + searchIds);
    };

    return new MultiSearchService();
  })

  .controller('MultiSearchListCtrl', function($scope,$routeParams, multiSearchService) {
    $scope.searchIds = $routeParams.searchIds;
    multiSearchService.findByMultiSearchId($scope.searchIds).then(function (data) {
      $scope.proteins = data;
    });
  })

/**
 * @ngdoc object
 * @name multi-matches.object:MultiProteinMatch
 * @description a multi-match with a protein decription and a map of SearchIds to Protein matches
 * @param {Object} protein the protein AC + Map(SearchIds -> ProteinMatches)
 *
 */
  .factory('MultiProteinMatch', function () {
    var MultiProteinMatch = function (mpm) {
      var _this = this;
      _this._data = mpm;

      return _this;
    };

    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getACs
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description the list Protein ACs
     * @return {Array} list of ProteinACs
     */
    MultiProteinMatch.prototype.getACs = function () {
      var _this = this;
      var _keys = Object.keys(_this._data);
      return _keys;
    };

    return MultiProteinMatch;
  })
;
