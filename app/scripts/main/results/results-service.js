'use strict';
angular.module('results-services', ['thirdparties', 'environment'])

  .service('resultsService', function (httpProxy) {
    var BasketServices = function () {
      return this;
    };

    BasketServices.prototype.list = function () {
      return httpProxy.get('/basket');
    };

    return new BasketServices();
  })

;
