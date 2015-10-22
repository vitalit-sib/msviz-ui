'use strict';
angular.module('matches-psms', ['protein-matches-pviz-view', 'psm-service', 'thirdparties', 'environment', 'fishtones-wrapper'])
/**
 * @ngdoc directive
 * @name matches.directive:matchesPsmPviz
 * @description pviz one protein among multiple searches
 */
  .directive('matchesPsmPviz', function (pviz, ProteinMatchesGlobalPvizView, fishtones, fishtonifyService, spectrumService) {

    console.log('directive');
    var addSelectedPSM = function(scope, pvizPsm){
      pvizPsm.fishTones = fishtonifyService.buildRichSeq(pvizPsm);

      pvizPsm.fishTones.theoMoz = fishtones.dry.MassBuilder.computeMassRichSequence(pvizPsm.fishTones.richSeq);
      spectrumService.findByRunIdAndId(pvizPsm.spectrumId.runId, pvizPsm.spectrumId.id).then(function (spectrum) {
        var sp = fishtonifyService.convertSpectrum(spectrum);
        pvizPsm.fishTones.spectrum = sp;
        scope.$broadcast('basket-add', {type: 'psm', bean: pvizPsm});
        console.log('shittt vuelta');
      });
    };

    var link = function (scope, elm) {
      pviz.FeatureDisplayer.addMouseoverCallback(['psm'], function (ft) {
        scope.$broadcast('show-match', {type: 'psm', bean: ft.data});
      });
      pviz.FeatureDisplayer.addClickCallback(['psm'], function (ft) {
        addSelectedPSM(scope, ft.data);
        scope.pvizView.addSelPsm(ft.data);
        console.log('pviz');
        //console.log(ft.data);
        console.log('end pviz');
        scope.pvizView.refreshView();
      });
      scope.$watch('proteinMatch', function (protMatch) {
        if (protMatch === undefined) {
          return;
        }
        var view = new ProteinMatchesGlobalPvizView(elm, protMatch);
        scope.pvizView = view;
        return view;
      });

      //Display psms when clicking protein position
      pviz.FeatureDisplayer.addClickCallback(['aaInfo'], function (ft) {
        scope.$broadcast('show-ptm-matches', {pos: ft.data.pos});
      });

      // PTM count behaviours
      pviz.FeatureDisplayer.addClickCallback(['aaModif'], function (ft) {
        scope.$broadcast('show-ptm-matches', {pos: ft.start+1});
      });
      pviz.FeatureDisplayer.addClickCallback(['ptmCount'], function (ft) {
        scope.$broadcast('show-ptm-matches', {pos: ft.data.pos});
      });
      scope.$on('show-ptm-matches', function (undefined, args) {
        scope.pvizView.setSelPsmPos(args.pos);
        scope.pvizView.refreshView();
      });

      scope.$on('basket-remove', function (undefined, args) {
        scope.pvizView.removeSelPsm(args);
        scope.pvizView.refreshView();
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

    $scope.expandOtherMatchTable = function () {
      $scope.tableExpanded = $scope.tableExpanded?false:true;
    };
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
      templateUrl: 'scripts/main/compare/protein/basket/matches-psm-box.html'
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
      templateUrl: 'scripts/main/compare/protein/alignment/matches-one-liner.html'
    };
  })
;
