'use strict';

describe('searches', function () {
  var ProteinMatch, EnvConfig, ProteinMatchesGlobalPvizView;
  var $httpBackend, $rootScope, _;

  beforeEach(module('protein-matches-pviz-view'));
  beforeEach(module('pviz-custom-psm'));
  beforeEach(module('fishtones-wrapper'));
  beforeEach(module('matches-protein'));
  beforeEach(module('environment'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    ProteinMatchesGlobalPvizView = $injector.get('ProteinMatchesGlobalPvizView');
    ProteinMatch = $injector.get('ProteinMatch');
    EnvConfig = $injector.get('EnvConfig');

    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    EnvConfig.backendUrl = 'http://pipo.com/backend';
    //httpBackend.when('GET', 'http://pipo.com/backend/').respond(prout);
  }));

  describe('getFeaturesPSMs', function () {

      it('Phospho selected at 229', function () {
        var pm = new ProteinMatch(mockProtMatch.prot, mockProtMatch.psms, {targetModification: 'Phospho'});
        var pvizView = new ProteinMatchesGlobalPvizView(undefined, pm);
        pvizView._selPsmPos = 229;
        expect(pvizView.getFeaturesPSMs()).not.toBeUndefined();
        expect(pvizView.getFeaturesPSMs().length).toEqual(2);
    });


  });


  var mockProtMatch = {
    prot: {
      'proteinRef': {
        'AC': 'Q9FLX4',
        'identifiers': [
          'MAKR5_ARATH',
          'Q9FLX4'
        ],
        'source': 'SwissProt_2014_08.fasta'
      },
      'sequence': 'MEALTFMKFWLTNNTTIKPRREIRISESAVDSTTGSEDPDLDLCEGEDSFFELKISLSDFKTPKEKQRLETTTTTTTYSVSNKSKVLPFVDISSKPQQSPTTLLKSGQKFRAFSFKKSEKSTTTEKKKEENNRTSLNVRFRVDDETTTTSFRKTASIARSQQTDDTMFDDSVSKRFFSLIKPLYTKSTKKQSSSTITSPTSSPATREKQRSNIPSGMRSVRRQLGKSRSASAAIGGMSPANRIDESLQVQQDGIQSAILHCKKSFHGSRESSLLSRSTSESSSQEKLSTSSSEDSYLFSRISSDSISEKSMDSLTSIKEQREKISD',
      'length': 326
    },

    psms: [
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.5647.5647.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'IDESLQVQQDGIQSAILHCK',
          'molMass': 2281.137245108,
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
              'Carbamidomethyl'
            ],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 65.56,
            'scoreMap': {
              'Mascot:expectation value': 2.11290564951577e-06,
              'Mascot:score': 65.56
            }
          },
          'massDiff': 0.0008516666670175255,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 489,
            'endPos': 508,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'GST_MAKR5_207-326',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 276,
            'endPos': 295,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 243,
            'endPos': 262,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'H',
                  'mass': 137.058912
                }
              },
              {
                'aa': {
                  'code1': 'C',
                  'mass': 103.009185
                },
                'modifications': [
                  {
                    'name': 'Carbamidomethyl',
                    'fullName': 'Iodoacetamide derivative',
                    'mass': 57.021464
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'IDESLQVQQDGIQSAILHC{Carbamidomethyl}K'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.4963.4963.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'LSTSSSEDSYLFSR',
          'molMass': 1577.720931175,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 110.65,
            'scoreMap': {
              'Mascot:expectation value': 1.19102452494405e-10,
              'Mascot:score': 110.65
            }
          },
          'massDiff': 0.0007954999999810752,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 533,
            'endPos': 546,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'GST_MAKR5_207-326',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 320,
            'endPos': 333,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 287,
            'endPos': 300,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'Y',
                  'mass': 163.06332
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'LSTSSSEDSYLFSR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.3949.3949.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'SASAAIGGMSPANR',
          'molMass': 1368.5857138219997,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 48.68,
            'scoreMap': {
              'Mascot:delta score': 6.04,
              'Mascot:expectation value': 5.29139770149961e-05,
              'Mascot:score': 48.68
            }
          },
          'massDiff': 0.0007879999999431675,
          'rank': 2,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 475,
            'endPos': 488,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'GST_MAKR5_207-326',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 262,
            'endPos': 275,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 229,
            'endPos': 242,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'SASPoAAIGGMSPANR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.3949.3949.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'SASAAIGGMSPANR',
          'molMass': 1368.5857138219997,
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
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 60.6,
            'scoreMap': {
              'Mascot:delta score': 93.96,
              'Mascot:expectation value': 3.40071631019331e-06,
              'Mascot:score': 60.6
            }
          },
          'massDiff': 0.0007879999999431675,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 475,
            'endPos': 488,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'GST_MAKR5_207-326',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 262,
            'endPos': 275,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 229,
            'endPos': 242,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'SPoASAAIGGMSPANR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2860.2860.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'SASAAIGGMSPANR',
          'molMass': 1288.6193834239996,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 62.31,
            'scoreMap': {
              'Mascot:expectation value': 3.22926960100387e-06,
              'Mascot:score': 62.31
            }
          },
          'massDiff': 0.0004910000000108994,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 475,
            'endPos': 488,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'GST_MAKR5_207-326',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 262,
            'endPos': 275,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 229,
            'endPos': 242,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'G',
                  'mass': 57.021464
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'SASAAIGGMSPANR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.6753.6753.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'VLPFVDISSKPQQSPTTLLK',
          'molMass': 2197.235820156,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 48.09,
            'scoreMap': {
              'Mascot:expectation value': 7.37383829730089e-05,
              'Mascot:score': 48.09
            }
          },
          'massDiff': 0.0013143333329708184,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 332,
            'endPos': 351,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 86,
            'endPos': 105,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'VLPFVDISSKPQQSPTTLLK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2351.2351.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QRLETTTTTTTYSVSNK',
          'molMass': 1929.9643493390001,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 47.94,
            'scoreMap': {
              'Mascot:expectation value': 3.19613124195417e-05,
              'Mascot:score': 47.94
            }
          },
          'massDiff': 0.0008013333330154637,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 313,
            'endPos': 329,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 67,
            'endPos': 83,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'Y',
                  'mass': 163.06332
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'QRLETTTTTTTYSVSNK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.3119.3119.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'SQQTDDTMFDDSVSKR',
          'molMass': 1858.8003204900003,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 87.88,
            'scoreMap': {
              'Mascot:expectation value': 1.15285371750363e-08,
              'Mascot:score': 87.88
            }
          },
          'massDiff': 0.0003379999999424399,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'F',
            'startPos': 406,
            'endPos': 421,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'F',
            'startPos': 160,
            'endPos': 175,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'SQQTDDTMFDDSVSKR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.3986.3986.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'SQQTDDTMFDDSVSK',
          'molMass': 1702.6992094640002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 56.02,
            'scoreMap': {
              'Mascot:expectation value': 5.58629034652385e-06,
              'Mascot:score': 56.02
            }
          },
          'massDiff': 0.0012000000000398359,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'R',
            'startPos': 406,
            'endPos': 420,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'R',
            'startPos': 160,
            'endPos': 174,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'SQQTDDTMFDDSVSK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 2.81,
            'scoreMap': {
              'Mascot:delta score': 1.44,
              'Mascot:expectation value': 0.719925910518588,
              'Mascot:score': 2.81
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 9,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSPoSSTITSPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 3.17,
            'scoreMap': {
              'Mascot:delta score': 1.56,
              'Mascot:expectation value': 0.662655496030846,
              'Mascot:score': 3.17
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 8,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSPoTITSPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 4.8,
            'scoreMap': {
              'Mascot:delta score': 2.27,
              'Mascot:expectation value': 0.455289677924771,
              'Mascot:score': 4.8
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 7,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPTSSPATPoR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 8.32,
            'scoreMap': {
              'Mascot:delta score': 5.11,
              'Mascot:expectation value': 0.202436026561293,
              'Mascot:score': 8.32
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 6,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSPoSTITSPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 10.94,
            'scoreMap': {
              'Mascot:delta score': 9.34,
              'Mascot:expectation value': 0.110735737993855,
              'Mascot:score': 10.94
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 5,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITPoSPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            [
              'Phospho'
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
            'mainScore': 11.12,
            'scoreMap': {
              'Mascot:delta score': 9.74,
              'Mascot:expectation value': 0.106239936962688,
              'Mascot:score': 11.12
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 4,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPTPoSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 11.12,
            'scoreMap': {
              'Mascot:delta score': 9.74,
              'Mascot:expectation value': 0.106239936962688,
              'Mascot:score': 11.12
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 3,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPTSPoSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 11.12,
            'scoreMap': {
              'Mascot:delta score': 9.74,
              'Mascot:expectation value': 0.106239936962688,
              'Mascot:score': 11.12
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 2,
          'chargeState': 2,
          'isRejected': true
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPTSSPoPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2686.2686.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1686.7461734340002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 18.26,
            'scoreMap': {
              'Mascot:delta score': 50.42,
              'Mascot:expectation value': 0.0205252192213788,
              'Mascot:score': 18.26
            }
          },
          'massDiff': 0.0009260000000494983,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                },
                'modifications': [
                  {
                    'name': 'Phospho',
                    'fullName': 'Phosphorylation',
                    'mass': 79.966331
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPoPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2765.2765.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'LETTTTTTTYSVSNK',
          'molMass': 1645.8046608030004,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 105.37,
            'scoreMap': {
              'Mascot:expectation value': 1.35785408865561e-10,
              'Mascot:score': 105.37
            }
          },
          'massDiff': 0.00011699999993197707,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 315,
            'endPos': 329,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 69,
            'endPos': 83,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'Y',
                  'mass': 163.06332
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'LETTTTTTTYSVSNK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2774.2774.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'LETTTTTTTYSVSNK',
          'molMass': 1645.8046608030004,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 33.22,
            'scoreMap': {
              'Mascot:expectation value': 0.00152045896738402,
              'Mascot:score': 33.22
            }
          },
          'massDiff': -0.00012933333300679806,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 315,
            'endPos': 329,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 69,
            'endPos': 83,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'Y',
                  'mass': 163.06332
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'LETTTTTTTYSVSNK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2322.2322.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'QSSSTITSPTSSPATR',
          'molMass': 1606.779843036,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 52.26,
            'scoreMap': {
              'Mascot:expectation value': 4.6397449136131e-05,
              'Mascot:score': 52.26
            }
          },
          'massDiff': 0.0013609999999744105,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 437,
            'endPos': 452,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 191,
            'endPos': 206,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'Q',
                  'mass': 128.058578
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'QSSSTITSPTSSPATR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.3546.3546.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'FRVDDETTTTSFR',
          'molMass': 1573.737249941,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 37.05,
            'scoreMap': {
              'Mascot:expectation value': 0.000953269075069552,
              'Mascot:score': 37.05
            }
          },
          'massDiff': 0.00030266666703937517,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 386,
            'endPos': 398,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 140,
            'endPos': 152,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              },
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'FRVDDETTTTSFR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.4812.4812.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'FWLTNNTTIKPR',
          'molMass': 1489.8041477150002,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 77.53,
            'scoreMap': {
              'Mascot:expectation value': 2.1192453848234e-07,
              'Mascot:score': 77.53
            }
          },
          'massDiff': 0.00023166666699125926,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 255,
            'endPos': 266,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 9,
            'endPos': 20,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'W',
                  'mass': 186.079313
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'N',
                  'mass': 114.042927
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'FWLTNNTTIKPR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.6435.6435.3',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'FFSLIKPLYTK',
          'molMass': 1355.785309755,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 40.41,
            'scoreMap': {
              'Mascot:expectation value': 0.000162368584402575,
              'Mascot:score': 40.41
            }
          },
          'massDiff': 0.00044966666695245294,
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 422,
            'endPos': 432,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 176,
            'endPos': 186,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              },
              {
                'aa': {
                  'code1': 'P',
                  'mass': 97.052764
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'Y',
                  'mass': 163.06332
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'FFSLIKPLYTK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.2696.2696.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'VDDETTTTSFR',
          'molMass': 1270.567725,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 22.91,
            'scoreMap': {
              'Mascot:expectation value': 0.0115839588029448,
              'Mascot:score': 22.91
            }
          },
          'massDiff': 0.0014525000000276123,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 388,
            'endPos': 398,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 142,
            'endPos': 152,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'V',
                  'mass': 99.068414
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'R',
                  'mass': 156.101111
                }
              }
            ]
          },
          'richSeqShortcut': 'VDDETTTTSFR'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.7463.7463.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'MEALTFMK',
          'molMass': 1027.471839489,
          'modificationNames': [
            [
              'Acetyl'
            ],
            [
              'Oxidation'
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
            'mainScore': 35.51,
            'scoreMap': {
              'Mascot:expectation value': 0.00289625785531091,
              'Mascot:score': 35.51
            }
          },
          'massDiff': 0.00010150000002795423,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': '-',
            'nextAA': 'F',
            'startPos': 1,
            'endPos': 8,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                },
                'modifications': [
                  {
                    'name': 'Oxidation',
                    'fullName': 'Oxidation or Hydroxylation',
                    'mass': 15.994915
                  }
                ]
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ],
            'nTermModifications': [
              {
                'name': 'Acetyl',
                'fullName': 'Acetylation',
                'mass': 42.010565
              }
            ]
          },
          'richSeqShortcut': 'M{Oxidation}EALTFMK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.8788.8788.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'MEALTFMK',
          'molMass': 1011.4769248670001,
          'modificationNames': [
            [
              'Acetyl'
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
            'mainScore': 39.16,
            'scoreMap': {
              'Mascot:expectation value': 0.0014864013418196,
              'Mascot:score': 39.16
            }
          },
          'massDiff': 0.00012500000002546585,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': '-',
            'nextAA': 'F',
            'startPos': 1,
            'endPos': 8,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'E',
                  'mass': 129.042593
                }
              },
              {
                'aa': {
                  'code1': 'A',
                  'mass': 71.037114
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'T',
                  'mass': 101.047679
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'M',
                  'mass': 131.040485
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ],
            'nTermModifications': [
              {
                'name': 'Acetyl',
                'fullName': 'Acetylation',
                'mass': 42.010565
              }
            ]
          },
          'richSeqShortcut': 'MEALTFMK'
        }
      },
      {
        'searchId': 'F003582',
        'spectrumId': {
          'id': '20151202_Kang_7928.5143.5143.2',
          'runId': 'F003582'
        },
        'pep': {
          'sequence': 'ISLSDFK',
          'molMass': 808.4330694240001,
          'modificationNames': [
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
            'mainScore': 29.5,
            'scoreMap': {
              'Mascot:expectation value': 0.00791023010282884,
              'Mascot:score': 29.5
            }
          },
          'massDiff': -0.00011200000000144428,
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'GST_MAKR5',
              'identifiers': [],
              'source': 'custom_20151202_1622.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 301,
            'endPos': 307,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'MAKR5_ARATH',
              'identifiers': [],
              'source': 'SwissProt_2014_08.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 55,
            'endPos': 61,
            'isDecoy': false
          }
        ],
        'fishTones': {
          'richSeq': {
            'sequence': [
              {
                'aa': {
                  'code1': 'I',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'L',
                  'mass': 113.084064
                }
              },
              {
                'aa': {
                  'code1': 'S',
                  'mass': 87.032028
                }
              },
              {
                'aa': {
                  'code1': 'D',
                  'mass': 115.026943
                }
              },
              {
                'aa': {
                  'code1': 'F',
                  'mass': 147.068414
                }
              },
              {
                'aa': {
                  'code1': 'K',
                  'mass': 128.094963
                }
              }
            ]
          },
          'richSeqShortcut': 'ISLSDFK'
        }
      }
    ]
  };
});

