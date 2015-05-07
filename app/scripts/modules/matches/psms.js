'use strict';
angular.module('matches-psms', ['thirdparties', 'environment', 'fishtones-wrapper'])
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
      return httpProxy.get('/match/psms/' + searchIds.join(',') + '/by-ac/' + proteinId);
    };


    return new PSMService();
  })
  .service('pvizCustomPsm', function (pviz) {
    pviz.FeatureDisplayer.trackHeightPerCategoryType.psms = 0.4;

    pviz.FeatureDisplayer.setCustomHandler('psm', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll("g.feature.internal.data." + type)
          .data(features)
          .enter()
          .append("g")
          .attr("class", "feature internal data " + type);
        sel.append('line');
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.4);
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.4);
          });
        return d3selection;
      }
    });

  })
  .factory('MatchesPsmPvizView', function (_, pviz, pvizCustomPsm) {
    var MatchesPsmPvizView = function (elm, protein, psms) {
      var _this = this;

      var seqEntry = new pviz.SeqEntry({sequence: protein.sequence});
      var view = new pviz.SeqEntryAnnotInteractiveView({
        model: seqEntry,
        el: elm
      });
      view.render();

      var features = _.map(psms, function (psm) {
        return {
          groupSet: psm.searchId,
          category: 'psms',
          categoryName: '',
          type: 'psm',
          start: psm.proteinList[0].startPos - 1,
          end: psm.proteinList[0].endPos - 1,
          data:psm
        }
      });

      seqEntry.addFeatures(features);
      return _this;
    };

    return MatchesPsmPvizView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmPviz
 * @description pviz one protein among multiple searches
 */
  .directive('matchesPsmPviz', function (pviz, MatchesPsmPvizView) {
    var link = function (scope, elm) {
      pviz.FeatureDisplayer.addMouseoverCallback(['psm'], function (ft) {
        if(scope.detailedPSM === ft.data){
          return;
        }
        scope.detailedPSM = ft.data;
        scope.$apply();
      });
      pviz.FeatureDisplayer.addClickCallback(['psm'], function (ft) {
        scope.$broadcast('psmAddSelected', ft.data);
      });
      scope.$watch('proteinMatch.psms', function () {
        if (scope.proteinMatch.protein === undefined) {
          return;
        }
        var view = new MatchesPsmPvizView(elm, scope.proteinMatch.protein, scope.proteinMatch.psms);

      })
    };
    return {
      restrict: 'E',
      object:{
        proteinMatch : '='
      },
      link: link,
      template: '<div style="width:100%; height:400px"></div>'
    };
  })

      /**
 * @ngdoc directive
 * @name matches.directive:matchesPsmOneLiner
 * @description psm super short summary
 */
  .directive('matchesPsmOneLiner', function (pviz) {
    return {
      restrict: 'E',
      template: '<div class="psm-one-liner">{{detailedPSM.pep.sequence}} <small>({{detailedPSM.matchInfo.scoreMap["Mascot:score"]}})</small></div>'
    };
  })
;
