'use strict';
angular.module('matches-search-results-filter', ['thirdparties', 'matches-search'])
/**
 * @ngdoc object
 * @name matches.SearchResultsFilter:SearchResultsFilter
 * @description
 * It shall define all what is available from a view page.
 *
 * A bean containing all what is to restrict a search results:
 * * searches
 * * modification
 * * proteinAC
 *
 * It will contain selected values, but also the selected one.
 * And selecting a few searches will have an effect on available modifications and then protein
 * This will be some "active" bean, as setting one will trigger the available other and so on
 *
 * @params {Object} opts optinal arguments
 * * onComplete:function(this) will be call once all the field have been set
 */
  .factory('SearchResultsFilter', function (_, SearchSet, searchService, psmService) {
    var SearchResultsFilter = function (opts) {
      var _this = this;

      opts = _.extend({}, opts);

      _this.onComplete = opts.onComplete;

      _this._selected = {
        searches: new SearchSet()
      };

      _this._available = {
        searches: new SearchSet()
      };
      _this.init();
      return _this;

    };


    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#init
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description launches the init process. Clean up properties and populate the searches
     * @return {HttpPromise} a promise of this
     *
     */
    SearchResultsFilter.prototype.init = function () {
      var _this = this;

      _this._available.searches.clear();
      _this._available.modifications = undefined;
      _this._available.proteins = undefined;

      _this._selected.modification = undefined;
      _this._selected.protein = undefined;

      return searchService.list().then(function (searches) {
        return _this._available.searches.add(searches);
      });
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#countAvailableSearches
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description return a list of searchIds (or a join string)
     * @return {Number}
     *
     */
    SearchResultsFilter.prototype.countAvailableSearches = function () {
      return _.size(this._available.searches.size());
    };


    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#getSelectedSearchIds
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description return a list of searchIds (or a join string)
     * @params {String} joinWith if present, build a string
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.getSelectedSearchIds = function (joinWith) {
      return this._selected.searches.listIds(joinWith);
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#addSelectedSearch
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description add one search to the list of selected
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.addSelectedSearch = function (search) {
      var _this = this;

      _this._selected.searches.add(search);
      _this.updateSelectedSearches();

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#removeSelectedSearch
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description remove one search from the list
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.removeSelectedSearch = function (search) {
      var _this = this;

      _this._selected.searches.remove(search);
      _this.updateSelectedSearches();

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#updateSelectedSearches
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description setup modifications and protein list according to the selected searches
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.updateSelectedSearches = function () {
      var _this = this;
      var searchIds = _this.getSelectedSearchIds();

      if (_.size(searchIds) === 0) {
        delete _this._available.modifications;
        delete _this._available.proteins;
        return _this;
      }

      psmService.findAllModificationsBySearchIds(searchIds)
        .then(function (modifCount) {
          var tmp = [{value: undefined, name: 'any', count: undefined}];
          _.each(modifCount, function (count, modif) {
            tmp.push({value: modif, name: modif, count: count});
          });
          _this._available.modifications = tmp;
        });

      return _this;
    };


    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#setSelectedModification
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description set the selected modification name
     * @param {String} modif modification name
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.setSelectedModification = function (modif) {
      var _this = this;

      _this._selected.modification = modif;

      _this.updateSelectedModification();

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#getSelectedModification
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description get the selected modification name
     * @return {String} modif name
     *
     */
    SearchResultsFilter.prototype.getSelectedModification = function () {
      return this._selected.modification;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#updateSelectedModification
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description pipe the info of the selected modification
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.updateSelectedModification = function () {
      var _this = this;

      psmService.findAllProteinRefsBySearchIds(_this.getSelectedSearchIds(), _this._selected.modification)
        .then(function (lProt) {
          _this._available.proteins = lProt;
        });

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#setSelectedProtein
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description get the selected modification name
     * @param {Object} protein ref
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.setSelectedProtein = function (protRef) {
      var _this = this;

      _this._selected.protein = protRef;
      _this.updateSelectedProtein();

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#getSelectedProtein
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description get the selected modification name
     * @return {String} modif name
     *
     */
    SearchResultsFilter.prototype.getSelectedProtein = function () {
      return this._selected.protein;
    };


    /**
     * @ngdoc function
     * @name matches.SearchResultsFilter:SearchResultsFilter#updateSelectedProtein
     * @methodOf matches.SearchResultsFilter:SearchResultsFilter
     * @description pipe the info of the selected protein
     * @return {SearchResultsFilter} this
     *
     */
    SearchResultsFilter.prototype.updateSelectedProtein = function () {
      var _this = this;

      if (_this.onComplete) {
        _this.onComplete(_this);
      }
      return _this;
    };
    return SearchResultsFilter;

  })
  .directive('searchResultsFilter', function () {
    var link = function () {
    };

    return {
      link: link,
      restrict: 'E',
      scope: {
        filter: '='
      },
      templateUrl: 'views/matches/searches/search-results-filter.html'
    };


  });
