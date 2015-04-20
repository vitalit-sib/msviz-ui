'use strict';
angular.module('matches-list', ['thirdparties', 'environment', 'matches', 'fishtones-wrapper'])
  .controller('PsmListCtrl', function ($scope, $q, _, fishtones, spectrumService, fishtonifyService, ssmService) {
    $scope.$on('psmAddSelected', function (event, pvizPsm) {
      $scope.addSelectedPSM(pvizPsm);
    });

    $scope.selectedMatches = [];
    $scope.addSelectedPSM = function (pvizPsm) {
      if (_.contains($scope.selectedMatches, pvizPsm)) {
        return;
      }
      pvizPsm.fishTones = {
        richSeq: new fishtones.dry.RichSequence().fromString(pvizPsm.pep.sequence)
      };

      _.each(pvizPsm.pep.modificationNames, function(mods, i){
        _.each(mods, function(modName) {
          pvizPsm.fishTones.richSeq.addModification(i-1,fishtones.dry.ResidueModificationDictionary.get(modName));

        });
      });

      pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);

      spectrumService.findByRunIdAndId(pvizPsm.spectrumId.runId, pvizPsm.spectrumId.id).then(function (spectrum) {
        var sp = fishtonifyService.convertSpectrum(spectrum);
        pvizPsm.fishTones.spectrum = sp;
        pvizPsm.type='PSM';
        $scope.selectedMatches.push(pvizPsm);
      });

    };


    $scope.getSimSpectra=function(spectrumRef){
      ssmService.findSimilarSpectra(spectrumRef).then(function(spspMatches){
        var ssms = {
            type:'SSM',
            ref:spectrumRef,
            matches:spspMatches
          };
        $scope.selectedMatches.push(ssms);

      })
    };

    $scope.removeSelectedPSM = function(psm){
      $scope.selectedMatches = _.filter($scope.selectedMatches, function(e){return e !== psm});
    };

  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmListDetails
 * @description show the list of the selected peptides
 */
  .directive('matchesPsmListDetails', function (pviz) {
    return {
      restrict: 'E',
      templateUrl: 'views/matches/searches/matchesListDetails.html'
    };
  })
/**
 * @ngdoc object
 * @name  matches.view:MatchesFishtonesPsmSpectrumView
 * @description wrapper around the fisthones/d3 view for psm
 */
  .factory('MatchesFishtonesPsmSpectrumView', function (_, fishtones) {
    var MatchesFishtonesPsmSpectrumView = function (elm, ftPSM) {
      var _this = this;


      var psm = new fishtones.match.PSMAlignment({
        richSequence: ftPSM.richSeq,
        expSpectrum: ftPSM.spectrum
      });
      new fishtones.match.MatchSpectrumView({
        model    : psm,
        el: elm,
        tol      : 1000,
        xZoomable: true
      }).render();

      return _this;
    };

    return MatchesFishtonesPsmSpectrumView;
  })
/**
 * @ngdoc object
 * @name  matches.view:MatchesFishtonesSSMSpectrumView
 * @description wrapper around the fisthones/d3 view for SSM
 */
  .factory('MatchesFishtonesSSMSpectrumView', function (_, fishtones, fishtonifyService) {
    var MatchesFishtonesSSMSpectrumView = function (elm, ssm) {
      var _this = this;
      var alg = new fishtones.match.SpectraPairAlignment({
        spectrumA: fishtonifyService.convertSpectrum(ssm.sp1),
        spectrumB: fishtonifyService.convertSpectrum(ssm.sp2)
      });

      var view = new fishtones.match.SpectraPairAlignmentView({
        el      : elm,
        model   : alg,
        fragTol : 50,
        enhanced: true
      });

      view.xZoomable()
      view.render();

      return _this;
    };

    return MatchesFishtonesSSMSpectrumView;
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesPsmSpectrum
 * @description display a fishtones PSM spectrum view
 */
  .directive('matchesFishtonesPsmSpectrum', function (pviz, MatchesFishtonesPsmSpectrumView) {
    var link = function (scope, elm) {
      var view = new MatchesFishtonesPsmSpectrumView(elm, scope.fishtonespsm);

    };
    return {
      link: link,
      scope: {
        'fishtonespsm': '='
      },
      restrict: 'A',
      template: '<div ></div>'
    };
  })
/**
 * @ngdoc directive
 * @name matches.directive:matchesFishtonesSsms
 * @description a list of SSM
 */
  .directive('matchesFishtonesSsm', function (pviz, MatchesFishtonesSSMSpectrumView) {
    var link = function (scope, elm) {
      var view = new MatchesFishtonesSSMSpectrumView(elm, scope['fishtonesssm']);

    };
    return {
      link: link,
      scope: {
        'fishtonesssm': '='
      },
      restrict: 'A',
      template: '<div ></div>'
    };
  })
;
