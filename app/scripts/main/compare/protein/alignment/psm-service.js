'use strict';
angular.module('psm-service', ['thirdparties', 'environment', 'fishtones-wrapper'])
/**
 * @ngdoc service
 * @name matches.service:psmService
 * @description
 * Access to PSMS
 *
 */
  .service('psmService', function (_, $http, EnvConfig, httpProxy, fishtonifyService) {
    var PSMService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:psmService#addFishtonesObjects
     * @methodOf matches.service:psmService
     * @description add fishTones property with richRSeq & co
     * @param {Array} psms a list of PSM
     * @returns {Array} the same list of psms
     */

    PSMService.prototype.addFishtonesObjects = function (psms) {
      _.each(psms, function (psm) {
          // transform dalton mass diff into ppm
          psm.ppmDiff = psm.matchInfo.massDiff * 1000000 / (psm.pep.molMass - psm.matchInfo.massDiff);
          psm.fishTones = fishtonifyService.buildRichSeq(psm);
      });
      return psms;
    };

    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllBySearchIdsAndProteinId
     * @methodOf matches.service:psmService
     * @description get the list of PSMS for one protein on a list of searchId
     * @param {Array} searchIds a list of search ids
     * @param {String} proteinId the protein Id
     * @returns {httpPromise} of a list of PSMs
     */
    PSMService.prototype.findAllBySearchIdsAndProteinId = function (searchIds, proteinId) {
      var _this = this;
      var uri = '/match/psms/' + searchIds.join(',') + '/by-ac/' + proteinId;
      return httpProxy.get(uri).then(_this.addFishtonesObjects);
    };

    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllBySearchIdAndSpectrumId
     * @methodOf matches.service:psmService
     * @description get the list of PSMS for one searchId and a spectrumId
     * @param {String} searchId one search id
     * @param {String} spectrumId unique specrtum id
     * @returns {httpPromise} of a list of PSMs
     */
    PSMService.prototype.findAllBySearchIdAndSpectrumId = function (searchId, spectrumId) {
      var _this = this;
      var uri = '/match/psms/' + searchId + '/by-spectrum/' + spectrumId;
      return httpProxy.get(uri).then(_this.addFishtonesObjects);
    };

    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllProteinRefsBySearchIds
     * @methodOf matches.service:psmService
     * @description get the list of protein based on a list of searchIds and evenutally with a modification
     * @param {Array} searchIds a list of search ids
     * @param {String} withModif optional modification name
     * @returns {httpPromise} of a list of PSMs
     */
    PSMService.prototype.findAllProteinRefsBySearchIds = function (searchIds, withModif) {
      var uri = '/match/proteins/' + searchIds.join(',');
      if (withModif) {
        uri += '?withModif=' + withModif;
      }
      return httpProxy.get(uri);
    };


    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllModificationsBySearchIds
     * @methodOf matches.service:psmService
     * @description get a count of modifications for a set of searchIds
     * @param {Array} searchIds a list of search ids
     * @returns {httpPromise} of a map modifName -> count
     */
    PSMService.prototype.findAllModificationsBySearchIds = function (searchIds) {
      return httpProxy.get('/match/modifications/' + searchIds.join(','));
    };

    return new PSMService();
  });
