'use strict';
angular.module('matches')
/**
 * @ngdoc object
 * @name matches.object:searchSet
 * @description a list of search IDs. Cannot be just a list of string or could come with more details
 *
 */
  .factory('SearchSet', function (_) {
    var SearchSet = function () {
      var _this = this;
      _this._list = {};

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchSet#add
     * @methodOf matches.object:searchSet
     * @description add one or multiple searchId to the list
     * @param {string|Array} searches one or a list of searches
     * @returns {SearchSet} this
     */
    SearchSet.prototype.add = function (searches) {
      var _this = this;

      if (_.isArray(searches)){
        _.each(searches, function(i){
          _this.add(i);
        });
        return _this;
      }

      _this._list[searches.searchId] = searches;

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchSet#list
     * @methodOf matches.object:searchSet
     * @description get the unique list of search ids
     * @returns {Array} an array of string
     */
    SearchSet.prototype.list = function () {
      return _.values(this._list);
    };

    /**
     * @ngdoc method
     * @name matches.object:searchSet#listIds
     * @methodOf matches.object:searchSet
     * @description return a sorted list of searchIds
     * @param {String} mkString if present returns a string by joining the ids with the passed value. If not present, return a array of ids.
     * @returns {Array|String} an array of ids or a string
     */
    SearchSet.prototype.listIds = function (mkString) {
      var ids = _.keys(this._list).sort();
      return mkString?ids.join(mkString):ids;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchSet#size
     * @methodOf matches.object:searchSet
     * @description count the number of (unique) search Ids
     * @returns {Number} n
     */
    SearchSet.prototype.size = function () {
      return _.size(this._list);
    };


    return SearchSet;
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
      return httpProxy.get('/search');
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
