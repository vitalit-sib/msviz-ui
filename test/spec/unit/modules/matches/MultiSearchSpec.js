'use strict';

describe('setup MultiProteinMatch', function () {
  var MultiProteinMatch, EnvConfig;
  var $httpBackend, $rootScope, _;

  beforeEach(module('multi-matches-search'));
  beforeEach(module('environment'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    MultiProteinMatch = $injector.get('MultiProteinMatch');
    EnvConfig = $injector.get('EnvConfig');

    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    EnvConfig.backendUrl = 'http://pipo.com/backend';

  }));

  describe('MultiProteinMatch', function () {
    describe('constructor', function () {
      it('class', function () {
        expect(MultiProteinMatch).not.toBeUndefined();
      });

      it('getACs()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getACs()).not.toBeUndefined();
        expect(pm.getACs()[0]).toEqual('SAHH_MOUSE');
      });

      it('getProteinIdents()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])).not.toBeUndefined();
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy']).length).toEqual(2);
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[0].searchId).toEqual('mascot:F001303');
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[1]).toEqual(null);
      });

      it('getBackgroundColor()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getBackgroundColor()).not.toBeUndefined();
        expect(pm.getBackgroundColor(mockMultiProtMatch.SAHH_MOUSE['mascot:F001303'])).toEqual('a1d38d'); // score: max
        expect(pm.getBackgroundColor(mockMultiProtMatch.SAHH_MOUSE.nonExistent)).toEqual('FFFFFF'); // score: non-existant
        expect(pm.getBackgroundColor(mockMultiProtMatch.ACPM_MOUSE['mascot:F001303'])).toEqual('fdfefc'); // score: 30.07
        expect(pm.getBackgroundColor(mockMultiProtMatch.ST1A1_MOUSE['mascot:F001303'])).toEqual('dff0d8'); // score: 350.67
      });

    });

  });

var mockMultiProtMatch = {
  'SAHH_MOUSE': {
    'mascot:F001303': {
      'searchId': 'mascot:F001303',
      'mainProt': {
        'proteinAC': 'SAHH_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 1922.527586206896,
          'scoreMap': {}
        },
        'nrSequences': 23,
        'nrPsms': 33,
        'passThreshold': true
      },
      'subsetProts': [
        {
          'proteinAC': 'SAHH2_MOUSE',
          'source': 'SDB_SwissProt_ID',
          'score': {
            'mainScore': 90.5966666666667,
            'scoreMap': {}
          },
          'nrSequences': 3,
          'nrPsms': 3,
          'passThreshold': true
        }
      ]
    },
    'mascot:F001304': {
      'searchId': 'mascot:F001304',
      'mainProt': {
        'proteinAC': 'SAHH_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 779.82,
          'scoreMap': {}
        },
        'nrSequences': 24,
        'nrPsms': 24,
        'passThreshold': true
      },
      'subsetProts': [
        {
          'proteinAC': 'SAHH2_MOUSE',
          'source': 'SDB_SwissProt_ID',
          'score': {
            'mainScore': 96.1266666666667,
            'scoreMap': {}
          },
          'nrSequences': 3,
          'nrPsms': 3,
          'passThreshold': true
        }
      ]
    }
  },
  'ACPM_MOUSE': {
    'mascot:F001303': {
      'searchId': 'mascot:F001303',
      'mainProt': {
        'proteinAC': 'ACPM_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 30.07,
          'scoreMap': {}
        },
        'nrSequences': 1,
        'nrPsms': 1,
        'passThreshold': true
      },
      'subsetProts': []
    },
    'mascot:F001304': {
      'searchId': 'mascot:F001304',
      'mainProt': {
        'proteinAC': 'ACPM_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 27.99,
          'scoreMap': {}
        },
        'nrSequences': 1,
        'nrPsms': 1,
        'passThreshold': true
      },
      'subsetProts': []
    }
  },
  'ST1A1_MOUSE': {
    'mascot:F001303': {
      'searchId': 'mascot:F001303',
      'mainProt': {
        'proteinAC': 'ST1A1_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 350.674615384615,
          'scoreMap': {}
        },
        'nrSequences': 12,
        'nrPsms': 13,
        'passThreshold': true
      },
      'subsetProts': []
    },
    'mascot:F001304': {
      'searchId': 'mascot:F001304',
      'mainProt': {
        'proteinAC': 'ST1A1_MOUSE',
        'source': 'SDB_SwissProt_ID',
        'score': {
          'mainScore': 299.83,
          'scoreMap': {}
        },
        'nrSequences': 9,
        'nrPsms': 10,
        'passThreshold': true
      },
      'subsetProts': []
    }
  }
};

});
