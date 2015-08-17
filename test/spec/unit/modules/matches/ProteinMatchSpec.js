'use strict';

describe('searches', function () {
  var ProteinMatch, EnvConfig;
  var $httpBackend, $rootScope, _;

  beforeEach(module('matches-protein'));
  beforeEach(module('environment'));
  beforeEach(module('thirdparties'));

  beforeEach(inject(function ($injector) {
    // Set up the mock http service responses

    ProteinMatch = $injector.get('ProteinMatch');
    EnvConfig = $injector.get('EnvConfig');

    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    EnvConfig.backendUrl = 'http://pipo.com/backend';
    //$httpBackend.when('GET', 'http://pipo.com/backend/')
    //  .respond(prout);
  }));

  describe('ProteinMatch', function () {
    describe('constructor', function () {
      it('class', function () {
        expect(ProteinMatch).not.toBeUndefined();
      });

      it('getProtein()', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms);
        expect(pm.getProtein()).not.toBeUndefined();
        expect(pm.getProtein().proteinRef.AC).toEqual('Q8BFZ3');
      });
      it('getPSMs()', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms);
        expect(pm.getPSMs()).not.toBeUndefined();
        expect(pm.getPSMs().length).toEqual(26);
      });

      it('OSBL8 getPSMs()', function () {
        var pm = new ProteinMatch(mockProtMatchOSBL8.prot, mockProtMatchOSBL8.psms);
        expect(pm.getPSMs()).not.toBeUndefined();
        expect(pm.getPSMs().length).toEqual(57);
      });
    });

    describe('getMyPSMs', function () {
      var getRefs = function (psms) {
        return _.chain(psms)
          .map(function (psm) {
            return _.map(psm.proteinList, function (pr) {
              return pr.proteinRef.AC;
            });
          })
          .flatten()
          .uniq()
          .value();
      };
      it('size', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms);
        expect(pm.getPSMs().length).toEqual(26);
      });
      it('check refAC', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms);
        var psms = pm.getMyPSMs();
        var ids = pm.getProtein().proteinRef.identifiers;
        var psmACs = getRefs(psms);
        expect(psmACs.length).toBe(1);
        expect(_.contains(ids, psmACs[0])).toBe(true);
      });
      it('check that original PSM proteinRef where not modified', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms);
        var acs = getRefs(pm.getPSMs());
        expect(acs.length).toBe(7);
      });
    });

    describe('getAminoAcidInfo', function () {
      it('size', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms, {targetModification: 'Oxidation'});
        var aai = pm.getAminoAcidInfo();
        expect(aai.length).toEqual(181);
      });

      describe('values', function () {
        var check = function (comment, searchId, pos, expected) {
          it(comment, function () {

            var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms, {targetModification: 'Oxidation'});
            var aai = pm.getAminoAcidInfo();
            var aa = _.find(aai, function (x) {
              return x.searchId === searchId && x.pos === pos;
            });

            if (expected === undefined) {
              expect(aa).toBeUndefined();
              return;
            }
            expect(aa).toBeDefined();

            var maa = _.extend({_nbPSMs: aa.psms.length}, aa);
            delete maa.psms;
            expect(maa).toEqual(expected);
          });
        };
        check('empty', 'mascot:F001303', 2, undefined);
        check('4 on 1st job', 'mascot:F001303', 152, {
          depth: 4,
          pos: 152,
          aa: 'I',
          searchId: 'mascot:F001303',
          _nbPSMs: 4
        });
        check('5 on 2nd job', 'mascot:F001304', 152, {
          depth: 5,
          pos: 152,
          aa: 'I',
          searchId: 'mascot:F001304',
          _nbPSMs: 5
        });
        check('one cov', 'mascot:F001304', 182, {
          depth: 1,
          pos: 182,
          aa: 'A',
          searchId: 'mascot:F001304',
          _nbPSMs: 1
        });
        check('nbTargetModification', 'mascot:F001304', 192, {
          depth: 4,
          pos: 192,
          aa: 'K',
          searchId: 'mascot:F001304',
          _nbPSMs: 4,
          nbTargetModification: 2
        });
        check('4 cov', 'mascot:F001304', 187, {
          depth: 4,
          pos: 187,
          aa: 'T',
          searchId: 'mascot:F001304',
          _nbPSMs: 4
        });
        check('bout a bout', 'mascot:F001303', 327, {
          depth: 2,
          pos: 327,
          aa: 'K',
          searchId: 'mascot:F001303',
          _nbPSMs: 2
        });

      });
    });
  });


  var mockProtMatchACTBL = {
    prot: {
      'proteinRef': {
        'AC': 'Q8BFZ3',
        'identifiers': [
          'ACTBL_MOUSE',
          'Q8BFZ3'
        ],
        'source': 'SwissProt_2013_12.fasta'
      },
      'sequence': 'MVDDELTALVVDNGSGMCKAGFGGDDAPRAVFPSMVGRPRHQGVMVGMGQKDCYVGDEAQSKRGILTLKYPIEHGVVTNWDDMEKIWYHTFYNELRVAPDEHPILLTEAPLNPKINREKMTQIMFEAFNTPAMYVAIQAVLSLYASGRTTGIVMDSGDGVTHTVPIYEGYALPHAILRLDLAGRDLTDYLMKILTERGYNFTTTAEREIVRDVKEKLCYVALDFEQEMVTAAASSSLERSYELPDGQVITIGNERFRCPEAIFQPSFLGIESRGIHETTFNSIMKCDVDIRKDLFANTVLSGGSTMYPGIADRMQKEIVTLAPSTMKIKIIAPPERKYSVWIGGSILASLSTFQQMWISKQEYDEAGPPIVHRKCF',
      'length': 376
    },
    psms: [
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.9559.9559.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'GILTLK',
          'molMass': 643.4268618350001,
          'modificationNames': [
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
            'mainScore': 30.66,
            'scoreMap': {
              'Mascot:expectation value': 0.0018468790712366,
              'Mascot:score': 30.66
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Y',
            'startPos': 63,
            'endPos': 68,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Y',
            'startPos': 64,
            'endPos': 69,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Y',
            'startPos': 63,
            'endPos': 68,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Y',
            'startPos': 63,
            'endPos': 68,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Y',
            'startPos': 63,
            'endPos': 68,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.19786.19786.2',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 997.4790333469999,
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
            'mainScore': 22.33,
            'scoreMap': {
              'Mascot:expectation value': 0.0280699240389351,
              'Mascot:score': 22.33
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTH_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTS_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.17525.17525.2',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 1013.4739479689999,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 16.44,
            'scoreMap': {
              'Mascot:expectation value': 0.088524729223469,
              'Mascot:score': 16.44
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTH_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTS_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.16350.16350.2',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 1013.4739479689999,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 19.02,
            'scoreMap': {
              'Mascot:expectation value': 0.0463662234728324,
              'Mascot:score': 19.02
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTH_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTS_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 186,
            'endPos': 193,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20885.20885.3',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'LDLAGRDLTDYLMK',
          'molMass': 1622.8337928719998,
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
            'mainScore': 15.86,
            'scoreMap': {
              'Mascot:expectation value': 0.0325137157295918,
              'Mascot:score': 15.86
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTH_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTS_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 180,
            'endPos': 193,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.19571.19571.2',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'SYELPDGQVITIGNER',
          'molMass': 1789.884642457,
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
            'mainScore': 112.37,
            'scoreMap': {
              'Mascot:expectation value': 3.8242293964174e-11,
              'Mascot:score': 112.37
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTH_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTS_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 241,
            'endPos': 256,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.14444.14444.3',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'VAPDEHPILLTEAPLNPK',
          'molMass': 1953.057127512,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 19.55,
            'scoreMap': {
              'Mascot:expectation value': 0.0316114822349784,
              'Mascot:score': 19.55
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 97,
            'endPos': 114,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.21143.21143.4',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3182.607034389,
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
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 55.9,
            'scoreMap': {
              'Mascot:expectation value': 0.00000783970713744504,
              'Mascot:score': 55.9
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.21588.21588.4',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3182.607034389,
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
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 38.7,
            'scoreMap': {
              'Mascot:expectation value': 0.000411433679190454,
              'Mascot:score': 38.7
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.22006.22006.4',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3182.607034389,
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
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 33.26,
            'scoreMap': {
              'Mascot:expectation value': 0.00141618912379077,
              'Mascot:score': 33.26
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20012.20012.3',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3198.601949011,
          'modificationNames': [
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
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 82.24,
            'scoreMap': {
              'Mascot:expectation value': 1.58214350944717e-8,
              'Mascot:score': 82.24
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001304',
        'spectrumId': {
          'id': '20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20900.20900.4',
          'runId': 'mascot:F001304'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3198.601949011,
          'modificationNames': [
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
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 51.83,
            'scoreMap': {
              'Mascot:expectation value': 0.0000167317042907241,
              'Mascot:score': 51.83
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.18648.18648.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 997.4790333469999,
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
            'mainScore': 21.67,
            'scoreMap': {
              'Mascot:expectation value': 0.0309750058205652,
              'Mascot:score': 21.67
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.16425.16425.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 1013.4739479689999,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 24.06,
            'scoreMap': {
              'Mascot:expectation value': 0.0153131524805844,
              'Mascot:score': 24.06
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.15305.15305.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'DLTDYLMK',
          'molMass': 1013.4739479689999,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 23.07,
            'scoreMap': {
              'Mascot:expectation value': 0.0182474307463326,
              'Mascot:score': 23.07
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 184,
            'endPos': 191,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.7352.7352.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'IKIIAPPER',
          'molMass': 1035.644065249,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 23,
            'scoreMap': {
              'Mascot:expectation value': 0.00501187233627272,
              'Mascot:score': 23
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 327,
            'endPos': 335,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 327,
            'endPos': 335,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 327,
            'endPos': 335,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 327,
            'endPos': 335,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 327,
            'endPos': 335,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.14460.14460.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'EIVTLAPSTMK',
          'molMass': 1204.6373248999998,
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
              'Oxidation'
            ],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 1.14,
            'scoreMap': {
              'Mascot:expectation value': 6.22995656632154,
              'Mascot:score': 1.14
            }
          },
          'numMissedCleavages': -1,
          'massDiff': -1,
          'rank': 9,
          'totalNumIons': -1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 317,
            'endPos': 327,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.19745.19745.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'LDLAGRDLTDYLMK',
          'molMass': 1622.8337928719998,
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
            'mainScore': 18.31,
            'scoreMap': {
              'Mascot:expectation value': 0.0738624832218438,
              'Mascot:score': 18.31
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.17691.17691.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'LDLAGRDLTDYLMK',
          'molMass': 1638.8287074939997,
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
            [
              'Oxidation'
            ],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 16.82,
            'scoreMap': {
              'Mascot:expectation value': 0.0264306841184666,
              'Mascot:score': 16.82
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 178,
            'endPos': 191,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.18444.18444.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'SYELPDGQVITIGNER',
          'molMass': 1789.884642457,
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
            'mainScore': 112.44,
            'scoreMap': {
              'Mascot:expectation value': 3.73457598343891e-11,
              'Mascot:score': 112.44
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.18853.18853.2',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'SYELPDGQVITIGNER',
          'molMass': 1789.884642457,
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
            'mainScore': 57.66,
            'scoreMap': {
              'Mascot:expectation value': 0.00000676099639450209,
              'Mascot:score': 57.66
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
              'AC': 'ACTA_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTC_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 239,
            'endPos': 254,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.13574.13574.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'VAPDEHPILLTEAPLNPK',
          'molMass': 1953.057127512,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 19.54,
            'scoreMap': {
              'Mascot:expectation value': 0.0311284883638846,
              'Mascot:score': 19.54
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'I',
            'startPos': 97,
            'endPos': 114,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.20389.20389.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3182.607034389,
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
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 74.51,
            'scoreMap': {
              'Mascot:expectation value': 1.09739175735865e-7,
              'Mascot:score': 74.51
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.19973.19973.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3182.607034389,
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
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 76.22,
            'scoreMap': {
              'Mascot:expectation value': 7.40221497703086e-8,
              'Mascot:score': 76.22
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.19498.19498.3',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3198.601949011,
          'modificationNames': [
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
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 62.01,
            'scoreMap': {
              'Mascot:expectation value': 0.00000160524076628585,
              'Mascot:score': 62.01
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'mascot:F001303',
        'spectrumId': {
          'id': '20140811_REFERENCESAMPLE_RFamp_switch_1.18825.18825.4',
          'runId': 'mascot:F001303'
        },
        'pep': {
          'sequence': 'TTGIVMDSGDGVTHTVPIYEGYALPHAILR',
          'molMass': 3198.601949011,
          'modificationNames': [
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
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 55.07,
            'scoreMap': {
              'Mascot:expectation value': 0.00000762370502590974,
              'Mascot:score': 55.07
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
              'AC': 'ACTBL_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTB_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          },
          {
            'proteinRef': {
              'AC': 'ACTG_MOUSE',
              'identifiers': [],
              'source': 'SwissProt_2013_12.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 148,
            'endPos': 177,
            'isDecoy': false
          }
        ]
      }
    ]
  };

  var mockProtMatchOSBL8 = {
    prot: {
      'proteinRef': {
        'AC': 'Q9BZF1',
        'identifiers': [
          'OSBL8_HUMAN',
          'Q9BZF1'
        ],
        'source': 'SwissProt_2014_08.fasta'
      },
      'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGKMSQRQGKEAYPTPTKDLHQPSLSPASPHSQGFERGKEDISQNKDESSLSMSKSKSESKLYNGSEKDSSTSSKLTKKESLKVQKKNYREEKKRATKELLSTITDPSVIVMADWLKIRGTLKSWTKLWCVLKPGVLLIYKTQKNGQWVGTVLLNACEIIERPSKKDGFCFKLFHPLEQSIWAVKGPKGEAVGSITQPLPSSYLIIRATSESDGRCWMDALELALKCSSLLKRTMIREGKEHDLSVSSDSTHVTFYGLLRANNLHSGDNFQLNDSEIERQHFKDQDMYSDKSDKENDQEHDESDNEVMGKSEESDTDTSERQDDSYIEPEPVEPLKETTYTEQSHEELGEAGEASQTETVSEENKSLIWTLLKQVRPGMDLSKVVLPTFILEPRSFLDKLSDYYYHADFLSEAALEENPYFRLKKVVKWYLSGFYKKPKGLKKPYNPILGETFRCLWIHPRTNSKTFYIAEQVSHHPPISAFYVSNRKDGFCLSGSILAKSKFYGNSLSAILEGEARLTFLNRGEDYVMTMPYAHCKGILYGTMTLELGGTVNITCQKTGYSAILEFKLKPFLGSSDCVNQISGKLKLGKEVLATLEGHWDSEVFITDKKTDNSEVFWNPTPDIKQWRLIRHTVKFEEQGDFESEKLWQRVTRAINAKDQTEATQEKYVLEEAQRQAARDRKTKNEEWSCKLFELDPLTGEWHYKFADTRPWDPLNDMIQFEKDGVIQTKVKHRTPMVSVPKMKHKPTRQQKKVAKGYSSPEPDIQDSSGSEAQSVKPSTRRKKGIELGDIQSSIESIKQTQEEIKRNIMALRNHLVSSTPATDYFLQQKDYFIIFLLILLQVIINFMFK',
      'length': 889
    },
    psms: [
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
    ]
  };
});
