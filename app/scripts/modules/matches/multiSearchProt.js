'use strict';
angular.module('multi-matches-search', ['thirdparties', 'environment'])

/**
 * @ngdoc service
 * @name matches.service:searchService
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
     * @name matches.service:multiSearchService#findAllSearchIds
     * @methodOf matches.service:multiSearchService
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
  });
