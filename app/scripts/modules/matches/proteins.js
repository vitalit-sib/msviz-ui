'use strict';
angular.module('matches-proteins', ['thirdparties', 'environment', 'matches-psm-iso-modif'])

/**
 * @ngdoc service
 * @name proteinMatches.service:proteinMatchesService
 * @description
 * Access proteinIds via the matches spaces (no sequence, but the list of protein Ids etc.)
 *
 */
  .service('proteinMatchesRefService', function (httpProxy) {
    var ProteinMatchesRefService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name proteinMatches.service:proteinMatchesService#findBySearchId
     * @methodOf proteinMatches.service:proteinMatchesService
     * @description get the list of protein based on a search
     * @param {String} searchId the search in which to look for protein names
     * @returns {httpPromise} of an array of protein Id
     */
    ProteinMatchesRefService.prototype.findBySearchId = function (searchId) {
      return httpProxy.get('/match/proteins/' + searchId);
    };
    return new ProteinMatchesRefService();
  })

  .controller('ProteinIDsListCtrl', function($scope, proteinMatchesRefService){
    proteinMatchesRefService.list().then(function(data){
      $scope.proteinIDs=data;
    })
  })
/**
 * @ngdoc object
 * @name proteinMatches.object:ProteinMatch
 * @description a match with a protein decription and a list of PSM
 * @param {Object} protein the protein AC + sequence
 * @param {Array} psms the list of PSM
 * @param {Object} optional parameters
 * * targetModification as a string eventually pointing to the modificaiton to be enhanced
 *
 */
  .factory('ProteinMatch', function (_, psmIsoModifBuilder) { //NOSONAR
    var ProteinMatch = function (protein, psms, opts) {
      var _this = this;
      opts = _.extend({}, opts);
      _this._protein = protein;
      _this._psms = psms;
      _this._targetModification = opts.targetModification;
      return _this;
    };


    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getProtein()
     * @methodOf proteinMatches.object:ProteinMatch
     * @description {Object} get the matched protein
     */
    ProteinMatch.prototype.getProtein = function () {
      return this._protein;
    };

    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getPSMs()
     * @methodOf proteinMatches.object:ProteinMatch
     * @description get the PSMs
     * @return  {Array} of psms
     */
    ProteinMatch.prototype.getPSMs = function () {
      return this._psms;
    };

    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getTargetModification()
     * @methodOf proteinMatches.object:ProteinMatch
     * @description if ever this proteinMatch has a target modification
     * @return  {String} modification name
     */
    ProteinMatch.prototype.getTargetModification = function () {
      return this._targetModification;
    };

    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getMyPSMs()
     * @methodOf proteinMatches.object:ProteinMatch
     * @description get the PSMs, but tweak them and keep only the proteinRef that match the protein's one
     * @return {Array} of psms
     */
    ProteinMatch.prototype.getMyPSMs = function () {
      var _this = this;
      var ids = _this.getProtein().proteinRef.identifiers;
      return _.map(_this.getPSMs(), function (psm) {
        var newPSM = _.extend({}, psm);
        newPSM.proteinList = _.filter(psm.proteinList, function (p) {
          return _.contains(ids, p.proteinRef.AC);
        });
        return newPSM;
      });
    };

    /**
     * @ngdoc method
     * @name matches.object:PSMIsoModif:getMyPSMIsoModif
     * @methodOf matches.object:PSMIsoModif
     * @description the list PSM grouped by Iso Modif (same set of modifi by sequence
     * @return {Array} list of PSMIsoModif
     */
    ProteinMatch.prototype.getMyPSMIsoModif = function () {
      var _this = this;
      return psmIsoModifBuilder.buildList(_this.getMyPSMs());
    };


    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getAminoAcidInfo()
     * @methodOf proteinMatches.object:ProteinMatch
     * @description For each amino acid covered by a PSM, get the position, coverage depth, the list of psms, eventually the selectedModification
     * @return {Array} a list of amino acid
     */
    ProteinMatch.prototype.getAminoAcidInfo = function () {
      var _this = this;
      var ret = {};

      var tModif = _this.getTargetModification();

      var seqArray = _this.getProtein().sequence.split('');
      _.each(_this.getMyPSMs(), function (psm) {
        var isModifAtPos = function (p) {
          return _.contains(psm.pep.modificationNames[p], tModif);
        };
        _.each(psm.proteinList, function (prot) {
          var pos;
          for (pos = prot.startPos; pos <= prot.endPos; pos++) {
            var aa;
            if (!ret[psm.searchId]) {
              ret[psm.searchId] = [];
            }

            if (ret[psm.searchId][pos] === undefined) {
              aa = ret[psm.searchId][pos] = {
                searchId: psm.searchId,
                aa: seqArray[pos - 1],
                pos: pos,
                psms: [],
                depth: 0
              };
            } else {
              aa = ret[psm.searchId][pos];
            }

            if (tModif) {
              var posModif;
              if (pos === prot.startPos) {
                posModif = [0, 1];
              } else if (pos === prot.endPos) {
                posModif = [pos - prot.startPos + 1, pos - prot.startPos + 2];
              } else {
                posModif = [pos - prot.startPos + 1];
              }
              if (_.some(posModif, isModifAtPos)) {
                aa.nbTargetModification = aa.nbTargetModification ? (aa.nbTargetModification + 1) : 1;
              }
            }
            aa.psms.push(psm);
            aa.depth++;
          }
        });
      });
      return _.chain(ret)
        .values()
        .flatten()
        .filter(function (aa) {
          return aa !== undefined;
        })
        .value();
    };

    /**
     * @ngdoc method
     * @name proteinMatches.object:ProteinMatch#getTargetAminoAcidWithTargetModif
     * @methodOf proteinMatches.object:ProteinMatch
     * @description get a list of amino acid info for all amino acid where the targeted modif has been found
     * @return {Array} of objects
     */
    ProteinMatch.prototype.getTargetAminoAcidWithTargetModif = function () {
      var _this = this;
      return _.filter(_this.getAminoAcidInfo(), function (aai) {
        return aai.nbTargetModification;
      });
    };

    return ProteinMatch;
  })
;
