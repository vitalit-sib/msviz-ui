'use strict';

describe('searches', function () {
  var ProteinMatch, EnvConfig;
  var $httpBackend, $rootScope, _;

  beforeEach(module('matches-proteins'));
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
        var psms = pm.getMyPSMs();
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
        var psms = pm.getPSMs();
        var acs = getRefs(pm.getPSMs());
        expect(acs.length).toBe(7);
      });
    });

    describe('getAminoAcidInfo', function () {
      it('size', function () {
        var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms, {targetModification:'Oxidation'});
        var aai = pm.getAminoAcidInfo();
        expect(aai.length).toEqual(181);
      });

      describe('values', function () {
        var check = function (comment, searchId, pos, expected) {
          it(comment, function () {

            var pm = new ProteinMatch(mockProtMatchACTBL.prot, mockProtMatchACTBL.psms, {targetModification:'Oxidation'});
            var aai = pm.getAminoAcidInfo();
            var aa = _.find(aai, function (x) {
              return x.searchId == searchId && x.pos == pos;
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
        check('empty', 'mascot:F001303', 2, undefined)
        check('4 on 1st job', 'mascot:F001303', 152, {
          depth: 4,
          pos: 152,
          searchId: 'mascot:F001303',
          _nbPSMs: 4
        });
        check('5 on 2nd job', 'mascot:F001304', 152, {
          depth: 5,
          pos: 152,
          searchId: 'mascot:F001304',
          _nbPSMs: 5
        });
        check('one cov', 'mascot:F001304', 182, {
          depth: 1,
          pos: 182,
          searchId: 'mascot:F001304',
          _nbPSMs: 1
        });
        check('nbTargetModification', 'mascot:F001304', 192, {
          depth: 4,
          pos: 192,
          searchId: 'mascot:F001304',
          _nbPSMs: 4,
          nbTargetModification:2
        });
        check('4 cov', 'mascot:F001304', 187, {
          depth: 4,
          pos: 187,
          searchId: 'mascot:F001304',
          _nbPSMs: 4
        });
        check('bout a bout', 'mascot:F001303', 327, {
          depth: 2,
          pos: 327,
          searchId: 'mascot:F001303',
          _nbPSMs: 2
        });

      });
    });
  });


  var mockProtMatchACTBL = {
    prot: {
      "proteinRef": {
        "AC": "Q8BFZ3",
        "identifiers": [
          "ACTBL_MOUSE",
          "Q8BFZ3"
        ],
        "source": "SwissProt_2013_12.fasta"
      },
      "sequence": "MVDDELTALVVDNGSGMCKAGFGGDDAPRAVFPSMVGRPRHQGVMVGMGQKDCYVGDEAQSKRGILTLKYPIEHGVVTNWDDMEKIWYHTFYNELRVAPDEHPILLTEAPLNPKINREKMTQIMFEAFNTPAMYVAIQAVLSLYASGRTTGIVMDSGDGVTHTVPIYEGYALPHAILRLDLAGRDLTDYLMKILTERGYNFTTTAEREIVRDVKEKLCYVALDFEQEMVTAAASSSLERSYELPDGQVITIGNERFRCPEAIFQPSFLGIESRGIHETTFNSIMKCDVDIRKDLFANTVLSGGSTMYPGIADRMQKEIVTLAPSTMKIKIIAPPERKYSVWIGGSILASLSTFQQMWISKQEYDEAGPPIVHRKCF",
      "length": 376
    },
    psms: [
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.9559.9559.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "GILTLK",
          "molMass": 643.4268618350001,
          "modificationNames": [
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
        "matchInfo": {
          "score": {
            "mainScore": 30.66,
            "scoreMap": {
              "Mascot:expectation value": 0.0018468790712366,
              "Mascot:score": 30.66
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "Y",
            "startPos": 63,
            "endPos": 68,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "Y",
            "startPos": 64,
            "endPos": 69,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "Y",
            "startPos": 63,
            "endPos": 68,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "Y",
            "startPos": 63,
            "endPos": 68,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "Y",
            "startPos": 63,
            "endPos": 68,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.19786.19786.2",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 997.4790333469999,
          "modificationNames": [
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
        "matchInfo": {
          "score": {
            "mainScore": 22.33,
            "scoreMap": {
              "Mascot:expectation value": 0.0280699240389351,
              "Mascot:score": 22.33
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTH_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTS_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.17525.17525.2",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 1013.4739479689999,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 16.44,
            "scoreMap": {
              "Mascot:expectation value": 0.088524729223469,
              "Mascot:score": 16.44
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTH_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTS_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.16350.16350.2",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 1013.4739479689999,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 19.02,
            "scoreMap": {
              "Mascot:expectation value": 0.0463662234728324,
              "Mascot:score": 19.02
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTH_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTS_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 186,
            "endPos": 193,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20885.20885.3",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "LDLAGRDLTDYLMK",
          "molMass": 1622.8337928719998,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 15.86,
            "scoreMap": {
              "Mascot:expectation value": 0.0325137157295918,
              "Mascot:score": 15.86
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTH_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTS_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 180,
            "endPos": 193,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.19571.19571.2",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "SYELPDGQVITIGNER",
          "molMass": 1789.884642457,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 112.37,
            "scoreMap": {
              "Mascot:expectation value": 3.8242293964174e-11,
              "Mascot:score": 112.37
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTH_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTS_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 241,
            "endPos": 256,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.14444.14444.3",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "VAPDEHPILLTEAPLNPK",
          "molMass": 1953.057127512,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 19.55,
            "scoreMap": {
              "Mascot:expectation value": 0.0316114822349784,
              "Mascot:score": 19.55
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 2,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 97,
            "endPos": 114,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.21143.21143.4",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3182.607034389,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 55.9,
            "scoreMap": {
              "Mascot:expectation value": 0.00000783970713744504,
              "Mascot:score": 55.9
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 4,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.21588.21588.4",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3182.607034389,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 38.7,
            "scoreMap": {
              "Mascot:expectation value": 0.000411433679190454,
              "Mascot:score": 38.7
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 4,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.22006.22006.4",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3182.607034389,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 33.26,
            "scoreMap": {
              "Mascot:expectation value": 0.00141618912379077,
              "Mascot:score": 33.26
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 4,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20012.20012.3",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3198.601949011,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
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
        "matchInfo": {
          "score": {
            "mainScore": 82.24,
            "scoreMap": {
              "Mascot:expectation value": 1.58214350944717e-8,
              "Mascot:score": 82.24
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001304",
        "spectrumId": {
          "id": "20140730_REFSAMPLE_TopS_HCD_meth_bestone_fresh.20900.20900.4",
          "runId": "mascot:F001304"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3198.601949011,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
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
        "matchInfo": {
          "score": {
            "mainScore": 51.83,
            "scoreMap": {
              "Mascot:expectation value": 0.0000167317042907241,
              "Mascot:score": 51.83
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 4,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.18648.18648.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 997.4790333469999,
          "modificationNames": [
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
        "matchInfo": {
          "score": {
            "mainScore": 21.67,
            "scoreMap": {
              "Mascot:expectation value": 0.0309750058205652,
              "Mascot:score": 21.67
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.16425.16425.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 1013.4739479689999,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 24.06,
            "scoreMap": {
              "Mascot:expectation value": 0.0153131524805844,
              "Mascot:score": 24.06
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.15305.15305.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "DLTDYLMK",
          "molMass": 1013.4739479689999,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 23.07,
            "scoreMap": {
              "Mascot:expectation value": 0.0182474307463326,
              "Mascot:score": 23.07
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 184,
            "endPos": 191,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.7352.7352.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "IKIIAPPER",
          "molMass": 1035.644065249,
          "modificationNames": [
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 23,
            "scoreMap": {
              "Mascot:expectation value": 0.00501187233627272,
              "Mascot:score": 23
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "K",
            "startPos": 327,
            "endPos": 335,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "K",
            "startPos": 327,
            "endPos": 335,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "K",
            "startPos": 327,
            "endPos": 335,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "K",
            "startPos": 327,
            "endPos": 335,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "K",
            "startPos": 327,
            "endPos": 335,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.14460.14460.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "EIVTLAPSTMK",
          "molMass": 1204.6373248999998,
          "modificationNames": [
            [],
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
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 1.14,
            "scoreMap": {
              "Mascot:expectation value": 6.22995656632154,
              "Mascot:score": 1.14
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 9,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "I",
            "startPos": 317,
            "endPos": 327,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.19745.19745.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "LDLAGRDLTDYLMK",
          "molMass": 1622.8337928719998,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 18.31,
            "scoreMap": {
              "Mascot:expectation value": 0.0738624832218438,
              "Mascot:score": 18.31
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.17691.17691.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "LDLAGRDLTDYLMK",
          "molMass": 1638.8287074939997,
          "modificationNames": [
            [],
            [],
            [],
            [],
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
              "Oxidation"
            ],
            [],
            []
          ]
        },
        "matchInfo": {
          "score": {
            "mainScore": 16.82,
            "scoreMap": {
              "Mascot:expectation value": 0.0264306841184666,
              "Mascot:score": 16.82
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 178,
            "endPos": 191,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.18444.18444.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "SYELPDGQVITIGNER",
          "molMass": 1789.884642457,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 112.44,
            "scoreMap": {
              "Mascot:expectation value": 3.73457598343891e-11,
              "Mascot:score": 112.44
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.18853.18853.2",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "SYELPDGQVITIGNER",
          "molMass": 1789.884642457,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 57.66,
            "scoreMap": {
              "Mascot:expectation value": 0.00000676099639450209,
              "Mascot:score": 57.66
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 2,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTA_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTC_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "K",
            "nextAA": "F",
            "startPos": 239,
            "endPos": 254,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.13574.13574.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "VAPDEHPILLTEAPLNPK",
          "molMass": 1953.057127512,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 19.54,
            "scoreMap": {
              "Mascot:expectation value": 0.0311284883638846,
              "Mascot:score": 19.54
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 2,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "I",
            "startPos": 97,
            "endPos": 114,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.20389.20389.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3182.607034389,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 74.51,
            "scoreMap": {
              "Mascot:expectation value": 1.09739175735865e-7,
              "Mascot:score": 74.51
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.19973.19973.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3182.607034389,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
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
        "matchInfo": {
          "score": {
            "mainScore": 76.22,
            "scoreMap": {
              "Mascot:expectation value": 7.40221497703086e-8,
              "Mascot:score": 76.22
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.19498.19498.3",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3198.601949011,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
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
        "matchInfo": {
          "score": {
            "mainScore": 62.01,
            "scoreMap": {
              "Mascot:expectation value": 0.00000160524076628585,
              "Mascot:score": 62.01
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 3,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      },
      {
        "searchId": "mascot:F001303",
        "spectrumId": {
          "id": "20140811_REFERENCESAMPLE_RFamp_switch_1.18825.18825.4",
          "runId": "mascot:F001303"
        },
        "pep": {
          "sequence": "TTGIVMDSGDGVTHTVPIYEGYALPHAILR",
          "molMass": 3198.601949011,
          "modificationNames": [
            [],
            [],
            [],
            [],
            [],
            [],
            [
              "Oxidation"
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
        "matchInfo": {
          "score": {
            "mainScore": 55.07,
            "scoreMap": {
              "Mascot:expectation value": 0.00000762370502590974,
              "Mascot:score": 55.07
            }
          },
          "numMissedCleavages": -1,
          "massDiff": -1,
          "rank": 1,
          "totalNumIons": -1,
          "chargeState": 4,
          "isRejected": false
        },
        "proteinList": [
          {
            "proteinRef": {
              "AC": "ACTBL_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTB_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          },
          {
            "proteinRef": {
              "AC": "ACTG_MOUSE",
              "identifiers": [],
              "source": "SwissProt_2013_12.fasta"
            },
            "previousAA": "R",
            "nextAA": "L",
            "startPos": 148,
            "endPos": 177,
            "isDecoy": false
          }
        ]
      }
    ]
  };
});
