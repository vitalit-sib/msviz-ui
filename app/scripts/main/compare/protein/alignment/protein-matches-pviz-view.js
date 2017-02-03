'use strict';
angular.module('protein-matches-pviz-view', ['pviz-custom-psm', 'thirdparties', 'environment', 'fishtones-wrapper', 'experimental'])
/**
 * @ngdoc object
 * @name matches.object:ProteinMatchesGlobalPvizView
 * @description the proteinMatchOverview
 */
  .factory('ProteinMatchesGlobalPvizView', function (_, pviz, pvizCustomPsm, spectrumService) {
    //these two lines just to fool out jshint
    var _yo = pvizCustomPsm.yo;
    _yo++;

    // pviz.FeatureDisplayer.trackHeightPerCategoryType.psms = 8;

    /**
     * create the pviz objects
     * @param elm
     * @param protMatch
     * @param searchIdOrder
     * @returns {ProteinMatchesGlobalPvizView}
     * @constructor
     */
    var ProteinMatchesGlobalPvizView = function (elm, protMatch, searchIdOrder) {

      var _this = this;

      // set empty array for selected psms
      _this.selPsms = [];

      _this.protMatch = protMatch;
      var seqEntry = new pviz.SeqEntry({sequence: protMatch.getProtein().sequence});
      var view = new pviz.SeqEntryAnnotInteractiveView({
        model: seqEntry,
        el: elm,
        groupSetOrder:[undefined].concat(searchIdOrder)
      });
      view.render();

      // we need the seqEntry later to be able to refresh the view
      _this.seqEntry = seqEntry;

      _this._showAllPsm=false;

      // we add all the features to the view
      _this.refreshView();
      return _this;
    };

    /**
     * refresh the pviz view
     */
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



    var parseMXQPsmList = function(psmList, tModif){
      // for MQ we have no conflicts
      var psm = psmList[0];
      var prot = psm.proteinList[0];
      addSpectrumTitles(psm);

      // currently we assume there is only one modification per position
      var modifs = [];

      _.each(psm.matchInfo.modificationInfos, function(ptms, modif) {
        var sortedModifs = (modif === tModif) ? (_.sortBy(ptms, function (m) {
            return -m.modifProb;
          })) : (ptms);

        var mainProb;

        var ptmList = _.map(sortedModifs, function(m){

          var modifRank = '';
          var selectedModif = false;

          if(modif === tModif){
            selectedModif = true;

            if(m.status === 'MAIN'){
              mainProb = m.modifProb;
              modifRank = 'first';
            }else{
              // if the difference is less than 0.1
              if(mainProb - m.modifProb < 0.1){ modifRank = 'firstWithConflict'; }

            }
          }

          // get position
          var len = prot.endPos - prot.startPos + 1;
          var x = Math.max(-0.3, m.position - 1);
          x = Math.min(len - 0.7, x);
          var currentPos = x + prot.startPos - 1;

          return {
            pos: currentPos,
            modifNames: modif,
            text: modif,
            modifRank: modifRank,
            selectedModif: selectedModif
          };
        });

        modifs = modifs.concat(ptmList);
      });


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

    };


    /**
     *
     * @param sortedPsm
     */
    var addSpectrumTitles = function(psm){
      // we can add the spectrum title here
      //we change runId by searchId to make it compatible with MaxQuant
      spectrumService.findSpRefByRunIdAndId(psm.searchId, psm.spectrumId.id).then(function (ref) {

        // take moz from matchInfo if available
        var moz = psm.matchInfo.correctedMoz ? psm.matchInfo.correctedMoz : ref.precursor.moz;

        var spTitle = 'scan: ' + ref.scanNumber +
          ' (' + (ref.precursor.retentionTime / 60).toFixed(1) + 'min) ' +
          'm/z: ' +
          moz.toFixed(4) + ' (' + ref.precursor.charge + '+' +
          ') ' +
          ' massDiff: ' + psm.ppmDiff.toFixed(2) + ' ppm';
        psm.spTitle = spTitle;

        psm.prevAA= (_.first(psm.proteinList)).previousAA.toString();
        psm.nxtAA= (_.first(psm.proteinList)).nextAA.toString();
      });
    };

    /**
     *
     * @param psmList
     * @param tModif
     * @returns {{groupSet, category: string, categoryName: string, type: string, start: number, end: number, data: *, modif: Array}}
     */
    var parseDefaultPsmList = function(psmList, tModif){

      // sort by rank
      var sortedPsm = _.sortBy(psmList, function(psm){
        return psm.matchInfo.rank;
      });

      // look for spectrumTitles
      var firstPsm = sortedPsm[0];
      var prot = firstPsm.proteinList[0];
      addSpectrumTitles(firstPsm);

      // count each score to see if first one appears multiple times
      var scoreMap = _.countBy(sortedPsm, function(psm){
        return psm.matchInfo.score.mainScore;
      });

      var bestScore = _.max(_.map(scoreMap, function(num, key) {return parseFloat(key);}));

      // create list of modifs
      var modifs = [];
      _.each(sortedPsm, function(psm){
        // proteinList should always be 1 (we filtered it before)
        var prot = psm.proteinList[0];

        var len = prot.endPos - prot.startPos + 1;

        _.each(psm.pep.modificationNames, function (mods, i) {

          if (_.size(mods) === 0) {
            return;
          }

          // get position
          var x = Math.max(-0.3, i - 1);
          x = Math.min(len - 0.7, x);

          // get modif rank @TODO is mods ever bigger than 1 ??
          var modifRank = '';
          var selectedMod= (mods[0] === tModif ) ? true : false;
          if(mods.length > 1){
            console.log('protein-matches-pviz-view - l121 :  mods is bigger than 1 => ' + mods.length);
          }

          if(psm.matchInfo.score.mainScore === bestScore){

            if(psm.matchInfo.rank === 1 ){
              modifRank = 'first';
            }else{
              modifRank = 'firstWithConflict';
            }
            // we keep lower hits only for selected modifs
          }else if(! selectedMod){
            return;
          }

          // we add the modif only once per position
          var currentPos = x + prot.startPos - 1;
          if(!(_.findWhere(modifs, {pos: currentPos}))){
            modifs.push({
              pos: currentPos,
              modifNames: mods,
              text: mods.join(','),
              modifRank: modifRank,
              selectedModif: selectedMod
            });
          }

        });

      });

      return {
        groupSet: firstPsm.searchId,
        category: 'psms',
        categoryName: '',
        type: 'psm',
        start: prot.startPos - 1,
        end: prot.endPos - 1,
        data: firstPsm,
        modif: modifs
      };
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

      var myPsms = _this.protMatch.getMyPSMs();

      // filter out psm's outside selected position
      var filteredPsms = _.filter(myPsms, function(psm){
        var prot = psm.proteinList[0];

        return (psmPos <= prot.endPos && psmPos >= prot.startPos);
      });

      var spGroups = _.groupBy(filteredPsms, function(onePsm){
        return onePsm.spectrumId.id + onePsm.spectrumId.runId;
      });

      var fts = _.chain(spGroups)

        // transform into PVIZ psm object
        .map(function(psmList) {
          var pvizObj;
          if(psmList.length === 1 && psmList[0].matchInfo.modificationProbabilities){
            pvizObj = parseMXQPsmList(psmList, tModif);
          }else{
            pvizObj = parseDefaultPsmList(psmList, tModif);
          }

          return pvizObj;

        })
        // remove empty entries
        .filter(Boolean)
        // mark selected PTMs
        .map(function(el){
          var isSelected = _.find(_this.selPsms, function(oneSel){
            return oneSel.searchId === el.data.searchId && oneSel.spNr === el.data.spectrumId.id;
          });
          el.isSelected = (isSelected !== undefined) ? true : false;
          return el;
        })
        .flatten()
        .value();

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

    /**
     * @description set the AA position on which the user clicked
     */
    ProteinMatchesGlobalPvizView.prototype.setSelPsmPos = function (psmPos) {
      var _this = this;
      _this._selPsmPos = psmPos;
    };

    /**
     * @description remove the given PSM from the list of selected PSMs
     */
    ProteinMatchesGlobalPvizView.prototype.removeSelPsm = function (psm) {
      var _this = this;

      _this.selPsms = _this.selPsms.filter(function(el){
        return !(el.searchId === psm.searchId && el.spNr === psm.spNr);
      });
    };

    /**
     * @description add given PSM to the list of selected PSMs
     */
    ProteinMatchesGlobalPvizView.prototype.addSelPsm = function (psm) {
      var _this = this;

      var psmInfo = {
        // rank: psm.matchInfo.rank,
        searchId: psm.searchId,
        spNr: psm.spectrumId.id
      };

      _this.selPsms.push(psmInfo);
    };


    return ProteinMatchesGlobalPvizView;
  });
