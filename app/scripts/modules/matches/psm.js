'use strict';
angular.module('matches')
/**
 * @ngdoc service
 * @name matches.service:psmService
 * @description
 * Access to PSMS
 *
 */
  .service('psmService', function ($http, EnvConfig, httpProxy) {
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
      return httpProxy.get('/match/psms/' + searchIds.list().join(',') + '/by-ac/' + proteinId);
    };


    return new PSMService();
  })
  .factory('MatchesPsmPvizView', function(_, pviz){
    var MatchesPsmPvizView = function(elm, protein, psms){
      var _this = this;

      console.info('pviz', pviz);
      var seqEntry = new pviz.SeqEntry({sequence: protein.sequence});
      var view = new pviz.SeqEntryAnnotInteractiveView({
        model : seqEntry,
        el : elm
      });
      view.render();

      var features = _.map(psms, function(psm){
        console.log(psm);
        return {
          category:psm.searchId,
          type:'psm',
          start:psm.proteinList[0].startPos,
          end:psm.proteinList[0].endPos
        }
      });
      seqEntry.addFeatures(features);

      console.log('rendering', view);

      return _this;
    };

    return MatchesPsmPvizView;
  })
  .directive('matchesPsmPviz', function (MatchesPsmPvizView) {
    var link = function (scope, elm) {
      scope.$watch('proteinMatch.psms', function(){
        if (scope.proteinMatch.protein === undefined) {
          return;
        }
        var view = new MatchesPsmPvizView(elm, scope.proteinMatch.protein, scope.proteinMatch.psms);

      })
    };
    return {
      restrict: 'E',
      link: link,
      template: '<div id="haha" style="width:100%; height:400px"></div>'
    };
  })
;
