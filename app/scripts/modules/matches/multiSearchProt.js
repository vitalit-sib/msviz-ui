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

  .controller('MultiSearchListCtrl', function($scope,$routeParams, multiSearchService, MultiProteinMatch) {
    $scope.searchIds = $routeParams.searchIds;
    multiSearchService.findByMultiSearchId($scope.searchIds).then(function (data) {
      $scope.proteins = new MultiProteinMatch(data);
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
      var _this= this;
      _this._multiProteinMatch = mpm;

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
      return Object.keys(this._multiProteinMatch);
    };

    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getProteinIdents
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description get proteinIdents for a given AC and a list of SearchIds
     * @return {Array} list of ProteinIdents
     */
    MultiProteinMatch.prototype.getProteinIdents = function (proteinAC, searchIds) {
      var searchProtIdents = this._multiProteinMatch[proteinAC];
      var protIdents = [];

      searchIds.forEach(function(searchId){
        if(searchProtIdents[searchId]){
          protIdents.push(searchProtIdents[searchId]);
        }else{
          protIdents.push(null);
        }
      });

      return protIdents;
    };


    return MultiProteinMatch;
  })
;
