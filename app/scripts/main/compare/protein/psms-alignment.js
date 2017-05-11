'use strict';
angular.module('psms-alignment', ['matches-modif-filter','matches-protein', 'sequences', 'matches-psms', 'thirdparties', 'environment', 'svg-export'])


  .controller('PsmsAlignmentCtrl', function($scope, $routeParams, $q, psmService, sequenceService, ProteinMatch, ModifFilter, d3, svgExport, $templateCache) {

    // activate popover
    angular.element('#pviz-info-button').popover(
      {
        html: true,
        trigger: 'hover',
        placement: 'right',
        content: function(){return $templateCache.get('pvizPopoverTemplate.html');}
      }
    );

    $scope.exportSvg = function(fileType){

      var svg = d3.select('.pviz')[0][0];

      // get the height of this SVG element
      var height = svg.getBBox().height;
      var width = svg.getBoundingClientRect().width;

      var svgString = svgExport.getSvgString(svg, width, height);

      if(fileType === 'png'){
        // prepare the callback
        var save = function(dataBlob){
          saveAs(dataBlob,'pviz.png');
        };

        // save the PNG
        svgExport.svgString2Png(svgString, width, height, save);
      }else{
        var blob = new Blob([ svgString ], {type: 'image/svg+xml;charset=utf-8'});
        saveAs(blob,'pviz.svg');
      }

    };

    $scope.mouseoverPvizInfo = function(){
      angular.element('#pvizInfoPopover').show();
    };

    $scope.mouseoutPvizPopover = function(){
      angular.element('#pvizInfoPopover').hide();
    };

    $scope.searchIds = $routeParams.searchIds.split(',');
    var acSourcePair = $routeParams.proteinAC.split(':');
    $scope.proteinAC = acSourcePair[0];
    $scope.database = acSourcePair[1];

    $scope.$on('show-xic-emit', function (undefined, args) {
      $scope.$broadcast('show-xic-broadcast', args);

    });


    var getModifList = function(psms){
      var uniqueModifs = {};

      _.each(psms, function(psm){
        if(! psm.matchInfo.isRejected && psm.matchInfo.rank === 1){
          var modifArrays = _.filter(psm.pep.modificationNames, function(modif){
            return modif.length > 0;
          });

          // we assume there is only one modif per position
          _.each(modifArrays, function(modif){
            uniqueModifs[modif[0]] = (! uniqueModifs[modif[0]]) ? (1) : (uniqueModifs[modif[0]] + 1);
          });
        }
      });

      var modifObjs =  _.map(uniqueModifs, function(v, k){
        return { name: k, value: k, count: v};
      });

      return [{ name: 'None', value: undefined, count: undefined}].concat(modifObjs);

    };

    var showProtein = function () {
      sequenceService.getSource($scope.searchIds, $scope.database).then(function(source) {

        $q.all(
          [
            sequenceService.get($scope.proteinAC, source),
            psmService.findAllBySearchIdsAndProteinId($scope.searchIds, $scope.proteinAC)
          ]
        )
          .then(function (args) {
            var modifList = getModifList(args[1]);
            $scope.modifFilter.setModifList(modifList);

            $scope.proteinMatch = new ProteinMatch(args[0], args[1], {targetModification: $scope.modifFilter.getSelectedModification()});
          }, function(){
            $scope.proteinNotFound = $scope.proteinAC;
            $scope.dbNotFound = source;
          });

      });

    };

    $scope.modifFilter = new ModifFilter({onComplete: showProtein, searchIds:$scope.searchIds});

    showProtein();

  })
;
