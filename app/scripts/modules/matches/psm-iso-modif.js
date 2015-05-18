'use strict';
angular.module('matches-psm-iso-modif', ['thirdparties'])
/**
 * @ngdoc object
 * @name matches.object:PSMIsoModif
 * @description contains a list of psms who have the same sequence and set of modifications
 * @param {Object} args compulsory  properties, containing
 * * {Array} psms the underlying PSM
 * * {Map} fixModif a map of modifications appearing across all peptides, in the format modif -> {pos: [i1,...]}
 * * {Map} varModif a map of modifications appearing in peptides, but at different position, in the format modif -> {count:n, pos:[i1, i2, ...]}. Here the
 */
  .factory('PSMIsoModif', function () {
    var PSMIsoModif = function (args) {
      var _this = this;
      _this._psms = args.psms;
      _this._fixModif = args.fixModif;
      _this._varModif = args.varModif;

      return _this;
    };


    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:getPSMs
     * @methoOf matches.object:PSMIsoModif
     * @description the list of underlying PSM
     * @return {Array} list of PSM
     */
    PSMIsoModif.prototype.getPSMs = function () {
      return this._psms;
    };

    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:getFixModif
     * @methoOf matches.object:PSMIsoModif
     * @description modification present on all PSMS
     * @return {Object} a map {modif -> {pos:[i1,...]}}
     */
    PSMIsoModif.prototype.getFixModif = function () {
      return this._fixModif;
    };
    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:getVarModif
     * @methoOf matches.object:PSMIsoModif
     * @description modification present on all PSMS, but with different positions combinations
     * @return {Object} a map {modif -> {count:n, pos:[i1,i2,...]}} where n is of course lower than the number of potential positions
     */
    PSMIsoModif.prototype.getVarModif = function () {
      return this._varModif;
    };

    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:countPSM
     * @methoOf matches.object:PSMIsoModif
     * @description get the number of PSM used to build
     * @return {Number} nb PSM
     */
    PSMIsoModif.prototype.countPSM = function () {
      return this._psms.length;
    };

    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:getProteinRef
     * @methoOf matches.object:PSMIsoModif
     * @description get the proteinRef (the first proteinRef of the first PSM, as they should all be equivalent)
     * @return {Number} nb PSM
     */
    PSMIsoModif.prototype.getProteinRef = function () {
      return this._psms[0].proteinList.proteinRef;
    };


    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:hasUniquePSM
     * @methoOf matches.object:PSMIsoModif
     * @description check if there only on psms
     * @return {PSM} undefined if multiple PSMS are contained, or the one if there is only one
     */
    PSMIsoModif.prototype.hasUniquePSM = function () {
      return this._psms.length === 1;
    };

    return PSMIsoModif;
  })
/**
 * @ngdoc service
 * @name matches.service:psmIsoModifBuilder
 * @description take a list of psms, group them by equivalent sequence number of modifications and build an array of PSMIsoModif
 *
 */
  .service('psmIsoModifBuilder', function (_, PSMIsoModif) {
    var PSMIsoModifBuilder = function () {

    };


    PSMIsoModifBuilder.prototype._projectModif = function (psm) {
      var p = _.chain(psm.pep.modificationNames)
        .map(function (names, i) {
          return _.map(names, function (n) {
            return {modif: n, pos: i};
          });
        })
        .flatten()
        .value();
      return p;
    };


    /**
     * @ngdoc method
     * @name matches.service:psmIsoModifBuilder:buildList
     * @methoOf matches.service:psmIsoModifBuilder
     * @description build the list of PSMIsoModif
     * @params {Array} psms a list of psms
     * @return {Array} of PSMIsoModif
     */
    PSMIsoModifBuilder.prototype.buildList = function (psms) {
      var _this = this;

      return _.chain(psms)
        .groupBy(function (psm) {
          //build a unique key with the projected modif
          return psm.pep.sequence + ':' + _.chain(_this._projectModif(psm))
              .groupBy('modif')
              .map(function (l, modif) {
                return {modif: modif, count: l.length};
              })
              .sortBy('modif')
              .map(function (a) {
                return a.modif + ':' + a.count;
              })
              .value()
              .join(";");
        })
        .map(function (psm, k) {
          return _this.buildOnePSMIsoModif(psm)
        })
        .value();

    };
    /**
     * @ngdoc method
     * @name matches.service:psmIsoModifBuilder:buildOnePSMIsoModif
     * @methoOf matches.service:psmIsoModifBuilder
     * @description from a list of PSM with the equivalent sequence of modif set, build a PSMIsoModif
     * @return {PSMIsoModif} a single psmIsoModif
     *
     */
    PSMIsoModifBuilder.prototype.buildOnePSMIsoModif = function (psms) {
      var _this = this;

      var modPos = {};
      var n = psms[0].pep.sequence.length + 2;
      _.each(psms, function (psm) {
        _.each(psm.pep.modificationNames, function (mods, i) {
          _.each(mods, function (m) {
            if (modPos[m] === undefined) {
              modPos[m] = [];
              _.times(n, function (i) {
                modPos[m][i] = 0;
              });
            }
            if (modPos[m][i] === undefined) {
              modPos[m][i] = 1;
            } else {
              modPos[m][i]++;
            }
          });
        });
      });

      var nbPsm = _.size(psms);
      var fixModif = {};
      var varModif = {};
      _.each(modPos, function (count, modif) {
        var av = [];
        var af = [];
        var countVar=0;
        _.each(count, function (c, i) {
          if (c === 0) {
            return;
          }
          if (c === nbPsm) {
            af.push(i - 1);
            return;
          }
          countVar += c;
          av.push(i - 1);
        });
        if (_.size(af) > 0) {
          fixModif[modif] = {pos: af};
        }
        if (_.size(av) > 0) {

          varModif[modif] = {pos: av, count: countVar / nbPsm};
        }
      });

      return new PSMIsoModif({
        psms: psms,
        fixModif: fixModif,
        varModif: varModif
      });
    };

//return a singleton
    return new PSMIsoModifBuilder();

  });
