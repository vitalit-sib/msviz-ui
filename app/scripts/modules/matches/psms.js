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
     * @param {Array} searchIds a list of search ids
     * @param {String} proteinId the protein Id
     * @returns {httpPromise} of a list of PSMs
     */
    PSMService.prototype.findAllBySearchIdsAndProteinId = function (searchIds, proteinId) {
      var uri = '/match/psms/' + searchIds.join(',') + '/by-ac/' + proteinId;

      return httpProxy.get(uri);
    };


    /**
     * @ngdoc method
     * @name matches.service:psmService#findAllProteinRefsBySearchIds
     * @methodOf matches.service:psmService
     * @description get the list of proteins based on a list of searchIds and evenutally with a modification
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
  })
  .service('pvizCustomPsm', function (pviz) {
    pviz.FeatureDisplayer.trackHeightPerCategoryType.psms = 0.4;

    pviz.FeatureDisplayer.setCustomHandler('psm', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
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

    pviz.FeatureDisplayer.setCustomHandler('aaInfo', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line')
          .style('stroke-width', function (aai) {
            var d = aai.data.depth;
            if (d <= 2) {
              return d;
            }
            if (d <= 4) {
              return 3;
            }
            return 4;
          });
        sel.filter(function (aai) {
          return aai.data.nbTargetModification;
        })
          .classed('has-target-modif', true)
          .append('circle')
          .attr('r', 5);
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.5);
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.5);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.start);
          });
        return d3selection;
      }
    });
  })
/**
 * @ngdoc object
 * @name matches.object:ProteinMatchesGlobalPvizView
 * @description the proteinMatchOverview
 */
  .factory('ProteinMatchesGlobalPvizView', function (_, pviz, pvizCustomPsm) {
    var _yo = pvizCustomPsm.yo; //these two lines just to fool out jshint
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


      seqEntry.addFeatures(_this.getFeaturesPSMs());
      seqEntry.addFeatures(_this.getFeaturesAAInfos());
      return _this;
    };

    /**
     * @ngdoc object
     * @name matches.object:ProteinMatchesGlobalPvizView#getFeaturesPSMs
     * @methodOf matches.object:ProteinMatchesGlobalPvizView
     * @description build the list of pviz ready features for PSMS
     * @return {Array} of PSM features
     */
    ProteinMatchesGlobalPvizView.prototype.getFeaturesPSMs = function () {
      var _this = this;
      return _.map(_this.protMatch.getMyPSMs(), function (psm) {
        return {
          groupSet: psm.searchId,
          category: 'psms',
          categoryName: '',
          type: 'psm',
          start: psm.proteinList[0].startPos - 1,
          end: psm.proteinList[0].endPos - 1,
          data: psm
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
      return _.map(_this.protMatch.getAminoAcidInfo(), function (aai) {
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

    return ProteinMatchesGlobalPvizView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmPviz
 * @description pviz one protein among multiple searches
 */
  .directive('matchesPsmPviz', function (pviz, ProteinMatchesGlobalPvizView) {
    var link = function (scope, elm) {
      pviz.FeatureDisplayer.addMouseoverCallback(['psm'], function (ft) {
        if (scope.detailedPSM === ft.data) {
          return;
        }
        scope.detailedPSM = ft.data;
        scope.$apply();
      });
      pviz.FeatureDisplayer.addClickCallback(['psm'], function (ft) {
        scope.$broadcast('psmAddSelected', ft.data);
      });
      scope.$watch('proteinMatch', function (protMatch) {
        if (protMatch === undefined) {
          return;
        }
        var view = new ProteinMatchesGlobalPvizView(elm, protMatch);
        return view;
      });
    };
    return {
      restrict: 'E',
      object: {
        proteinMatch: '='
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
  .directive('matchesPsmOneLiner', function () {
    return {
      restrict: 'E',
      template: '<div class="psm-one-liner">{{detailedPSM.pep.sequence}} <small>({{detailedPSM.matchInfo.scoreMap["Mascot:score"]}})</small></div>'
    };
  })
;
