'use strict';
angular.module('multi-searches', ['thirdparties', 'environment','matches-modif-filter'])

/**
 * @ngdoc service
 * @name multi-matches.service:multiSearchService
 * @description
 * Access to Searches
 *
 */
  .service('multiSearchService', function (httpProxy) {
    var MultiSearchService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#findByMultiSearchId
     * @methodOf multi-matches.service:multiSearchService
     * @description get the list of all proteinRefs by searchIds
     * @returns {httpPromise} of an array of ProteinRefs
     */
    MultiSearchService.prototype.findByMultiSearchId = function (searchIds, withModif) {
      return httpProxy.get('/compare/' + searchIds + withModif);
    };


    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#prepareAmountProteins
     * @methodOf multi-matches.service:multiSearchService
     * @description get amount of proteins per searchId
     * @returns complex object
     */
    MultiSearchService.prototype.prepareAmountProteins = function (data) {
      // object containing results
      var res = {};

      // store amount of proteins in hash
      var amountProteinsHash={};

      // compute max score
      var acs = Object.keys(data);

      acs.forEach(function(ac){
        //console.log(ac);
        var searchIds = Object.keys(data[ac]);
        //console.log(searchIds);
        searchIds.forEach(function(searchId){

          //Save number of proteins foreach searchId
          if (amountProteinsHash.hasOwnProperty(searchId)){
            amountProteinsHash[searchId]=amountProteinsHash[searchId] + 1;
          }
          else {
            amountProteinsHash[searchId]=1;
          }
        });
      });

      return amountProteinsHash;
    };


    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#prepareAmountProteins
     * @methodOf multi-matches.service:multiSearchService
     * @description get amount of proteins per searchId
     * @returns complex object
     */
    MultiSearchService.prototype.prepareInfoMap = function (data, searchIds) {
      var _this = this;

      var acs = Object.keys(data);

      var infos = [];

      acs.forEach(function(ac){
        var protIdents = _this.getProteinIdents.apply(self, [data, ac, searchIds]);

        var scoreSum = 0;
        var source = null;

        protIdents['protIdents'].forEach(function(oneProtIdent){
          if(oneProtIdent){
            scoreSum += oneProtIdent.mainProt.score.mainScore;
            //scoreSum += oneProtIdent.mainProt.nrPsms;
          }
          if(!source && oneProtIdent){
            source = oneProtIdent.mainProt.source;
          }
        });

        var oneProtInfo = {
          ac: ac,
          source: source,
          score: scoreSum,
          datatable: protIdents['datatable']
        };

        infos.push(oneProtInfo);

      });

      return infos;
    };


    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#prepareProteinInfos
     * @methodOf multi-matches.service:multiSearchService
     * @description prepare the Protein data so it can be used in the html
     * @returns complex object
     */
    MultiSearchService.prototype.prepareProteinInfos = function (data, searchIds) {
      var _this = this;

      // object containing results
      var res = {};

      res['amountProteinHash'] = _this.prepareAmountProteins(data);
      res['proteinInfos'] = _this.prepareInfoMap(data, searchIds);

      return res;
    };


    /**
     * @ngdoc method
     * @name multi-matches.object:multiSearchService:getProteinIdents
     * @methodOf multi-matches.service:multiSearchService
     * @description get proteinIdents for a given AC and a list of SearchIds
     * @return {Array} list of ProteinIdents
     */
    MultiSearchService.prototype.getProteinIdents = function (data, proteinAC, searchIds) {
      var res = {};

      var searchProtIdents = data[proteinAC];
      var protIdents = [];
      var scores = [];
      var psms = [];
      var sequences = [];

      searchIds.forEach(function(searchId){

        if(searchProtIdents[searchId]){
          protIdents.push(searchProtIdents[searchId]);
          scores.push(searchProtIdents[searchId].mainProt.score.mainScore.toFixed(0));
          psms.push(searchProtIdents[searchId].mainProt.nrPsms);
          sequences.push(searchProtIdents[searchId].mainProt.nrSequences);
        }else{
          protIdents.push(null);
          scores.push(null);
          psms.push(null);
          sequences.push(null);
        }
      });

      res['datatable'] = scores.concat(psms,sequences);
      res['protIdents'] = protIdents;

      return res;
    };


    return new MultiSearchService();
  })

  .controller('MultiSearchListCtrl', function($scope,$routeParams,$location, multiSearchService, ModifFilter) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    $scope.titles =$location.search().param.split(',');

    multiSearchService.findByMultiSearchId($scope.searchIds,'').then(function (data) {
      $scope.proteins = multiSearchService.prepareProteinInfos(data, $scope.searchIds);
    });

    var showProtein = function () {

      var withModif = ($scope.modifFilter.getSelectedModification()!= undefined)? '?withModif='+ $scope.modifFilter.getSelectedModification():'';

      multiSearchService.findByMultiSearchId($routeParams.searchIds, withModif).then(function (data){
        $scope.proteins = multiSearchService.prepareProteinInfos(data, $scope.searchIds);
      });
    };

    $scope.modifFilter = new ModifFilter({onComplete: showProtein, searchIds:$scope.searchIds});
  })

;
