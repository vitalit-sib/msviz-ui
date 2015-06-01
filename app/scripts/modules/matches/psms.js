'use strict';
angular.module('matches-psms', ['thirdparties', 'environment', 'fishtones-wrapper'])
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
  .service('pvizCustomPsm', function (_, pviz) {
    pviz.FeatureDisplayer.trackHeightPerCategoryType.psms = 0.4;

    pviz.FeatureDisplayer.setCustomHandler('psm', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line');

        sel.selectAll('circle')
          .data(function (psm) {
            return psm.modif;
          })
          .enter()
          .append('circle')
          .attr({
            r: 2,
            class: function (m) {
              return m.isTarget ? 'is-target' : '';
            }
          });
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.4) + 1;
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.4);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.pos);
          });
        return d3selection;
      }
    });
    pviz.FeatureDisplayer.setCustomHandler('psmIsoModif', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr('class', 'feature internal data ' + type);
        sel.append('line');


        sel.selectAll('circle')
          .data(function (psm) {
            return _.filter(psm.modif, function (m) {
              return m.isFix;
            });
          })
          .enter()
          .append('circle')
          .attr({
            r: 2,
            class: function (m) {
              return m.isTarget ? 'is-target' : '';
            }
          });
        sel.selectAll('path')
          .data(function (psm) {
            return _.filter(psm.modif, function (m) {
              return m.isVar;
            });
          })
          .enter()
          .append('g')
          .attr('class', 'fixModif')
          .append('path')
          .attr({
            d: 'M0,-3,L3,3,L-3,3L0,-3',
            class: function (m) {
              return m.isTarget ? 'is-target' : '';
            }
          });
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.attr('transform', function (ft) {
          return 'translate(0,' + 0.4 * viewport.scales.y(0.5 + ft.displayTrack) + ')';
        });

        d3selection.selectAll('line')
          .attr('x1', function (ft) {
            return viewport.scales.x(ft.start - 0.4) + 1;
          })
          .attr('x2', function (ft) {
            return viewport.scales.x(ft.end + 0.4);
          });
        d3selection.selectAll('circle')
          .attr('cx', function (ft) {
            return viewport.scales.x(ft.pos);
          });
        d3selection.selectAll('g.fixModif')
          .attr('transform', function (ft) {
            return 'translate(' + viewport.scales.x(ft.pos) + ',0)';
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
    pviz.FeatureDisplayer.setCustomHandler('aaModif', {
      appender: function (viewport, svgGroup, features, type) {
        var sel = svgGroup.selectAll('g.feature.internal.data.' + type)
          .data(features)
          .enter()
          .append('g')
          .attr({
            'class': 'feature internal data ' + type
          })
          .style('transform', 'rotate(-90deg)');
        sel.append('text')
          .text(function (aa) {
            return aa.text;
          })
          .attr('x', -viewport.scales.y(0.9));
        return sel;
      },
      positioner: function (viewport, d3selection) {
        d3selection.selectAll('text')
          .attr('y', function (ft) {
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


      seqEntry.addFeatures(_this.getFeaturesAATargetModif());
      seqEntry.addFeatures(_this.getFeaturesPSMs());
      seqEntry.addFeatures(_this.getFeaturesPSMIsoModifs());
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

      var tModif = _this.protMatch.getTargetModification();

      var fts = _.chain(_this.protMatch.getMyPSMs())
        .map(function (psm) {
          return _.map(psm.proteinList, function (prot) {
            var modif = [];
            var len = prot.endPos - prot.startPos + 1;
            _.each(psm.pep.modificationNames, function (mods, i) {
              if (_.size(mods) === 0) {
                return;
              }
              var x = Math.max(-0.3, i - 1);
              x = Math.min(len - 0.7, x);
              modif.push({
                pos: x + prot.startPos - 1,
                modifNames: mods,
                text: mods.join(','),
                isTarget: _.contains(mods, tModif)
              });
            });
            return {
              groupSet: psm.searchId,
              category: 'psms',
              categoryName: '',
              type: 'psm',
              start: prot.startPos - 1,
              end: prot.endPos - 1,
              data: psm,
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


    return ProteinMatchesGlobalPvizView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmPviz
 * @description pviz one protein among multiple searches
 */
  .directive('matchesPsmPviz', function (pviz, ProteinMatchesGlobalPvizView, fishtones, fishtonifyService, spectrumService) {

    var addSelectedPSM = function(scope, pvizPsm){
      pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);


      pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

      spectrumService.findByRunIdAndId(pvizPsm.spectrumId.runId, pvizPsm.spectrumId.id).then(function (spectrum) {
        var sp = fishtonifyService.convertSpectrum(spectrum);
        pvizPsm.fishTones.spectrum = sp;
        scope.$broadcast('basket-add', {type: 'psm', bean: pvizPsm});
      });
    };


    var link = function (scope, elm) {
      pviz.FeatureDisplayer.addMouseoverCallback(['psm'], function (ft) {
        scope.$broadcast('show-match', {type: 'psm', bean: ft.data});
      });
      pviz.FeatureDisplayer.addMouseoverCallback(['psmIsoModif'], function (ft) {
        scope.$broadcast('show-match', {type: 'psmIsoModif', bean: ft.data});
      });
      pviz.FeatureDisplayer.addClickCallback(['psm'], function (ft) {
        addSelectedPSM(scope, ft.data);
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
  .controller('MatchesPSMCtrl', function ($scope, _, psmService) {
    $scope.loadPSMSForSpectrum = function () {
      psmService.findAllBySearchIdAndSpectrumId($scope.psm.searchId, $scope.psm.spectrumId.id)
        .then(function (psms) {
          if (psms.length > 1) {
            $scope.psm4spectrum = psms;
          }
        });
    };
    $scope.loadPSMSForSpectrum();
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmBox
 * @description psm box
 */
  .directive('matchesPsmBox', function () {
    return {
      restrict: 'E',
      scope: {psm: '='},
      templateUrl: 'views/matches/searches/matches-psm-box.html'
    };
  })

/**
 * @ngdoc controller
 * @name matches.controller:detailedMatchCtrl
 * @description controller to handled the detailed item (moused over
 * @param {Object} args a map containing
 *  * type : (psm|psmIsoModif)
 *  * bean: the object
 */
  .controller('detailedMatchCtrl', function ($scope) {
    $scope.$on('show-match', function (undefined, args) {
      delete $scope.psm;
      delete $scope.psmIsoModif;


      $scope[args.type] = args.bean;
      $scope.$apply();

    });
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmOneLiner
 * @description psm super short summary
 */
  .directive('matchesOneLiner', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/matches/searches/matches-one-liner.html'
    };
  })
;
