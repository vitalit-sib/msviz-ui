'use strict';
angular.module('matches-search-results-filter', [])
/**
 * @ngdoc object
 * @name matches.SearchResultsFilter:SearchResultsFilter
 * @description
 * A bean containing all what is to restrict a search results:
 * * searches
 * * modification
 * * proteinAC
 *
 * It shall define all what is available from a view page
 */
  .factory('SearchResultsFilter', function () {
    var SearchResultsFilter = function () {
      var _this= this;


      return _this;
    };

    return SearchResultsFilter;

  });
