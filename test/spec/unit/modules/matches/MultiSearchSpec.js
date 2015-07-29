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
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm._colFactorR).toEqual(2.143836019980287);
        expect(pm._colFactorG).toEqual(1.0034977114801344);
        expect(pm._colFactorB).toEqual(2.599971343380348);
      });

      it('getInfos', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getInfos(['mascot:F001303', 'dummy'])).not.toBeUndefined();
        expect(pm.getInfos(['mascot:F001303', 'dummy'])[0]).toEqual({ ac: 'SAHH_MOUSE', source: 'SDB_SwissProt_ID', score: 1922.527586206896 });
        expect(pm.getInfos(['mascot:F001303', 'mascot:F001304'])[2]).toEqual({ ac: 'ST1A1_MOUSE', source: 'SDB_SwissProt_ID', score: 650.5046153846149 });
      });

      it('getProteinIdents()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])).not.toBeUndefined();
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy']).length).toEqual(2);
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[0].searchId).toEqual('mascot:F001303');
        expect(pm.getProteinIdents('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[1]).toEqual(null);
      });

      it('getProteinInfoValues()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getProteinInfoValues('SAHH_MOUSE', ['mascot:F001303', 'dummy'])).not.toBeUndefined();
        expect(pm.getProteinInfoValues('SAHH_MOUSE', ['mascot:F001303', 'dummy']).length).toEqual(6);
        expect(pm.getProteinInfoValues('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[0]).toEqual('1922.53');
        expect(pm.getProteinInfoValues('SAHH_MOUSE', ['mascot:F001303', 'dummy'])[1]).toEqual(null);
      });

      it('getBackgroundColor()', function () {
        var pm = new MultiProteinMatch(mockMultiProtMatch);
        expect(pm.getBackgroundColor()).not.toBeUndefined();
        expect(pm.getBackgroundColor(mockMultiProtMatch.SAHH_MOUSE['mascot:F001303'])).toEqual('background-color:#A2D38D'); // score: max
        expect(pm.getBackgroundColor(mockMultiProtMatch.SAHH_MOUSE.nonExistent)).toEqual('background-color:#F2DEDE'); // score: non-existant
        expect(pm.getBackgroundColor(mockMultiProtMatch.ACPM_MOUSE['mascot:F001303'])).toEqual('background-color:#F4FAF1'); // score: 30.07
        expect(pm.getBackgroundColor(mockMultiProtMatch.ST1A1_MOUSE['mascot:F001303'])).toEqual('background-color:#D7EDCF'); // score: 350.67
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
