'use strict';
angular.module('fishtones-wrapper', ['thirdparties'])
/**
 * @ngdoc service
 * @name fishtones-wrapper.service:fishtonifyService
 * @description
 * convert spectrum, matches etc. into fishTones ready object
 *
 */
  .service('fishtonifyService', function () {
    var FishtonifyService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name fishtones-wrapper.service:fishtonifyService#convertSpectrum
     * @methodOf fishtones-wrapper.service:fishtonifyService
     * @description convert a received spectrum into a fishTones.wet.ExpMSMSpectrum
     * @param {Object} spectrum the msviz serialized specturm
     * @returns {ExpMSMSSpectrum} spectrum
     */
    FishtonifyService.prototype.convertSpectrum = function (spectrum) {
      return new fishtones.wet.ExpMSMSSpectrum({
        precMoz: spectrum.ref.precursor.moz,
        precIntensity: spectrum.ref.precursor.intensity,
        retentionTime: spectrum.ref.precursor.retentionTime,
        precCharge: spectrum.ref.precursor.charge,
        scanNumber: spectrum.ref.scanNumber,
        mozs: spectrum.peaks.mozs,
        intensities: spectrum.peaks.intensities,
        intensityRanks: spectrum.peaks.intensityRanks
      });
    };

    return new FishtonifyService();
  });
