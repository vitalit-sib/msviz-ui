    'use strict';

describe('PSMIsoModif', function () {
  var PSMIsoModif, psmIsoModifBuilder, _;

  beforeEach(module('matches-psm-iso-modif'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    PSMIsoModif = $injector.get('PSMIsoModif');
    psmIsoModifBuilder = $injector.get('psmIsoModifBuilder');
    _ = $injector.get('_');
  }));

  describe('basic', function () {
    it('class', function () {
      expect(PSMIsoModif).not.toBeUndefined();
    });
    it('check mock', function () {
      expect(mockPSMSOSBL82076.length).toBe(57);
    });

  });

  describe('buildList', function () {
    describe('count', function () {
      it('count iso mockPSMS_OSBL8_20_76', function () {
        expect(psmIsoModifBuilder.buildList(mockPSMSOSBL82076).length).toBe(10);
      });
      it('count iso mockPSMS_2psm_1phospho', function () {
        expect(psmIsoModifBuilder.buildList(mockPSMS2psm1phospho).length).toBe(1);
      });
      it('count iso mockPSMS_1psm_1phospho', function () {
        expect(psmIsoModifBuilder.buildList(mockPSMS1psm1phospho).length).toBe(1);
      });
    });
  });

  describe('buildOnePSMIsoModif', function () {
    describe('one psm', function () {
      it('countPSM', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS1psm1phospho);
        expect(isoPSM.countPSM()).toBe(1);
        expect(isoPSM.hasUniquePSM()).toBe(true);
      });
      it('varModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS1psm1phospho);
        expect(isoPSM.getVarModif()).toEqual({});
      });
      it('fixModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS1psm1phospho);
        expect(isoPSM.getFixModif()).toEqual({Phospho: {pos: [11]}});
      });
    });
    describe('two psm', function () {
      it('countPSM', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS2psm1phospho);
        expect(isoPSM.countPSM()).toBe(2);
        expect(isoPSM.hasUniquePSM()).toBe(false);
      });
      it('varModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS2psm1phospho);
        expect(isoPSM.getVarModif()).toEqual({Phospho: {pos: [5,11], count:1}});
      });
      it('fixModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS2psm1phospho);
        expect(isoPSM.getFixModif()).toEqual({});
      });
    });
    describe('three psm', function () {
      it('countPSM', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS3psm1phospho);
        expect(isoPSM.countPSM()).toBe(3);
        expect(isoPSM.hasUniquePSM()).toBe(false);
      });
      it('varModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS3psm1phospho);
        expect(isoPSM.getVarModif()).toEqual({Phospho: {pos: [5,11], count:1}});
      });
      it('fixModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMS3psm1phospho);
        expect(isoPSM.getFixModif()).toEqual({Oxidation:{pos:[5]}});
      });
    });
    describe('3 modif only bug', function(){
      it('countPSM', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMATS1Bug);
        expect(isoPSM.countPSM()).toBe(4);
        expect(isoPSM.hasUniquePSM()).toBe(false);
      });
      it('varModif', function () {
        var isoPSM = psmIsoModifBuilder.buildOnePSMIsoModif(mockPSMATS1Bug);
        expect(isoPSM.getVarModif()).toEqual({Phospho: {pos: [0,1,3,4], count:1}});
      });
    });
  });


  var mockPSMS2psm1phospho = [
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 26.49,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.0107492411083434,
            'Mascot:score': 26.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 2.45,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 2.72507088898863,
            'Mascot:score': 2.45
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    }
  ];
  var mockPSMS3psm1phospho = [
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          ['Oxidation'],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 26.49,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.0107492411083434,
            'Mascot:score': 26.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Oxidation', 'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 2.45,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 2.72507088898863,
            'Mascot:score': 2.45
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          ['Oxidation'],
          [],
          [],
          [],
          [],
          [],
          ['Phospho'],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 89.84,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 9.22371349078278e-09,
            'Mascot:score': 89.84
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    }
  ];
  var mockPSMS1psm1phospho = [
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 26.49,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.0107492411083434,
            'Mascot:score': 26.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    }
  ];

  var mockPSMSOSBL82076 = [
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 26.49,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.0107492411083434,
            'Mascot:score': 26.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 2.45,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 2.72507088898863,
            'Mascot:score': 2.45
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 89.84,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 9.22371349078278e-09,
            'Mascot:score': 89.84
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 54.02,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 3.52294452367453e-05,
            'Mascot:score': 54.02
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 13.05,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.440459320368015,
            'Mascot:score': 13.05
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 8.77,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 1.1800646595013,
            'Mascot:score': 8.77
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 93.98,
          'scoreMap': {
            'Mascot:delta score': 99.99,
            'Mascot:expectation value': 1.91592191176913e-09,
            'Mascot:score': 93.98
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 51.55,
          'scoreMap': {
            'Mascot:delta score': 0.01,
            'Mascot:expectation value': 3.35256961297265e-05,
            'Mascot:score': 51.55
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10677.10677.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2227.12197219,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 90.62,
          'scoreMap': {
            'Mascot:delta score': 99.98,
            'Mascot:expectation value': 3.18668770193528e-09,
            'Mascot:score': 90.62
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12960.12960.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 27.34,
          'scoreMap': {
            'Mascot:expectation value': 0.0084876371366065,
            'Mascot:score': 27.34
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11182.11182.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 2.45,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 2.72507088898863,
            'Mascot:score': 2.45
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.11183.11183.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2306.104287003,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 133.92,
          'scoreMap': {
            'Mascot:delta score': 100,
            'Mascot:expectation value': 3.60500444327003e-13,
            'Mascot:score': 133.92
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.9301.9301.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGKMSQR',
        'molMass': 2744.365072787,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Oxidation'
          ],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 70.21,
          'scoreMap': {
            'Mascot:expectation value': 2.61094608757973e-07,
            'Mascot:score': 70.21
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'Q',
          'startPos': 21,
          'endPos': 46,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10550.10550.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 54.32,
          'scoreMap': {
            'Mascot:expectation value': 2.07941467382123e-05,
            'Mascot:score': 54.32
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10676.10676.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2227.12197219,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 52.71,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 2.21617424942274e-05,
            'Mascot:score': 52.71
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10676.10676.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2227.12197219,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 98.82,
          'scoreMap': {
            'Mascot:delta score': 100,
            'Mascot:expectation value': 5.42755089178412e-10,
            'Mascot:score': 98.82
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.13260.13260.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 23.73,
          'scoreMap': {
            'Mascot:expectation value': 0.0128081263842706,
            'Mascot:score': 23.73
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10677.10677.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2227.12197219,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 54.12,
          'scoreMap': {
            'Mascot:delta score': 0.02,
            'Mascot:expectation value': 1.42344110976375e-05,
            'Mascot:score': 54.12
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10987.10987.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 70.25,
          'scoreMap': {
            'Mascot:expectation value': 4.49151241378905e-07,
            'Mascot:score': 70.25
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12741.12741.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 47.49,
          'scoreMap': {
            'Mascot:expectation value': 5.92518895130168e-05,
            'Mascot:score': 47.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10395.10395.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 98.58,
          'scoreMap': {
            'Mascot:expectation value': 5.71608271080166e-10,
            'Mascot:score': 98.58
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.10956.10956.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DVLGPSTVVANSDESQLLTPGK',
        'molMass': 2226.137956605,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 118.3,
          'scoreMap': {
            'Mascot:expectation value': 8.09705155202685e-12,
            'Mascot:score': 118.3
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'M',
          'startPos': 21,
          'endPos': 42,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7140.7140.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 2976.4365982350005,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 15.34,
          'scoreMap': {
            'Mascot:expectation value': 0.0363773454546937,
            'Mascot:score': 15.34
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7551.7551.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 16.49,
          'scoreMap': {
            'Mascot:delta score': 21.07,
            'Mascot:expectation value': 0.0283830919623188,
            'Mascot:score': 16.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7496.7496.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3056.4029286330006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 50.57,
          'scoreMap': {
            'Mascot:delta score': 49.84,
            'Mascot:expectation value': 1.81155658632859e-05,
            'Mascot:score': 50.57
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7496.7496.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3056.4029286330006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 50.57,
          'scoreMap': {
            'Mascot:delta score': 49.84,
            'Mascot:expectation value': 1.81155658632859e-05,
            'Mascot:score': 50.57
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.5391.5391.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTK',
        'molMass': 905.4494477690001,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 24.68,
          'scoreMap': {
            'Mascot:expectation value': 0.0048442171663332,
            'Mascot:score': 24.68
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'D',
          'startPos': 50,
          'endPos': 57,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7551.7551.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 10.79,
          'scoreMap': {
            'Mascot:delta score': 5.67,
            'Mascot:expectation value': 0.105453185747062,
            'Mascot:score': 10.79
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7551.7551.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 11.8,
          'scoreMap': {
            'Mascot:delta score': 7.15,
            'Mascot:expectation value': 0.0835717900079513,
            'Mascot:score': 11.8
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7551.7551.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 16.49,
          'scoreMap': {
            'Mascot:expectation value': 0.0283830919623188,
            'Mascot:score': 16.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7551.7551.5',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 16.49,
          'scoreMap': {
            'Mascot:delta score': 21.07,
            'Mascot:expectation value': 0.0283830919623188,
            'Mascot:score': 16.49
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 5,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7496.7496.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3056.4029286330006,
        'modificationNames': [
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 50.57,
          'scoreMap': {
            'Mascot:expectation value': 1.81155658632859e-05,
            'Mascot:score': 50.57
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7584.7584.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 14.3,
          'scoreMap': {
            'Mascot:delta score': 1.63,
            'Mascot:expectation value': 0.0552097784452108,
            'Mascot:score': 14.3
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7584.7584.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 23.65,
          'scoreMap': {
            'Mascot:delta score': 14.07,
            'Mascot:expectation value': 0.00641233206456226,
            'Mascot:score': 23.65
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7584.7584.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 27.69,
          'scoreMap': {
            'Mascot:expectation value': 0.00252939120619803,
            'Mascot:score': 27.69
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7584.7584.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 27.69,
          'scoreMap': {
            'Mascot:delta score': 35.66,
            'Mascot:expectation value': 0.00252939120619803,
            'Mascot:score': 27.69
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7584.7584.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3057.3869442180007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [
            'Deamidated'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 27.69,
          'scoreMap': {
            'Mascot:delta score': 35.66,
            'Mascot:expectation value': 0.00252939120619803,
            'Mascot:score': 27.69
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7496.7496.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3056.4029286330006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 12.23,
          'scoreMap': {
            'Mascot:delta score': 0.01,
            'Mascot:expectation value': 0.123609515547919,
            'Mascot:score': 12.23
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 5,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7496.7496.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
        'molMass': 3056.4029286330006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 28.33,
          'scoreMap': {
            'Mascot:delta score': 0.3,
            'Mascot:expectation value': 0.00303425379878985,
            'Mascot:score': 28.33
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 50,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.6549.6549.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 77.52,
          'scoreMap': {
            'Mascot:expectation value': 7.20352063099201e-08,
            'Mascot:score': 77.52
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.8593.8593.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 35.47,
          'scoreMap': {
            'Mascot:expectation value': 0.000471712303932274,
            'Mascot:score': 35.47
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7316.7316.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 45.07,
          'scoreMap': {
            'Mascot:delta score': 32.5,
            'Mascot:expectation value': 6.15024057798471e-05,
            'Mascot:score': 45.07
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7316.7316.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 39.77,
          'scoreMap': {
            'Mascot:delta score': 9.59,
            'Mascot:expectation value': 0.000208397307870031,
            'Mascot:score': 39.77
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7316.7316.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 29.6,
          'scoreMap': {
            'Mascot:delta score': 0.92,
            'Mascot:expectation value': 0.00216716562958532,
            'Mascot:score': 29.6
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7236.7236.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 76.26,
          'scoreMap': {
            'Mascot:delta score': 96.69,
            'Mascot:expectation value': 7.07331182628904e-08,
            'Mascot:score': 76.26
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7236.7236.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 60.76,
          'scoreMap': {
            'Mascot:delta score': 2.72,
            'Mascot:expectation value': 2.50970574219155e-06,
            'Mascot:score': 60.76
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7236.7236.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 54.08,
          'scoreMap': {
            'Mascot:delta score': 0.59,
            'Mascot:expectation value': 1.1684840923991e-05,
            'Mascot:score': 54.08
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7236.7236.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 31.89,
          'scoreMap': {
            'Mascot:delta score': 0,
            'Mascot:expectation value': 0.00193474086298638,
            'Mascot:score': 31.89
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7227.7227.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 52.91,
          'scoreMap': {
            'Mascot:delta score': 69.51,
            'Mascot:expectation value': 1.09310858293723e-05,
            'Mascot:score': 52.91
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7227.7227.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 49.1,
          'scoreMap': {
            'Mascot:delta score': 28.91,
            'Mascot:expectation value': 2.62822961318257e-05,
            'Mascot:score': 49.1
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7227.7227.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 36.23,
          'scoreMap': {
            'Mascot:delta score': 1.49,
            'Mascot:expectation value': 0.000508936154926163,
            'Mascot:score': 36.23
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7316.7316.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 47.51,
          'scoreMap': {
            'Mascot:delta score': 56.99,
            'Mascot:expectation value': 3.50664744349818e-05,
            'Mascot:score': 47.51
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.6524.6524.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 32.29,
          'scoreMap': {
            'Mascot:expectation value': 0.000937104027360688,
            'Mascot:score': 32.29
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.6851.6851.3',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 66.42,
          'scoreMap': {
            'Mascot:expectation value': 3.66714011860562e-06,
            'Mascot:score': 66.42
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 3,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.6817.6817.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 55.96,
          'scoreMap': {
            'Mascot:expectation value': 6.11152094290315e-05,
            'Mascot:score': 55.96
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7732.7732.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2088.9977151520006,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 46.22,
          'scoreMap': {
            'Mascot:expectation value': 0.00015628795348485,
            'Mascot:score': 46.22
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.7227.7227.4',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'DLHQPSLSPASPHSQGFER',
        'molMass': 2168.9640455500007,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 23.52,
          'scoreMap': {
            'Mascot:delta score': 0.08,
            'Mascot:expectation value': 0.00949868103485677,
            'Mascot:score': 23.52
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 4,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'OSBL8_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'K',
          'nextAA': 'G',
          'startPos': 58,
          'endPos': 76,
          'isDecoy': false
        }
      ]
    }
  ];

  var mockPSMATS1Bug = [
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12478.12478.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'YSGSSAALERIR',
        'molMass': 1388.64494325,
        'modificationNames': [
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 16.17,
          'scoreMap': {
            'Mascot:delta score': 56.28,
            'Mascot:expectation value': 0.0304092356671178,
            'Mascot:score': 16.17
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 1,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'ATS1_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'R',
          'nextAA': 'S',
          'startPos': 801,
          'endPos': 812,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12478.12478.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'YSGSSAALERIR',
        'molMass': 1388.64494325,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 10.61,
          'scoreMap': {
            'Mascot:delta score': 15.64,
            'Mascot:expectation value': 0.109397023138399,
            'Mascot:score': 10.61
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 2,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'ATS1_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'R',
          'nextAA': 'S',
          'startPos': 801,
          'endPos': 812,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12478.12478.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'YSGSSAALERIR',
        'molMass': 1388.64494325,
        'modificationNames': [
          [],
          [],
          [],
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 10.61,
          'scoreMap': {
            'Mascot:delta score': 15.64,
            'Mascot:expectation value': 0.109397023138399,
            'Mascot:score': 10.61
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 3,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'ATS1_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'R',
          'nextAA': 'S',
          'startPos': 801,
          'endPos': 812,
          'isDecoy': false
        }
      ]
    },
    {
      'searchId': 'mascot:F002453',
      'spectrumId': {
        'id': '20150318_Petricevic_7371A.12478.12478.2',
        'runId': 'mascot:F002453'
      },
      'pep': {
        'sequence': 'YSGSSAALERIR',
        'molMass': 1388.64494325,
        'modificationNames': [
          [],
          [
            'Phospho'
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      },
      'matchInfo': {
        'score': {
          'mainScore': 10.61,
          'scoreMap': {
            'Mascot:expectation value': 0.109397023138399,
            'Mascot:score': 10.61
          }
        },
        'numMissedCleavages': -1,
        'massDiff': -1,
        'rank': 4,
        'totalNumIons': -1,
        'chargeState': 2,
        'isRejected': false
      },
      'proteinList': [
        {
          'proteinRef': {
            'AC': 'ATS1_HUMAN',
            'identifiers': [],
            'source': 'SwissProt_2014_08.fasta'
          },
          'previousAA': 'R',
          'nextAA': 'S',
          'startPos': 801,
          'endPos': 812,
          'isDecoy': false
        }
      ]
    }
  ];
});
