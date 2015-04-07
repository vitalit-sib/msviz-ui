'use strict';
angular.module('matches', ['thirdparties', 'environment'])
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
     * @description add a searchId to the list
     * @param {string} id the search id
     * @returns {SearchIdSet} this
     */
    SearchIdSet.prototype.add = function (id) {
      var _this = this;

      _this.list[id] = true;

      return _this;
    };

    /**
     * @ngdoc method
     * @name matches.object:searchIdSet#list
     * @methodOf matches.object:searchIdSet
     * @description get the unique list of search ids
     * @returns {array} an array of string
     */
    SearchIdSet.prototype.list = function () {
      return _.values(this._list);
    };

    return SearchIdSet;
  })
/**
 * @ngdoc service
 * @name matches.service:psmService
 * @description
 * Access to PSMS
 *
 */
  .service('psmService', function ($http, EnvConfig) {
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
      //TODO: add json header
      var uri = '/matches/psms/' + searchIds.list().join(',') + '/' + proteinId;
      return $http.get(EnvConfig.backendUrl + uri)
        .then(function (resp) {
          return resp.data;
        });
    };

    return new PSMService();
  })
;
