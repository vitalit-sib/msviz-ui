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

    SearchService.prototype.deleteMatchInfo = function (searchId) {
        return httpProxy.delete('/search/' + searchId);
    };

    SearchService.prototype.deleteSpectra = function (searchId) {
      return httpProxy.delete('/exp/msrun/' + searchId);
    };

    SearchService.prototype.get = function(searchId){
      return httpProxy.get('/search/' + searchId);
    };

    return new SearchService();
  })

  .controller('SearchListCtrl', function($scope, searchService, $location, _){

    // remove the heading timestamp from SearchIds that failed
    $scope.formatSearchIdError = function(str){
      var done = str.replace(/^(\d+\_)/,'');
      return done;
    };

    // delete the selected searchId
    $scope.deleteOneSearchId = function(searchId){
      searchService.deleteMatchInfo(searchId).then(function(){
        $scope.getSearchList();
      });
    };

    $scope.getSearchList = function(){
      searchService.list().then(function(data){
        $scope.searches =  _.sortBy(data, 'creationDate').reverse();
      });
    };


    $scope.setUploadModal = function(status){
      $scope.selStatus = status;
      $('#uploadModal').modal('show');
    };

    /**
     * get list of available searches and sort them by creation date
     */
    $scope.getSearchList();

    // create empty variables
    $scope.ids= [];
    $scope.selectedIds = [];
    $scope.searchIds='';
    $scope.titles='';

    $scope.addId = function($index){
      $scope.ids.push($index);
    };

    /**
     * add an when selecting a checkbox
     * @param $index
     */
    $scope.updateId= function($index){
      var i=$scope.selectedIds.indexOf($index);
      if(i> -1){
        $scope.selectedIds.splice(i,1);
      }
      else{
        $scope.selectedIds.push($index);
      }
    };

    /**
     * parse the selected searchIds and go to the compare view
     */
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

      var comparePath= '#/compare/'.concat($scope.searchIds).concat('?param=' + $scope.titles);
      //$location.path(comparePath).search({param:$scope.titles});
      window.open(comparePath, '_blank');

    };

    /**
     * delete the selected searchIds
     */
    $scope.deleteSearchIds = function(){
      $scope.showDeletionAlert = true;

      var searchIdList = [];

      //obtain search object
      $scope.selectedIds.forEach(function(entry) {
        var s= $scope.searches[entry];
        searchIdList.push(s.searchId);
      });

      var searchIdString = searchIdList.join(',');

      // first we remove the spectra
      searchService.deleteSpectra(searchIdList).then(function(){
        console.log('spectra deleted');

        // and then we remove the infos
        searchService.deleteMatchInfo(searchIdString).then(function () {
          console.log('match info deleted');
          // reload the list when entries were deleted
          $scope.getSearchList();

          $scope.ids= [];
          $scope.selectedIds = [];
          $scope.searchIds='';
          $scope.titles='';

          // show the right information
          $scope.showDeletionAlert = false;
          $scope.showDeletionFinished = true;
        });

      });


    };

});

