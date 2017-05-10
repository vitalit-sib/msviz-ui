angular.module('sequences', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name sequences.service:sequenceService
 * @description
 * Access sequence definition (from AC/source to sequence)
 *
 */.service('sequenceService', function (httpProxy, $q) {
    'use strict';

    var SequenceService = function () {
      var _this = this;
      return _this;
    };

    /**
     * @ngdoc method
     * @name sequences.service:sequenceService#get
     * @methodOf sequences.service:sequenceService
     * @description get the protein sequence
     * @returns {httpPromise} of an object
     */
    SequenceService.prototype.get = function (ac, source) {

      return httpProxy.get('/sequence/' + source + '/' + ac);
    };

    /**
     * @ngdoc method
     * @name sequences.service:sequenceService#getSource
     * @methodOf sequences.service:sequenceService
     * @description get the protein sequence
     * @returns {httpPromise} of an object
     */
    SequenceService.prototype.getSource = function (searchIds, database) {

      var httpRequests = _.map(searchIds, function(searchId){
        return httpProxy.get('/search/' + searchId);
      });

      return $q.all(httpRequests).then(function(searchInfos){

        var sourceList = _.map(searchInfos, function(s) {
          var dbList = s.database;
          return dbList.filter(function (oneInfo) {
            return oneInfo.id === database;
          });
        });

        var dbSource = _.find(sourceList, function(s){
          return s.length > 0;
        });

        var databaseName = (dbSource[0].version) ? dbSource[0].version : database;
        return databaseName;
      });
    };

    return new SequenceService();
  })
;
