'use strict';
angular.module('databases-services', ['thirdparties', 'environment'])

  .service('databasesService', function (httpProxy) {
    var DatabasesServices = function () {
      return this;
    };

    DatabasesServices.prototype.listFasta = function () {
      return httpProxy.get('/sequences/list-sources');
    };

    DatabasesServices.prototype.addFasta = function(sourceId) {
      return httpProxy.post('/sequences/' + sourceId + '/fasta'
        //,{transformRequest: angular.identity,
        //headers: {'Content-Type': 'text/plain'}}
         );
    };

    DatabasesServices.prototype.deleteFasta = function (sourceId) {
      return httpProxy.delete('/sequences/' + sourceId);
    };

/**
 *

*/
    return new DatabasesServices();
  })

;
