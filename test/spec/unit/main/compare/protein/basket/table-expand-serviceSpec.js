'use strict';

describe('TableExpandedService', function () {
  var TableExpandedService, _;

  beforeEach(module('table-expand-service'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    TableExpandedService = $injector.get('TableExpandedService');
    _ = $injector.get('_');
  }));

  describe('basic', function () {
    it('class', function () {
      expect(TableExpandedService).not.toBeUndefined();
    });

    it('inscribe for callback', function() {
      var testVal;
      var myCallback = function(isExpanded){
        testVal = isExpanded;
      };
      TableExpandedService.notifyOnChange(2, myCallback);
      expect(testVal).toBe(undefined);
    });

    it('inscribe and call true', function(){
      var testVal;
      var myCallback = function(isExpanded){
        testVal = isExpanded;
      };
      TableExpandedService.notifyOnChange(2, myCallback);
      TableExpandedService.setStatus(2, true);
      expect(testVal).toBe(true);
    });

    it('inscribe and call false', function(){
      var testVal;
      var myCallback = function(isExpanded){
        testVal = isExpanded;
      };
      TableExpandedService.notifyOnChange(2, myCallback);
      TableExpandedService.setStatus(2, false);
      expect(testVal).toBe(false);
    });

    it('inscribe and call other', function(){
      var testVal;
      var myCallback = function(isExpanded){
        testVal = isExpanded;
      };
      TableExpandedService.notifyOnChange(2, myCallback);
      TableExpandedService.setStatus(1, true);
      expect(testVal).toBe(undefined);
    });

  });


});
