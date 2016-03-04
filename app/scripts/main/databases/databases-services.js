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
      return httpProxy.put('/sequences/' + sourceId + '/fasta');
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
