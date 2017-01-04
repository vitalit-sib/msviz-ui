'use strict';
angular.module('fishtones-wrapper', ['thirdparties'])
/**
 * @ngdoc service
 * @name fishtones-wrapper.service:fishtonifyService
 * @description
 * convert spectrum, matches etc. into fishTones ready object
 *
 */
  .service('fishtonifyService', function (_, fishtones) {
    var FishtonifyService = function () {
      this.richSeqShortcuter = new  fishtones.dry.RichSequenceShortcuter();
      return this;
    };

    /**
     * @ngdoc method
     * @name fishtones-wrapper.service:fishtonifyService#convertSpectrum
     * @methodOf fishtones-wrapper.service:fishtonifyService
     * @description convert a received spectrum into a fishTones.wet.ExpMSMSpectrum
     * @param {Object} spectrum the msviz serialized spectrum
     * @returns {ExpMSMSSpectrum} spectrum
     */
    FishtonifyService.prototype.convertSpectrum = function (spectrum, moz) {
      return new fishtones.wet.ExpMSMSSpectrum({
        precMoz: moz,
        precIntensity: spectrum.ref.precursor.intensity,
        retentionTime: spectrum.ref.precursor.retentionTime,
        precCharge: spectrum.ref.precursor.charge,
        scanNumber: spectrum.ref.scanNumber,
        mozs: spectrum.peaks.mozs,
        intensities: spectrum.peaks.intensities,
        intensityRanks: spectrum.peaks.intensityRanks
      });
    };

    /**
     * @ngdoc method
     * @name fishtones-wrapper.service:fishtonifyService#buildRichSeq
     * @methodOf fishtones-wrapper.service:fishtonifyService
     * @description convert a psm into a RichSequence object
     * @param {Object} psm the input psm with pep info
     * @returns {RichSequence} rich sequence, in the fishTones way
     */
    FishtonifyService.prototype.buildRichSeq = function (psm) {
      var _this = this;
      var rs = new fishtones.dry.RichSequence().fromString(psm.pep.sequence);
      _.each(psm.pep.modificationNames, function (mods, i) {
        _.each(mods, function (modName) {
          rs.addModification(i - 1, fishtones.dry.ResidueModificationDictionary.get(modName));
        });
      });

      return {
        richSeq:rs,
        richSeqShortcut: _this.richSeqShortcuter.richSeqToString(rs)
      };
    };

    return new FishtonifyService();
  });
