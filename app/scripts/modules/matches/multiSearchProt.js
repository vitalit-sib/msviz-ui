'use strict';
angular.module('multi-matches-search', ['thirdparties', 'environment'])


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
     * @description get the list of all proteins by searchIds
     * @returns {httpPromise} of an array of maps[SearchId,ProteinIdent]
     */
    MultiSearchService.prototype.findByMultiSearchId = function (searchIds) {
      return httpProxy.get('/compare/' + searchIds);
    };

    return new MultiSearchService();
  })

  .controller('MultiSearchListCtrl', function($scope,$routeParams, multiSearchService, MultiProteinMatch) {
    $scope.searchIds = $routeParams.searchIds.split(',');
    multiSearchService.findByMultiSearchId($routeParams.searchIds).then(function (data) {
      $scope.proteins = new MultiProteinMatch(data);
    });
  })

  .directive('sibMultiSearchCell', function() {
    return {
      templateUrl: 'views/matches/searches/multiSearchProteins-cell.html'
    };
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

      var maxScore = 0;

      // compute max score
      var acs = Object.keys(mpm);
      acs.forEach(function(ac){
        var searchIds = Object.keys(mpm[ac]);

        searchIds.forEach(function(searchId){
          var currentScore = mpm[ac][searchId].mainProt.score.mainScore;
          if(currentScore > maxScore){
            maxScore = currentScore;
          }
        });
      });

      maxScore = Math.sqrt(maxScore);

      // compute rgb factors
      _this._colFactorR = (255 - 0xA1)/maxScore;
      _this._colFactorG = (255 - 0xD3)/maxScore;
      _this._colFactorB = (255 - 0x8D)/maxScore;

      _this._maxScore = maxScore;

      return _this;
    };


    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getACs
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description the list Protein ACs
     * @return {Array} list of ProteinACs
     */
    MultiProteinMatch.prototype.getACandScores = _.memoize(function (searchIds) {
      var self = this;
      var acs = Object.keys(self._multiProteinMatch);

      var acAndScore = [];

      acs.forEach(function(ac){
        var protIdents = MultiProteinMatch.prototype.getProteinIdents.apply(self, [ac, searchIds]);

        var scoreSum = 0;
        protIdents.forEach(function(oneProtIdent){
          if(oneProtIdent){
            scoreSum += oneProtIdent.mainProt.score.mainScore;
            //scoreSum += oneProtIdent.mainProt.nrPsms;
          }
        });

        var oneEntry = {
          ac: ac,
          score: scoreSum
        };

        acAndScore.push(oneEntry);
      });

      return acAndScore;

    });

    /**
     * @ngdoc method
     * @name multi-matches.object:MultiProteinMatch:getProteinIdents
     * @methodOf multi-matches.object:MultiProteinMatch
     * @description get proteinIdents for a given AC and a list of SearchIds
     * @return {Array} list of ProteinIdents
     */
    MultiProteinMatch.prototype.getProteinIdents = function (proteinAC, searchIds) {
      var searchProtIdents = this._multiProteinMatch[proteinAC];
      var protIdents = [];

      searchIds.forEach(function(searchId){
        if(searchProtIdents[searchId]){
          protIdents.push(searchProtIdents[searchId]);
        }else{
          protIdents.push(null);
        }
      });

      return protIdents;
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
