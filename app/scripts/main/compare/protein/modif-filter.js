  'use strict';
angular.module('matches-modif-filter', ['thirdparties', 'searches-list'])
/**
 * @ngdoc object
 * @name matches.ModifFilter:ModifFilter
 * @description
 *
 * A bean to restrict a search results on modification
 *
 * It will contain selected values, but also the selected one.
 * And selecting a few searches will have an effect on available modifications and then protein
 * This will be some "active" bean, as setting one will trigger the available other and so on
 *
 * @params {Object} opts optinal arguments
 * * onComplete:function(this) will be call once all the field have been set
 */
  .factory('ModifFilter', function (_, psmService) { //NOSONAR

    var ModifFilter = function (opts) {
      var _this = this;

      opts = _.extend({}, opts);
      _this.onComplete = opts.onComplete;

      _this._searchIds = opts.searchIds;

      _this.init();

      return _this;

    };

    /**
     * @ngdoc function
     * @name matches.ModifFilter:ModifFilter#init
     * @methodOf matches.ModifFilter:ModifFilter
     * @description launches the init process. Clean up properties and populate the searches
     * @return {HttpPromise} a promise of this
     *
     */
    ModifFilter.prototype.init = function () {
      var _this = this;

      _this._availableModifications = undefined;

      _this._selectedModification = undefined;

      return psmService.findAllModificationsBySearchIds(_this._searchIds)
        .then(function (modifCount) {
          var tmp = [{value: undefined, name: 'None', count: undefined}];
          _.each(modifCount, function (count, modif) {
            tmp.push({value: modif, name: modif, count: count});
          });
          _this._availableModifications = tmp;
        });
    };

    /**
     * @ngdoc function
     * @name matches.ModifFilter:ModifFilter#setSelectedModification
     * @methodOf matches.ModifFilter:ModifFilter
     * @description set the selected modification name
     * @param {String} modif modification name
     * @return {ModifFilter} this
     *
     */
    ModifFilter.prototype.setSelectedModification = function (modif) {
      var _this = this;

      _this._selectedModification = modif;

      psmService.findAllProteinRefsBySearchIds(_this._searchIds, _this._selectedModification).then(function () {
        _this.onComplete(_this);
      });

      return _this;
    };

    /**
     * @ngdoc function
     * @name matches.ModifFilter:ModifFilter#getSelectedModification
     * @methodOf matches.ModifFilter:ModifFilter
     * @description get the selected modification name
     * @return {String} modif name
     *
     */
    ModifFilter.prototype.getSelectedModification = function () {
      return this._selectedModification;
    };

    return ModifFilter;

  })

  .directive('modifFilter', function () {
    var link = function () {
    };

    return {
      link: link,
      restrict: 'E',
      scope: {
        filter: '='
      },
      templateUrl: 'scripts/main/compare/protein/modif-filter.html'
    };


  });
