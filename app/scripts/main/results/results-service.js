'use strict';
angular.module('results-services', ['thirdparties', 'environment'])

  .service('resultsService', function (httpProxy) {
    var BasketServices = function () {
      return this;
    };

    BasketServices.prototype.list = function () {
      return httpProxy.get('/basket');
    };

    BasketServices.prototype.findBySearchId = function (searchId) {
      return httpProxy.get('/basket/' + searchId);
    };

    BasketServices.prototype.findBySearchIdTsv = function (searchId) {
      return httpProxy.get('/basket/' + searchId, {headers: {
        'Accept': 'application/tsv'
      }
      });
    };

    return new BasketServices();
  })

;
