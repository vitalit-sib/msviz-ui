angular.module('sequences', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name sequences.service:sequenceService
 * @description
 * Access sequence definition (from AC/source to sequence)
 *
 */.service('sequenceService', function (httpProxy) {
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

    return new SequenceService();
  })
;
