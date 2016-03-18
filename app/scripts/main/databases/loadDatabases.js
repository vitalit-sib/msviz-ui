'use strict';
angular.module('database-upload', ['thirdparties', 'environment'])

  .service('FileUpload', function (httpProxy) {
    //this.uploadFileToUrl = function(file, uploadUrl){
    //  var fd = new FormData();
    //  fd.append('file', file);
    //
    //  //var objFile={title:'why'};
    //  return $http.post(uploadUrl, file, {
    //    //withCredentials: true,
    //    transformRequest: angular.identity,
    //    headers: {'Content-Type': 'text/plain'}
    //  });
    //};
    var FileUpload = function () {
      return this;
    };
    FileUpload.prototype.loadQcSummary = function (sourceId) {
      console.log("holaaa")
      return httpProxy.post('/sequences/' + sourceId[0].name + '/fasta', {
        headers: {'Content-Type': 'text/plain'}
      });
    };
    return new FileUpload();
  });
