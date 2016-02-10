'use strict';
angular.module('searches-list', ['thirdparties', 'environment'])
/**
 * @ngdoc service
 * @name matches.service:searchService
 * @description
 * Access to Searches
 *
 */
  .service('searchService', function (httpProxy) {
    var SearchService = function () {
      return this;
    };

    /**
     * @ngdoc method
     * @name matches.service:searchService#findAllSearchIds
     * @methodOf matches.service:searchService
     * @description get the list of all searchIds
     * @returns {httpPromise} of an array of string
     */
    SearchService.prototype.list = function () {
      return httpProxy.get('/search');
    };

    return new SearchService();
  })

  .controller('SearchListCtrl', function($scope, searchService, $location, _){
    searchService.list().then(function(data){
      // to make the sorting back compatible (to times without the creationDate), we reverse the data before sorting it
      $scope.searches = _.sortBy(data.reverse(), 'creationDate');
    });

    $scope.ids= [];
    $scope.selectedIds = [];
    $scope.searchIds='';
    $scope.titles='';

    $scope.addId = function($index){
      $scope.ids.push($index);
    };
    $scope.updateId= function($index){
      var i=$scope.selectedIds.indexOf($index);
      if(i> -1){
        $scope.selectedIds.splice(i,1);
      }
      else{
        $scope.selectedIds.push($index);
      }
    };

    $scope.getSearchIds = function(){
      var searchIdList = [];

      //obtain search object
      $scope.selectedIds.forEach(function(entry) {
        var s= $scope.searches[entry];
        searchIdList.push({id: s.searchId, title: s.title});
      });

      var sortedSearchIdList = _.sortBy(searchIdList, function(s){return s.id;}).reverse();

      $scope.searchIds = _.pluck(sortedSearchIdList, 'id').join(',');
      $scope.titles = _.pluck(sortedSearchIdList, 'title').join(',');

      var comparePath= 'compare/'.concat($scope.searchIds);
      $location.path(comparePath).search({param:$scope.titles});

    };

    $scope.checkAll = function () {

      $scope.ids.forEach(function (item) {
        //set true
        $scope.ids[item].checked = true ;
        //add to selected
        $scope.selectedIds.push(item);
      });
    };


});

