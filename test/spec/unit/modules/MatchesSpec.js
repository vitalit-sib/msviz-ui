'use strict';

describe('eqtl', function () {
  var psmService, SearchIdSet, EnvConfig;
  var $httpBackend, $rootScope, _;

  beforeEach(module('matches'));
  beforeEach(module('environment'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    psmService = $injector.get('psmService');
    SearchIdSet = $injector.get('SearchIdSet');
    EnvConfig = $injector.get('EnvConfig');

    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    EnvConfig.backendUrl = 'http://pipo.com/backend';
    $httpBackend.when('GET', 'http://pipo.com/backend/eqtl/by-snp/indel:1D_17_44125277')
      .respond(mockEqtls);
  }));

  describe('SearchIdSet', function () {
    it('constructor', function () {
      expect(SearchIdSet).not.toBeUndefined();
    });


  });

  describe('psmService', function () {
    it('service is available', function () {
      expect(psmService).not.toBeUndefined();
    });
  });

  var mockEqtls = {
    centric: 'SNP',
    list: [
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000176681",
          "name": "LRRC37A",
          "range": {
            "chromosome": "chr17",
            "start": 44370099,
            "end": 44415160
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 44370099
        },
        "expression": {
          "rValue": 0.51592531375855,
          "pValue": 1.01573153315139e-26
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000214425",
          "name": "AC091132.3",
          "range": {
            "chromosome": "chr17",
            "start": 43578685,
            "end": 43595264
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 43595264
        },
        "expression": {
          "rValue": -0.512019443213874,
          "pValue": 2.80753737658392e-26
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000238083",
          "name": "LRRC37A2",
          "range": {
            "chromosome": "chr17",
            "start": 44588877,
            "end": 44633016
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 44588877
        },
        "expression": {
          "rValue": 0.424380591152889,
          "pValue": 1.00793257112411e-17
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000108433",
          "name": "GOSR2",
          "range": {
            "chromosome": "chr17",
            "start": 45000483,
            "end": 45105003
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 45000483
        },
        "expression": {
          "rValue": -0.342092305451678,
          "pValue": 1.13361309662244e-11
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000108379",
          "name": "WNT3",
          "range": {
            "chromosome": "chr17",
            "start": 44839872,
            "end": 44910520
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 44910520
        },
        "expression": {
          "rValue": 0.340201906405999,
          "pValue": 1.49352801803094e-11
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000120088",
          "name": "CRHR1",
          "range": {
            "chromosome": "chr17",
            "start": 43699267,
            "end": 43913193
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 43699267
        },
        "expression": {
          "rValue": 0.301317547035375,
          "pValue": 2.90429390518737e-9
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000120071",
          "name": "KANSL1",
          "range": {
            "chromosome": "chr17",
            "start": 44107282,
            "end": 44302733
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 44302733
        },
        "expression": {
          "rValue": 0.24569321221339,
          "pValue": 0.0000015694419851101
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000159314",
          "name": "ARHGAP27",
          "range": {
            "chromosome": "chr17",
            "start": 43471275,
            "end": 43511787
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 43511787
        },
        "expression": {
          "rValue": -0.237330183223965,
          "pValue": 0.00000358920950360392
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000167159",
          "name": "C17orf69",
          "range": {
            "chromosome": "chr17",
            "start": 43717670,
            "end": 43719667
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 43717670
        },
        "expression": {
          "rValue": 0.232240619615657,
          "pValue": 0.00000585191397967962
        }
      },
      {
        "snp": {
          "id": "indel:1D_17_44125277",
          "position": {
            "chromosome": "chr17",
            "position": 44125277
          },
          "isInsertion": true
        },
        "gene": {
          "id": "ENSG00000073969",
          "name": "NSF",
          "range": {
            "chromosome": "chr17",
            "start": 44668035,
            "end": 44834830
          }
        },
        "position": {
          "chromosome": "chr17",
          "position": 44668035
        },
        "expression": {
          "rValue": 0.231135872178427,
          "pValue": 0.00000649758448658992
        }
      }
    ]
  };
})
;
