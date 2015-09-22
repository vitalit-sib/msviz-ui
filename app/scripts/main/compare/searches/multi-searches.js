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


      console.log('Buscar refs modificadas');
      return httpProxy.get('/compare/' + searchIds + withModif);
    };

    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#findProteinsByMultiSearchId
     * @methodOf multi-matches.service:multiSearchService
     * @description get the list of all protein by searchIds
     * @returns {httpPromise} of an array of maps[SearchId,ProteinIdent]
     */
    MultiSearchService.prototype.findProteinsByMultiSearchId = function (searchIds) {


      console.log('listar proteinas');
      console.log('searchIds recibidos');
      console.log(searchIds);
      return httpProxy.get('/compare/modifProteins/' + searchIds );
    };

    /**
     * @ngdoc method
     * @name multi-matches.service:multiSearchService#findProteinsByMultiSearchIdAndMultiACs
     * @methodOf multi-matches.service:multiSearchService
     * @description get the list of all protein by searchIds and Acs
     * @returns {httpPromise} of an array of maps[SearchId,ProteinIdent]
     */
    MultiSearchService.prototype.findProteinsByMultiSearchIdAndMultiACs = function (searchIds,acs) {


      console.log('obtener protein Ident');
      //console.log('acs recibidos');
      //console.log(acs);
      //console.log('searchId recibidos');
      //console.log(searchIds);
      var uri = '/compare/' + searchIds + '/by-ac/' + acs;
      return httpProxy.get(uri);
    };

    return new MultiSearchService();
  })

  .controller('MultiSearchListCtrl', function($scope,$routeParams,$location, multiSearchService, MultiProteinMatch, ModifFilter) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    console.log('MultiSearch controller');
    $scope.titles =$location.search().param.split(',');

    multiSearchService.findProteinsByMultiSearchId($routeParams.searchIds).then(function (data) {
      //console.log('proteinas ');
      $scope.proteins = new MultiProteinMatch(data);
      //console.log('proteinas ');
      //console.log($scope.proteins);
    });

    var showProtein = function () {

      var withModif = ($scope.modifFilter.getSelectedModification()!= undefined)? '?withModif='+ $scope.modifFilter.getSelectedModification():'';
      console.log('modif');
      console.log(withModif);

      /*
          var listProteinRefs=multiSearchService.findByMultiSearchId($routeParams.searchIds,withModif);
            //Once we have the list of ProteinRefs, we obtain the map [searchId,ProteinIdent]
            multiSearchService.findProteinsByMultiSearchId(listProteinRefs_.AC).then(function (data){
            $scope.proteins = new MultiProteinMatch(data);
          });
          */
      var acs=[];
      multiSearchService.findByMultiSearchId($routeParams.searchIds,withModif).then(function (data){

        data.forEach(function(ac){
          acs.push(ac.AC);
        });
        multiSearchService.findProteinsByMultiSearchIdAndMultiACs($routeParams.searchIds,acs).then(function(data){
          console.log('protein Ident encontradas');
          console.log(data);
          $scope.proteins = new MultiProteinMatch(data);
          console.log('findProteinsByMultiSearchIdAndMultiACs finitooo');

        });
        console.log('findByMultiSearchId end');
      });
      console.log('end show protein');
    };

    $scope.modifFilter = new ModifFilter({onComplete: showProtein, searchIds:$scope.searchIds});
  })

