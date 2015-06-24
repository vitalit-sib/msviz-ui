'use strict';
angular.module('matches-search', ['thirdparties', 'environment'])
/**
 * @ngdoc object
 * @name matches.object:SearchSet
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
     * @name matches.object:SearchSet#add
     * @methodOf matches.object:SearchSet
     * @description add one or multiple searchId to the list
     * @param {string|Array} searches one or a list of searches
     * @returns {SearchSet} this
     */
    SearchSet.prototype.add = function (searches) {
      var _this = this;

      if (_.isArray(searches)) {
        _.each(searches, function (i) {
          _this.add(i);
        });
        return _this;
      }

      _this._list[searches.searchId] = searches;

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:SearchSet#clear
     * @methodOf matches.object:SearchSet
     * @description clear all element
     * @returns {SearchSet} this
     */
    SearchSet.prototype.clear = function () {
      var _this = this;
      _.each(_this.listIds(), function (id) {
        delete _this._list[id];
      });
      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:SearchSet#remove
     * @methodOf matches.object:SearchSet
     * @description remove on element
     * @param {Object} search the element to be removed
     * @returns {SearchSet} this
     */
    SearchSet.prototype.remove = function (search) {
      var _this = this;
      delete _this._list[search.searchId];
      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:SearchSet#list
     * @methodOf matches.object:SearchSet
     * @description get the unique list of search ids
     * @returns {Array} an array of string
     */
    SearchSet.prototype.list = function () {
      return _.values(this._list);
    };

    /**
     * @ngdoc method
     * @name matches.object:SearchSet#listIds
     * @methodOf matches.object:SearchSet
     * @description return a sorted list of searchIds
     * @param {String} joinWith if present returns a string by joining the ids with the passed value. If not present, return a array of ids.
     * @returns {Array|String} an array of ids or a string
     */
    SearchSet.prototype.listIds = function (joinWith) {
      var ids = _.keys(this._list).sort();
      return joinWith ? ids.join(joinWith) : ids;
    };

    /**
     * @ngdoc method
     * @name matches.object:SearchSet#size
     * @methodOf matches.object:SearchSet
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
  .controller('SearchListCtrl', function($scope, searchService){
    searchService.list().then(function(data){
      $scope.searches=data;
    })

    $scope.displayProteins= function(searchId){
      proteinMatchesRefService.list().then(function(data){
        $scope.proteinIDs=data;
      })
    }
  })
;
