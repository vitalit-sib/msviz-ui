'use strict';
angular.module('table-expand-service', ['thirdparties', 'environment'])

  .factory('TableExpandedService', function (_) {
      // create an empty object of the status
    var status = [];

    return {
      notifyOnChange: function (id, callback) {
        status.push({itemId: id, callback: callback});
      },

      setStatus: function(id, isExpanded) {
        // look if the given id is already set
        var el = _.find(status, function(x) {return x.itemId === id; });
        if(el){
          el.callback(isExpanded);
        }else{
          console.log('Warning: no callback for id ['+ id + '] in table-expand-service');
        }
      }
    };


  });