/**
 * @ngdoc object
 * @name multi-matches.object:MultiProteinMatch
 * @description a multi-match with a protein decription and a map of SearchIds to Protein matches
 * @param {Object} protein the protein AC + Map(SearchIds -> ProteinMatches)
 *
 */
  .factory('MultiProteinMatch', function () {
    var MultiProteinMatch = function (mpm) {
      var _this= this;
      _this._multiProteinMatch = mpm;
      console.log('factory MultiProteinMatch');

      var maxScore = 0;
      var amountProteinsHash={};


      // compute max score
      var acs = Object.keys(mpm);
      console.log('total acs');
      console.log(acs.length);
      acs.forEach(function(ac){
        //console.log(ac);
        var searchIds = Object.keys(mpm[ac]);
        //console.log(searchIds);
        searchIds.forEach(function(searchId){


          //Save number of proteins foreach searchId
          if (amountProteinsHash.hasOwnProperty(searchId)){
            amountProteinsHash[searchId]=amountProteinsHash[searchId] + 1;
          }
          else {
            amountProteinsHash[searchId]=1;
            }
          var currentScore = mpm[ac][searchId].mainProt.score.mainScore;
          if(currentScore > maxScore){
            maxScore = currentScore;
          }
        });
      });

      maxScore = Math.sqrt(maxScore);
      // compute rgb factors (based on #A1D38D as darkest color)
      _this._colFactorR = (255 - 0xA1)/maxScore;
      _this._colFactorG = (255 - 0xD3)/maxScore;
      _this._colFactorB = (255 - 0x8D)/maxScore;

      _this._maxScore = maxScore;
      _this._amountProteinsHash= amountProteinsHash;
      console.log('end factory');
      return _this;
    };


    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getInfo
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description the list Protein infos (AC, source and score)
     * @return {Array} list of Protein infos (AC, source and score)
     */
    MultiProteinMatch.prototype.getInfos = _.memoize(function (searchIds) {
      console.log('get infossss');
      var self = this;
      var acs = Object.keys(self._multiProteinMatch);

      var infos = [];

      acs.forEach(function(ac){
        var protIdents = MultiProteinMatch.prototype.getProteinIdents.apply(self, [ac, searchIds]);

        var scoreSum = 0;
        var source = null;

        protIdents.forEach(function(oneProtIdent){
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
          score: scoreSum
        };

        infos.push(oneProtInfo);
      });

      return infos;

    });

    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getProteinIdents
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description get proteinIdents for a given AC and a list of SearchIds
     * @return {Array} list of ProteinIdents
     */
    MultiProteinMatch.prototype.getProteinIdents = function (proteinAC, searchIds) {
      console.log('en proteins IDs');

      var searchProtIdents = this._multiProteinMatch[proteinAC];
      var protIdents = [];


        searchIds.forEach(function(searchId){

          if(searchProtIdents!==undefined){
            protIdents.push(searchProtIdents[searchId]);
          }else{
            protIdents.push(null);
          }
        });

      return protIdents;
    };

    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getProteinInfoValues
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description get proteinInfoVal for a given AC and a list of SearchIds
     * @return {Array} list of Scores,PSMs,Sequences
     */
    MultiProteinMatch.prototype.getProteinInfoValues = function (proteinAC, searchIds) {

      console.log('en getProteins Infos Values');
      //console.log('ac recibido');
      //console.log(proteinAC);
      var searchProtIdents = this._multiProteinMatch[proteinAC];
      var scores = [];
      var psms = [];
      var sequences = [];
 //console.log('get protein info values');
 //


      //console.log(searchProtIdents);
      searchIds.forEach(function(searchId){
        //console.log('dentro del search');
       //console.log(searchProtIdents);
        if(searchProtIdents!==undefined){
          scores.push(searchProtIdents[searchId].mainProt.score.mainScore.toFixed(0));
          psms.push(searchProtIdents[searchId].mainProt.nrPsms);
          sequences.push(searchProtIdents[searchId].mainProt.nrSequences);
        }else{
          scores.push(null);
          psms.push(null);
          sequences.push(null);
        }
      });
      return scores.concat(psms,sequences);
    };
    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getBackgroundColor
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description get background color according to Mascot score
     * @return {string} color in hex format (without leading #)
     */
    MultiProteinMatch.prototype.getBackgroundColor = function (proteinIdent) {
      var _this = this;

      // default color is white
      var bgCol = 'FFFFFF';

      if(proteinIdent){
        var score = Math.sqrt(proteinIdent.mainProt.score.mainScore);

        var r = 255 - Math.floor(_this._colFactorR * score);
        var g = 255 - Math.floor(_this._colFactorG * score);
        var b = 255 - Math.floor(_this._colFactorB * score);

        var newColor = r*0x10000 + g*0x100 + b;


        bgCol = newColor.toString(16);
      }else{
        // missing color is red
        bgCol = 'F2DEDE';
      }
      return 'background-color:#' + bgCol.toUpperCase();
    };

    return MultiProteinMatch;
  })
;
