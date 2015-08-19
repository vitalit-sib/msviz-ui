'use strict';
angular.module('protein-matches-pviz-view', ['pviz-custom-psm', 'thirdparties', 'environment', 'fishtones-wrapper'])
/**
 * @ngdoc object
 * @name matches.object:ProteinMatchesGlobalPvizView
 * @description the proteinMatchOverview
 */
  .factory('ProteinMatchesGlobalPvizView', function (_, pviz, pvizCustomPsm) {
    //these two lines just to fool out jshint
    var _yo = pvizCustomPsm.yo;
    _yo++;

    var ProteinMatchesGlobalPvizView = function (elm, protMatch) {
      var _this = this;

      _this.protMatch = protMatch;

      var seqEntry = new pviz.SeqEntry({sequence: protMatch.getProtein().sequence});
      var view = new pviz.SeqEntryAnnotInteractiveView({
        model: seqEntry,
        el: elm
      });
      view.render();

      // we need the seqEntry later to be able to refresh the view
      _this.seqEntry = seqEntry;

      // we add all the features to the view
      _this.refreshView();

      return _this;
    };


    ProteinMatchesGlobalPvizView.prototype.refreshView = function () {
      var _this = this;

      // first we clear the view
      _this.seqEntry.clear();

      // then we set again all features
      _this.seqEntry.addFeatures(_this.getFeaturesAATargetModif());
      _this.seqEntry.addFeatures(_this.getFeaturesPTMsCount());
      _this.seqEntry.addFeatures(_this.getFeaturesAAInfos());
      _this.seqEntry.addFeatures(_this.getFeaturesPSMs());
    };


    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesPSMs
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description build the list of pviz ready features for PSMs
     * @return {Array} of PSM features
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesPSMs = function () {
      var _this = this;

      var tModif = _this.protMatch.getTargetModification();

      var psmPos = _this._selPsmPos;

      var spGroups = _.groupBy(_this.protMatch.getMyPSMs(), function(onePsm){
        return onePsm.spectrumId.id + onePsm.spectrumId.runId;
      });

      var fts = _.chain(spGroups)

        // transform into PVIZ psm object
        .map(function(psmList) {

          var bestScore = 0;

          // sort by rank
          var sortedPsm = _.sortBy(psmList, function(psm){
            return psm.matchInfo.rank;
          });

          // count each score to see if first one appears multiple times
          var scoreMap = _.countBy(sortedPsm, function(psm){
             return psm.matchInfo.score.mainScore;
          });

          var bestScore = _.keys(scoreMap)[0];
          var multipleBestScores = (scoreMap[bestScore] > 1)?true:false;

          // create list of modifs
          var modifs = [];
          _.each(sortedPsm, function(psm){
            // proteinList should always be 1 (we filtered it before)
            var prot = psm.proteinList[0];

            var len = prot.endPos - prot.startPos + 1;
            _.each(psm.pep.modificationNames, function (mods, i) {
              if (_.size(mods) === 0 || mods != tModif) {
                return;
              }
              // get position
              var x = Math.max(-0.3, i - 1);
              x = Math.min(len - 0.7, x);

              // get modif rank
              var modifRank = '';

              if(psm.matchInfo.score.mainScore === parseFloat(bestScore)){
                if(psm.matchInfo.rank === 1){
                  modifRank = 'first';
                }else{
                  modifRank = 'firstWithConflict';
                }
              }

              // with add the modif only once per position
              var currentPos = x + prot.startPos - 1;
              if(!(_.findWhere(modifs, {pos: currentPos}))){
                modifs.push({
                  pos: currentPos,
                  modifNames: mods,
                  text: mods.join(','),
                  modifRank: modifRank
                });
              }

            });

          });

          // if there is no modification or only at position not selected, we return an empty list
          if(_.size(modifs) === 0 || !(_.findWhere(modifs, {pos: psmPos-1}))){
            return;
          }

          var psm = sortedPsm[0];
          var prot = psm.proteinList[0];

          return {
            groupSet: psm.searchId,
            category: 'psms',
            categoryName: '',
            type: 'psm',
            start: prot.startPos - 1,
            end: prot.endPos - 1,
            data: psm,
            modif: modifs
          };

        })
        // remove empty entries
        .filter(Boolean)
        .flatten()
        .value()

      return fts;
    };

    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesPSMIsoModifs
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description buid features for PSMIsoModif
     * @return {Array} of PSMIsoModif
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesPSMIsoModifs = function () {
      var _this = this;

      var tModif = _this.protMatch.getTargetModification();

      var fts = _.chain(_this.protMatch.getMyPSMIsoModif())
        .map(function (psmIso) {
          return _.map(psmIso.getProteinList(), function (prot) {
            var modif = [];
            var len = prot.endPos - prot.startPos + 1;
            var aaPos = function (i) {
              var x = Math.max(-0.3, i);
              x = Math.min(len - 0.7, x);
              return x - 1;
            };
            _.each(psmIso.getFixModif(), function (modDetails, modifName) {
              _.each(modDetails.pos, function (p) {
                modif.push({
                  pos: aaPos(p) + prot.startPos,
                  modifName: modifName,
                  text: modifName,
                  isTarget: modifName === tModif,
                  isFix: true
                });
              });
            });
            _.each(psmIso.getVarModif(), function (modDetails, modifName) {
              _.each(modDetails.pos, function (p) {
                modif.push({
                  pos: aaPos(p) + prot.startPos,
                  modifName: modifName,
                  text: modifName,
                  isTarget: modifName === tModif,
                  isVar: true
                });
              });
            });
            return {
              category: 'psmIsoModifs',
              categoryName: '',
              type: 'psmIsoModif',
              start: prot.startPos - 1,
              end: prot.endPos - 1,
              data: psmIso,
              modif: modif
            };
          });
        })
        .flatten()
        .value();

      return fts;
    };

    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesPSMsCount
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description build the list of pviz ready features for count of PSM's
     * @return {Array} of PSM features
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesPTMsCount = function () {
      var _this = this;
      return _.map(_this.protMatch.getAminoAcidInfo(), function (psms) {
        return {
          groupSet: psms.searchId,
          category: 'ptmCounts',
          categoryName: '',
          type: 'ptmCount',
          start: psms.pos - 1,
          end: psms.pos - 1,
          data: psms
        };
      });

    };

    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesAAInfos
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description build the list of pviz ready features for amino acid level info
     * @return {Array} of PSM features
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesAAInfos = function () {
      var _this = this;

      return _.map( _this.protMatch.getAminoAcidInfo(), function (aai) {
        return {
          groupSet: aai.searchId,
          category: 'aaInfos',
          categoryName: '',
          type: 'aaInfo',
          start: aai.pos - 1,
          end: aai.pos - 1,
          data: aai
        };
      });

    };

    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesAATargetModif
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description build the list of pviz ready features for aa modified with the target modif
     * @return {Array} of PSM features
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesAATargetModif = function () {
      var _this = this;
      return _.chain(_this.protMatch.getTargetAminoAcidWithTargetModif())
        .uniq('pos')
        .map(function (aai) {
          return {
            category: 'aaModif',
            categoryName: '',
            type: 'aaModif',
            start: aai.pos - 1,
            end: aai.pos - 1,
            text: aai.aa + aai.pos
          };
        })
        .value();
    };


    ProteinMatchesGlobalPvizView.prototype.setSelPsmPos = function (psmPos) {
      var _this = this;

      _this._selPsmPos = psmPos;
    };


    return ProteinMatchesGlobalPvizView;
  })
