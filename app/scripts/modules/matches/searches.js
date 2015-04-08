'use strict';
angular.module('matches')
/**
 * @ngdoc object
 * @name matches.object:searchIdSet
 * @description a list of search IDs. Cannot be just a list of string or could come with more details
 *
 */
  .factory('SearchIdSet', function (_) {
    var SearchIdSet = function () {
      var _this = this;
      _this._list = {};

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchIdSet#add
     * @methodOf matches.object:searchIdSet
     * @description add one or multiple searchId to the list
     * @param {string|Array} id the search id
     * @returns {SearchIdSet} this
     */
    SearchIdSet.prototype.add = function (id) {
      var _this = this;

      if (_.isArray(id)){
        _.each(id, function(i){
          _this.add(i);
        });
        return _this;
      }

      _this._list[id] = true;

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchIdSet#list
     * @methodOf matches.object:searchIdSet
     * @description get the unique list of search ids
     * @returns {Array} an array of string
     */
    SearchIdSet.prototype.list = function () {
      return _.keys(this._list);
    };

    /**
     * @ngdoc method
     * @name matches.object:searchIdSet#size
     * @methodOf matches.object:searchIdSet
     * @description count the number of (unique) search Ids
     * @returns {Number} n
     */
    SearchIdSet.prototype.size = function () {
      return _.size(this._list);
    };


    return SearchIdSet;
  })
/**
 * @ngdoc service
 * @name matches.service:searchService
 * @description
 * Access to Searches
 *
 */
  .service('searchService', function (httpProxy) {
    var SearchService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:searchService#findAllSearchIds
     * @methodOf matches.service:searchService
     * @description get the list of all searchIds
     * @returns {httpPromise} of an array of string
     */
    SearchService.prototype.list = function () {
      return httpProxy.get('/match/searches');
    };

    return new SearchService();
  })
  .directive('matchesSearchSelect', function () {
    var link = function (scope, elm) {

    };
    return {
      restrict: 'E',
      link: link,
      templateUrl: 'views/matches/searches/matchesSearchSelect.html'
    };
  })
;
