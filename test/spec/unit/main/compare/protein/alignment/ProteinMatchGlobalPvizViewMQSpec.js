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

      it('Phospho selected at 809', function () {
        var pm = new ProteinMatch(mockProtMatch.prot, mockProtMatch.psms, {targetModification: 'Phospho'});
        var pvizView = new ProteinMatchesGlobalPvizView(undefined, pm);
        pvizView._selPsmPos = 809;

        var featurePsms = pvizView.getFeaturesPSMs();

        expect(featurePsms).not.toBeUndefined();
        expect(featurePsms.length).toEqual(8);

        //# filter scan 8521
        var scan8521 = _.filter(featurePsms, function(x){ return x.data.spectrumId.id === '8521'; })[0];

        expect(scan8521.data.matchInfo.modificationProbabilities.Phospho).toEqual('GYS(0.479)S(0.519)PEPDIQDS(0.456)S(0.42)GS(0.117)EAQS(0.007)VKPS(0.001)T(0.001)R');

        expect(scan8521.data.matchInfo.highestModifProbability.Phospho).toEqual(0.519);

        var modifInfos = scan8521.data.matchInfo.modificationInfos.Phospho;
        expect(modifInfos.length).toEqual(8);

        // check first modif
        expect(modifInfos[0].position).toEqual(3);
        expect(modifInfos[0].status).toEqual('CONFLICT');
        expect(modifInfos[0].modifProb).toEqual(0.479);

        // check others
        expect(modifInfos[1].status).toEqual('MAIN');
        expect(modifInfos[7].status).toEqual('CONFLICT');

    });


  });



  var mockProtMatch = {
    prot: {
      'proteinRef': {
        'AC': 'Q9BZF1',
        'identifiers': [
          'OSBL8_HUMAN',
          'Q9BZF1'
        ],
        'source': 'UP000005640_9606.fasta'
      },
      'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGKMSQRQGKEAYPTPTKDLHQPSLSPASPHSQGFERGKEDISQNKDESSLSMSKSKSESKLYNGSEKDSSTSSKLTKKESLKVQKKNYREEKKRATKELLSTITDPSVIVMADWLKIRGTLKSWTKLWCVLKPGVLLIYKTQKNGQWVGTVLLNACEIIERPSKKDGFCFKLFHPLEQSIWAVKGPKGEAVGSITQPLPSSYLIIRATSESDGRCWMDALELALKCSSLLKRTMIREGKEHDLSVSSDSTHVTFYGLLRANNLHSGDNFQLNDSEIERQHFKDQDMYSDKSDKENDQEHDESDNEVMGKSEESDTDTSERQDDSYIEPEPVEPLKETTYTEQSHEELGEAGEASQTETVSEENKSLIWTLLKQVRPGMDLSKVVLPTFILEPRSFLDKLSDYYYHADFLSEAALEENPYFRLKKVVKWYLSGFYKKPKGLKKPYNPILGETFRCLWIHPRTNSKTFYIAEQVSHHPPISAFYVSNRKDGFCLSGSILAKSKFYGNSLSAILEGEARLTFLNRGEDYVMTMPYAHCKGILYGTMTLELGGTVNITCQKTGYSAILEFKLKPFLGSSDCVNQISGKLKLGKEVLATLEGHWDSEVFITDKKTDNSEVFWNPTPDIKQWRLIRHTVKFEEQGDFESEKLWQRVTRAINAKDQTEATQEKYVLEEAQRQAARDRKTKNEEWSCKLFELDPLTGEWHYKFADTRPWDPLNDMIQFEKDGVIQTKVKHRTPMVSVPKMKHKPTRQQKKVAKGYSSPEPDIQDSSGSEAQSVKPSTRRKKGIELGDIQSSIESIKQTQEEIKRNIMALRNHLVSSTPATDYFLQQKDYFIIFLLILLQVIINFMFK',
      'length': 889
    },

    psms: [
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6853',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'YVLEEAQR',
          'molMass': 1006.50836,
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
            'mainScore': 60.436,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 504.261456,
          'correctedMolMass': 1006.5083520000001,
          'massDiff': -0.11755,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 707,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5922',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'YVLEEAQR',
          'molMass': 1006.50836,
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
            'mainScore': 107.9,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 504.261456,
          'correctedMolMass': 1006.5083520000001,
          'massDiff': -0.1275,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 707,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11688',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'WYLSGFYK',
          'molMass': 1062.51747,
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
            'mainScore': 82.279,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 532.26601,
          'correctedMolMass': 1062.51746,
          'massDiff': 1.3691,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 468,
            'endPos': 475,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12342',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'VVLPTFILEPR',
          'molMass': 1282.76491,
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
            'mainScore': 84.507,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 428.595579,
          'correctedMolMass': 1282.7648969999998,
          'massDiff': -1.173,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 423,
            'endPos': 433,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12339',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'VVLPTFILEPR',
          'molMass': 1282.76491,
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
            'mainScore': 103.91,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 642.389731,
          'correctedMolMass': 1282.764902,
          'massDiff': -0.094005,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 423,
            'endPos': 433,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11212',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'VVKWYLSGFYK',
          'molMass': 1388.74926,
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
            'mainScore': 77.288,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 463.923696,
          'correctedMolMass': 1388.7492479999999,
          'massDiff': 0.28218,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 465,
            'endPos': 475,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5988',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'HTVKFEEQGDFESEK',
          'molMass': 1808.82171,
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
            'mainScore': 72.315,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 603.947846,
          'correctedMolMass': 1808.821698,
          'massDiff': -0.21638,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 671,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5711',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'HTVKFEEQGDFESEK',
          'molMass': 1808.82171,
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
            'mainScore': 38.337,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 453.212703,
          'correctedMolMass': 1808.821692,
          'massDiff': 0.28153,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 671,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5616',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'HTVKFEEQGDFESEK',
          'molMass': 1808.82171,
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
            'mainScore': 44.312,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 603.947846,
          'correctedMolMass': 1808.821698,
          'massDiff': 0.2225,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'L',
            'startPos': 671,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11770',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3027.56119,
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
            'mainScore': 111.64,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 757.897574,
          'correctedMolMass': 3027.5611759999997,
          'massDiff': 2.8846,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11749',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3027.56119,
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
            'mainScore': 168.17,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1010.19434,
          'correctedMolMass': 3027.56118,
          'massDiff': -0.15814,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6490',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 857.468075,
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
            'mainScore': 74.2,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 429.741314,
          'correctedMolMass': 857.468068,
          'massDiff': 1.3739,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6201',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 873.462989,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 103.8,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 437.738771,
          'correctedMolMass': 873.462982,
          'massDiff': -0.32485,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'TPM(1)VSVPK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10906',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TNSKTFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2992.48315,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 35.621,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 749.128065,
          'correctedMolMass': 2992.48314,
          'massDiff': 0.36351,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 501,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12778',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TGYSAILEFK',
          'molMass': 1127.58628,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 47.894,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 564.800414,
          'correctedMolMass': 1127.586268,
          'massDiff': -0.39943,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 598,
            'endPos': 607,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11338',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TGYSAILEFK',
          'molMass': 1127.58628,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 88.596,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 564.800414,
          'correctedMolMass': 1127.586268,
          'massDiff': 0.59217,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 598,
            'endPos': 607,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10773',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNRK',
          'molMass': 2690.36052,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 47.564,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 539.079381,
          'correctedMolMass': 2690.360505,
          'massDiff': 0.19548,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 5,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 505,
            'endPos': 527,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10808',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNRK',
          'molMass': 2690.36052,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 82.885,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 673.597407,
          'correctedMolMass': 2690.3605079999998,
          'massDiff': 1.1732,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 505,
            'endPos': 527,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '14415',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 30.244,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 641.573666,
          'correctedMolMass': 2562.265544,
          'massDiff': -0.14175,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13108',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 58.093,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.3094,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12258',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 68.42,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.31946,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12141',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 136.74,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 641.573666,
          'correctedMolMass': 2562.265544,
          'massDiff': -0.2493,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11321',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 247.92,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1282.14006,
          'correctedMolMass': 2562.26556,
          'massDiff': -0.30539,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11671',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 141.78,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.012619,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11121',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 45.363,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 641.573666,
          'correctedMolMass': 2562.265544,
          'massDiff': -0.0042899,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11726',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TDNSEVFWNPTPDIK',
          'molMass': 1761.82098,
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
            'mainScore': 88.561,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 588.280936,
          'correctedMolMass': 1761.8209679999998,
          'massDiff': -0.11263,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 650,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6911',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2608.18888,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 60.133,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 870.403571,
          'correctedMolMass': 2608.1888730000005,
          'massDiff': 0.80445,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13136',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'SLIWTLLK',
          'molMass': 972.600803,
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
            'mainScore': 60.436,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 487.307678,
          'correctedMolMass': 972.6007960000001,
          'massDiff': 0.38591,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 405,
            'endPos': 412,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12278',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'SLIWTLLK',
          'molMass': 972.600803,
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
            'mainScore': 77.318,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 487.307678,
          'correctedMolMass': 972.6007960000001,
          'massDiff': 1.1777,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 405,
            'endPos': 412,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11361',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'SKFYGNSLSAILEGEAR',
          'molMass': 1840.93193,
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
            'mainScore': 308.21,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 921.47324,
          'correctedMolMass': 1840.93192,
          'massDiff': -0.11006,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 540,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11353',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'SKFYGNSLSAILEGEAR',
          'molMass': 1840.93193,
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
            'mainScore': 148.52,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 614.651252,
          'correctedMolMass': 1840.9319159999998,
          'massDiff': -0.6236,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 540,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5053',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'RNIMALR',
          'molMass': 872.501441,
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
            'mainScore': 104.45,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 437.257997,
          'correctedMolMass': 872.501434,
          'massDiff': 2.6935,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 846,
            'endPos': 852,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4933',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QVRPGMDLSK',
          'molMass': 1129.59138,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 99.568,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 565.802965,
          'correctedMolMass': 1129.5913699999999,
          'massDiff': 0.27221,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 413,
            'endPos': 422,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11540',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GPKGEAVGSITQPLPSSYLIIR',
          'molMass': 2282.26343,
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
            'mainScore': 144.57,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 761.761754,
          'correctedMolMass': 2282.263422,
          'massDiff': 0.08773,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 225,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8731',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GLKKPYNPILGETFR',
          'molMass': 1731.96719,
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
            'mainScore': 69.345,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 433.999074,
          'correctedMolMass': 1731.967176,
          'massDiff': 0.23076,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 479,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8322',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GLKKPYNPILGETFR',
          'molMass': 1731.96719,
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
            'mainScore': 68.277,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 433.999074,
          'correctedMolMass': 1731.967176,
          'massDiff': -0.35376,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 479,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8315',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GLKKPYNPILGETFR',
          'molMass': 1731.96719,
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
            'mainScore': 76.358,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 578.329673,
          'correctedMolMass': 1731.9671789999998,
          'massDiff': 0.40591,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 479,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4753',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1981.92625,
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
            'mainScore': 82.609,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 991.970401,
          'correctedMolMass': 1981.926242,
          'massDiff': -0.58597,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4747',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1981.92625,
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
            'mainScore': 208.4,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 661.64936,
          'correctedMolMass': 1981.92624,
          'massDiff': 0.008995,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4431',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 80.142,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 666.980998,
          'correctedMolMass': 1997.921154,
          'massDiff': -2.0333,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4250',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 174.04,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 999.967858,
          'correctedMolMass': 1997.9211559999999,
          'massDiff': -0.014928,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4148',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 65.022,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 666.980998,
          'correctedMolMass': 1997.921154,
          'massDiff': 0.76884,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13025',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GILYGTMTLELGGTVNITCQK',
          'molMass': 2268.14939,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 74.029,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1135.08197,
          'correctedMolMass': 2268.14938,
          'massDiff': 0.37127,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 577,
            'endPos': 597,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13023',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GILYGTMTLELGGTVNITCQK',
          'molMass': 2268.14939,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 39.825,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 757.057073,
          'correctedMolMass': 2268.149379,
          'massDiff': -0.31056,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 577,
            'endPos': 597,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11620',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIKQTQEEIKR',
          'molMass': 2600.36572,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 92.792,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 651.098708,
          'correctedMolMass': 2600.365712,
          'massDiff': -0.32355,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 824,
            'endPos': 846,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11613',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIKQTQEEIKR',
          'molMass': 2600.36572,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 172.24,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 867.795851,
          'correctedMolMass': 2600.365713,
          'massDiff': 0.34374,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 824,
            'endPos': 846,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13434',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 43.592,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -0.37521,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12181',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 158.93,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -0.36245,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12062',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 136.83,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 530.285799,
          'correctedMolMass': 1587.8355569999999,
          'massDiff': -0.48609,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11712',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 141,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -0.50184,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8601',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1700.69968,
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
            'mainScore': 56.569,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 851.357118,
          'correctedMolMass': 1700.699676,
          'massDiff': -0.54548,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8894',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1700.69968,
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
            'mainScore': 41.996,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 567.907171,
          'correctedMolMass': 1700.6996729999998,
          'massDiff': -0.15003,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11789',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIRATSESDGR',
          'molMass': 2803.4352,
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
            'mainScore': 99.838,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 935.485677,
          'correctedMolMass': 2803.435191,
          'massDiff': 0.62241,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 228,
            'endPos': 254,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13016',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2000.09424,
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
            'mainScore': 52.185,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1001.0544,
          'correctedMolMass': 2000.09424,
          'massDiff': -1.0365,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12103',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2000.09424,
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
            'mainScore': 174.59,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 667.705357,
          'correctedMolMass': 2000.094231,
          'massDiff': 0.43251,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13385',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 71.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': -0.61297,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12061',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 131.96,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 542.942255,
          'correctedMolMass': 1625.8049250000001,
          'massDiff': -0.25798,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11880',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 178.67,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': -0.00024186,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4305',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QHFKDQDMYSDK',
          'molMass': 1540.66164,
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
            'mainScore': 77.185,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 514.561157,
          'correctedMolMass': 1540.6616309999997,
          'massDiff': 0.36692,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 319,
            'endPos': 330,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8757',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 44.543,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 1.1722,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7101',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 90.614,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 0.085174,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6800',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 93.345,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 0.68714,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11050',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLK',
          'molMass': 1757.83596,
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
            'mainScore': 52.527,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 879.925257,
          'correctedMolMass': 1757.835954,
          'massDiff': -0.072809,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'E',
            'startPos': 361,
            'endPos': 375,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10485',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLK',
          'molMass': 1757.83596,
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
            'mainScore': 37.657,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 586.952597,
          'correctedMolMass': 1757.8359509999998,
          'massDiff': -0.097375,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'E',
            'startPos': 361,
            'endPos': 375,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10459',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLK',
          'molMass': 1757.83596,
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
            'mainScore': 77.42,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 879.925257,
          'correctedMolMass': 1757.835954,
          'massDiff': 0.1544,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'E',
            'startPos': 361,
            'endPos': 375,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12488',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'PWDPLNDMIQFEK',
          'molMass': 1631.76538,
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
            'mainScore': 127.3,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 816.889966,
          'correctedMolMass': 1631.7653719999998,
          'massDiff': -0.23132,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 750,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11882',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'PWDPLNDMIQFEK',
          'molMass': 1647.76029,
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
              'Oxidation'
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
            'mainScore': 81.703,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 824.887423,
          'correctedMolMass': 1647.760286,
          'massDiff': -0.14685,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'PWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 750,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9997',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'PGVLLIYK',
          'molMass': 901.56369,
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
            'mainScore': 79.116,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 451.789121,
          'correctedMolMass': 901.5636820000001,
          'massDiff': -0.77585,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 173,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9166',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'PFLGSSDCVNQISGKLKLGK',
          'molMass': 2147.14087,
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
            'mainScore': 30.945,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 716.720901,
          'correctedMolMass': 2147.140863,
          'massDiff': -0.22415,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'E',
            'startPos': 610,
            'endPos': 629,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9067',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'PFLGSSDCVNQISGK',
          'molMass': 1607.76136,
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
            'mainScore': 190.44,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 804.887955,
          'correctedMolMass': 1607.76135,
          'massDiff': -0.14995,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 610,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12121',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2963.44874,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 188.29,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 988.823524,
          'correctedMolMass': 2963.4487320000003,
          'massDiff': 2.6677,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12118',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2963.44874,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 136.57,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 741.869462,
          'correctedMolMass': 2963.448728,
          'massDiff': 0.13617,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12968',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2222.04664,
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
            'mainScore': 109.72,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 741.68949,
          'correctedMolMass': 2222.0466300000003,
          'massDiff': -0.34923,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12148',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2238.04155,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 102.07,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 747.021128,
          'correctedMolMass': 2238.041544,
          'massDiff': -0.60696,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11684',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2238.04155,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 178.1,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1120.02805,
          'correctedMolMass': 2238.0415399999997,
          'massDiff': 0.58738,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13125',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 74.776,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': -0.19147,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13054',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 11.201,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 580.048221,
          'correctedMolMass': 2316.163764,
          'massDiff': 0.87458,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12266',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 18.353,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 580.048221,
          'correctedMolMass': 2316.163764,
          'massDiff': 0.97952,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11543',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 77.899,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 580.048221,
          'correctedMolMass': 2316.163764,
          'massDiff': 0.28578,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11407',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 175.33,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': 1.401,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12623',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDK',
          'molMass': 2188.06881,
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
            'mainScore': 61.942,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 730.363548,
          'correctedMolMass': 2188.068804,
          'massDiff': -1.1065,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 630,
            'endPos': 648,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11998',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDK',
          'molMass': 2188.06881,
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
            'mainScore': 109.5,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 730.363548,
          'correctedMolMass': 2188.068804,
          'massDiff': -0.91327,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 630,
            'endPos': 648,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12324',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 196.68,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': -0.59097,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11795',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 219.94,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': -1.0028,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10954',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 254.34,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': 0.021218,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9560',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 250.7,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': -0.046556,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7747',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 93.166,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 804.101101,
          'correctedMolMass': 3212.3752839999997,
          'massDiff': 0.51832,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11968',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3107.52752,
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
            'mainScore': 157.52,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1036.84978,
          'correctedMolMass': 3107.5275,
          'massDiff': 0.29766,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TSLLGDSKDVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 27,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8652',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2768.12154,
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
            'mainScore': 88.241,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 923.714458,
          'correctedMolMass': 2768.1215340000003,
          'massDiff': -0.086525,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYSSPEPDIQDS(0.808)S(0.808)GS(0.363)EAQS(0.019)VKPS(0.001)T(0.001)R'
          },
          'highestModifProbability': {
            'Phospho': 0.808
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 12,
                'modifProb': 0.808,
                'status': 'MAIN'
              },
              {
                'position': 13,
                'modifProb': 0.808,
                'status': 'MAIN'
              },
              {
                'position': 15,
                'modifProb': 0.363,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.019,
                'status': 'CONFLICT'
              },
              {
                'position': 23,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 24,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8639',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2768.12154,
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
            'mainScore': 73.239,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1385.06805,
          'correctedMolMass': 2768.12154,
          'massDiff': 0.090247,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYS(0.001)S(0.001)PEPDIQDS(0.664)S(0.664)GS(0.662)EAQS(0.008)VKPSTR'
          },
          'highestModifProbability': {
            'Phospho': 0.664
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 3,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 4,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 12,
                'modifProb': 0.664,
                'status': 'MAIN'
              },
              {
                'position': 13,
                'modifProb': 0.664,
                'status': 'MAIN'
              },
              {
                'position': 15,
                'modifProb': 0.662,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.008,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7570',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2688.15521,
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
            'mainScore': 66.972,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 897.059014,
          'correctedMolMass': 2688.1552020000004,
          'massDiff': 0.1549,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYS(0.2)S(0.8)PEPDIQDSSGSEAQSVKPSTR'
          },
          'highestModifProbability': {
            'Phospho': 0.8
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 3,
                'modifProb': 0.2,
                'status': 'CONFLICT'
              },
              {
                'position': 4,
                'modifProb': 0.8,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8489',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1716.6946,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 49.298,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 573.238809,
          'correctedMolMass': 1716.6945869999997,
          'massDiff': -0.14366,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(0.5)TM(0.5)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 0.5
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 0.5,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 0.5,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6768',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1716.6946,
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
              'Oxidation'
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
            'mainScore': 94.688,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 859.354576,
          'correctedMolMass': 1716.6945919999998,
          'massDiff': -1.2297,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(0.035)TM(0.965)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 0.965
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 0.035,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.965,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10635',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLKETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 4952.2007,
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
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 118.51,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1239.05745,
          'correctedMolMass': 4952.20068,
          'massDiff': 0.10754,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 361,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5579',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1732.68951,
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
            [
              'Oxidation'
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
            'mainScore': 80.96,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 867.352033,
          'correctedMolMass': 1732.689506,
          'massDiff': -0.24666,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(1)TM(1)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5570',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1732.68951,
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
            [
              'Oxidation'
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
            'mainScore': 50.088,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 578.570448,
          'correctedMolMass': 1732.6895040000002,
          'massDiff': -0.11086,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(1)TM(1)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12480',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 4377.05709,
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
            'mainScore': 59.386,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 1460.0263,
          'correctedMolMass': 4377.05706,
          'massDiff': -0.2083,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.227)S(0.599)LLGDS(0.165)KDVLGPS(0.004)T(0.004)VVANSDESQLLTPGK'
          },
          'highestModifProbability': {
            'Phospho': 0.599
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.227,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.599,
                'status': 'MAIN'
              },
              {
                'position': 19,
                'modifProb': 0.165,
                'status': 'CONFLICT'
              },
              {
                'position': 26,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'position': 27,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'M',
            'startPos': 1,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12445',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 4377.05709,
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
            'mainScore': 72.191,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 1095.27155,
          'correctedMolMass': 4377.05708,
          'massDiff': 0.56531,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.413)S(0.413)LLGDS(0.163)KDVLGPS(0.005)T(0.005)VVANSDESQLLTPGK'
          },
          'highestModifProbability': {
            'Phospho': 0.413
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.413,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.413,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.163,
                'status': 'CONFLICT'
              },
              {
                'position': 26,
                'modifProb': 0.005,
                'status': 'CONFLICT'
              },
              {
                'position': 27,
                'modifProb': 0.005,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'M',
            'startPos': 1,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12322',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 4393.052,
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
            'mainScore': 81.831,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 1099.27028,
          'correctedMolMass': 4393.052,
          'massDiff': -0.31633,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
            'Phospho': 'MEGGLADGEPDRT(0.466)S(0.466)LLGDS(0.056)KDVLGPS(0.006)T(0.006)VVANSDESQLLTPGK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.466
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.466,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.466,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.056,
                'status': 'CONFLICT'
              },
              {
                'position': 26,
                'modifProb': 0.006,
                'status': 'CONFLICT'
              },
              {
                'position': 27,
                'modifProb': 0.006,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'M',
            'startPos': 1,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11566',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2979.44366,
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
            [],
            [],
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
            'mainScore': 146.04,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 745.868191,
          'correctedMolMass': 2979.443644,
          'massDiff': -0.0036998,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEKDGVIQTK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12814',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2146.12316,
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
              'Oxidation'
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
            'mainScore': 138.56,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 716.381663,
          'correctedMolMass': 2146.123149,
          'massDiff': 0.074476,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'ELLSTITDPSVIVM(1)ADWLK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 14,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12805',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2146.12316,
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
              'Oxidation'
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
            'mainScore': 132.79,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1074.06886,
          'correctedMolMass': 2146.12316,
          'massDiff': -0.3297,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'ELLSTITDPSVIVM(1)ADWLK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 14,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11977',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2168.92969,
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
            'mainScore': 276.31,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1085.47212,
          'correctedMolMass': 2168.9296799999997,
          'massDiff': -0.59637,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.027)S(0.973)LLGDSK'
          },
          'highestModifProbability': {
            'Phospho': 0.973
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.027,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.973,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11978',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2168.92969,
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
            'mainScore': 159.46,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 723.983841,
          'correctedMolMass': 2168.929683,
          'massDiff': -0.38726,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.02)S(0.979)LLGDS(0.001)K'
          },
          'highestModifProbability': {
            'Phospho': 0.979
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.02,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.979,
                'status': 'MAIN'
              },
              {
                'position': 19,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11308',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2184.92461,
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
            'mainScore': 142.23,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1093.46958,
          'correctedMolMass': 2184.9246,
          'massDiff': -0.81092,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK',
            'Phospho': 'MEGGLADGEPDRT(0.255)S(0.745)LLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.745
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.255,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.745,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11298',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2184.92461,
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
            'mainScore': 79.426,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 729.315479,
          'correctedMolMass': 2184.924597,
          'massDiff': -1.6821,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK',
            'Phospho': 'MEGGLADGEPDRT(0.499)S(0.499)LLGDS(0.003)K'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.499
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.499,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.499,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.003,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10399',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 81.807,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1053.48642,
          'correctedMolMass': 2104.95828,
          'massDiff': 0.35293,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8396',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
          'molMass': 3056.40293,
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
            'mainScore': 81.315,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 765.108009,
          'correctedMolMass': 3056.402916,
          'massDiff': -0.16407,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'EAYPT(0.791)PT(0.209)KDLHQPSLSPASPHSQGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.791
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 5,
                'modifProb': 0.791,
                'status': 'MAIN'
              },
              {
                'position': 7,
                'modifProb': 0.209,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10118',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 99.407,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 702.660036,
          'correctedMolMass': 2104.958268,
          'massDiff': -0.21964,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10062',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 47.499,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1053.48642,
          'correctedMolMass': 2104.95828,
          'massDiff': -0.50189,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9505',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 76.073,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': -0.7865,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11393',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGKMSQR',
          'molMass': 2824.3314,
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
            'mainScore': 126.68,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 942.451078,
          'correctedMolMass': 2824.3313940000003,
          'massDiff': 0.52281,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'DVLGPSTVVANSDESQLLTPGKM(1)SQR',
            'Phospho': 'DVLGPSTVVANS(0.001)DES(0.143)QLLT(0.852)PGKMS(0.004)QR'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.852
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 23,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 12,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 15,
                'modifProb': 0.143,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.852,
                'status': 'MAIN'
              },
              {
                'position': 24,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12183',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2306.10429,
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
            'mainScore': 264.37,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1154.05942,
          'correctedMolMass': 2306.10428,
          'massDiff': 0.097259,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 19,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9205',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2248.93038,
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
            'mainScore': 110.78,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 750.650735,
          'correctedMolMass': 2248.930365,
          'massDiff': -0.095072,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.002)LS(0.998)PAS(0.989)PHS(0.011)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.998
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.998,
                'status': 'MAIN'
              },
              {
                'position': 11,
                'modifProb': 0.989,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.011,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9122',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2248.93038,
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
            'mainScore': 71.297,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1125.47246,
          'correctedMolMass': 2248.93036,
          'massDiff': 0.76441,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.061)LS(0.94)PAS(0.993)PHS(0.006)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.993
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.061,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.94,
                'status': 'MAIN'
              },
              {
                'position': 11,
                'modifProb': 0.993,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.006,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8858',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2248.93038,
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
            'mainScore': 109.23,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 750.650735,
          'correctedMolMass': 2248.930365,
          'massDiff': -0.57455,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(1)LS(1)PASPHSQGFER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8048',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2168.96405,
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
            'mainScore': 63.979,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1085.4893,
          'correctedMolMass': 2168.96404,
          'massDiff': 0.6869,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.013)LS(0.044)PAS(0.916)PHS(0.027)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.916
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.013,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.044,
                'status': 'CONFLICT'
              },
              {
                'position': 11,
                'modifProb': 0.916,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.027,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7921',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2168.96405,
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
            'mainScore': 114.75,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 723.995292,
          'correctedMolMass': 2168.964036,
          'massDiff': 2.0874,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.095)LS(0.903)PAS(0.002)PHSQGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.903
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.095,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.903,
                'status': 'MAIN'
              },
              {
                'position': 11,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7917',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2168.96405,
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
            'mainScore': 57.366,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 543.248288,
          'correctedMolMass': 2168.964032,
          'massDiff': 0.42205,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.534)LS(0.456)PAS(0.01)PHSQGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.534
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.534,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 0.456,
                'status': 'CONFLICT'
              },
              {
                'position': 11,
                'modifProb': 0.01,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9053',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 110.31,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': -0.30606,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7574',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 122.39,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': 0.22988,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7206',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 107.17,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': 0.28091,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12719',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLKIRGTLK',
          'molMass': 2798.56159,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 50.271,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 700.647673,
          'correctedMolMass': 2798.561572,
          'massDiff': -0.68439,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 138,
            'endPos': 162,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13030',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2130.12824,
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
            'mainScore': 150.91,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 711.050024,
          'correctedMolMass': 2130.128232,
          'massDiff': 0.32388,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13021',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2130.12824,
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
            'mainScore': 186.97,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1066.0714,
          'correctedMolMass': 2130.12824,
          'massDiff': 0.90363,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13230',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 66.893,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -1.0354,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12727',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 40.432,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 566.530195,
          'correctedMolMass': 2262.09166,
          'massDiff': -0.13138,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12638',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 57.366,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -0.63528,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11453',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 126.84,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 566.530195,
          'correctedMolMass': 2262.09166,
          'massDiff': 1.181,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11304',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 377.21,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1132.05311,
          'correctedMolMass': 2262.09166,
          'massDiff': -0.5538,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11303',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 191.07,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -0.62549,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13050',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 22.4,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': 0.039445,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10926',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 67.76,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': -0.34008,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10254',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 97.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 859.757508,
          'correctedMolMass': 2576.250684,
          'massDiff': 0.17517,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10249',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 81.884,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 516.257415,
          'correctedMolMass': 2576.2506750000002,
          'massDiff': 0.016701,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 5,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10581',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 86.557,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': -0.45035,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5615',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EDISQNKDESSLSMSK',
          'molMass': 1796.80982,
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
            'mainScore': 137.61,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 899.412188,
          'correctedMolMass': 1796.809816,
          'massDiff': 0.051801,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 79,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '5603',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EDISQNKDESSLSMSK',
          'molMass': 1796.80982,
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
            'mainScore': 66.826,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 599.943884,
          'correctedMolMass': 1796.809812,
          'massDiff': 0.067087,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 79,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '4727',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'EDISQNKDESSLSMSK',
          'molMass': 1812.80474,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 73.279,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 605.275522,
          'correctedMolMass': 1812.804726,
          'massDiff': -0.28633,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'EDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 14,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 79,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11793',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2226.13796,
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
            'mainScore': 188.24,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1114.07625,
          'correctedMolMass': 2226.13794,
          'massDiff': -0.41999,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11791',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2226.13796,
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
            'mainScore': 131.09,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 743.053262,
          'correctedMolMass': 2226.1379460000003,
          'massDiff': 0.50199,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8323',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DQTEATQEKYVLEEAQR',
          'molMass': 2036.96508,
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
            'mainScore': 92.264,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 679.995636,
          'correctedMolMass': 2036.9650679999997,
          'massDiff': 0.67294,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 698,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9491',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NHLVSSTPATDYFLQQK',
          'molMass': 1947.96904,
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
            'mainScore': 194.37,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 974.991797,
          'correctedMolMass': 1947.969034,
          'massDiff': -0.013198,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 853,
            'endPos': 869,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9457',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NHLVSSTPATDYFLQQK',
          'molMass': 1947.96904,
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
            'mainScore': 146.1,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 650.33029,
          'correctedMolMass': 1947.96903,
          'massDiff': 0.06371,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 853,
            'endPos': 869,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11902',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSKK',
          'molMass': 2511.32678,
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
            'mainScore': 174.82,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 838.116202,
          'correctedMolMass': 2511.326766,
          'massDiff': -0.072919,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 184,
            'endPos': 205,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11894',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSKK',
          'molMass': 2511.32678,
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
            'mainScore': 188.19,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 628.838971,
          'correctedMolMass': 2511.326764,
          'massDiff': -0.65848,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 184,
            'endPos': 205,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12309',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSK',
          'molMass': 2383.23181,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 151.87,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 795.417881,
          'correctedMolMass': 2383.231803,
          'massDiff': -0.26734,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 184,
            'endPos': 204,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12281',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSK',
          'molMass': 2383.23181,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 284.88,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1192.62318,
          'correctedMolMass': 2383.2318,
          'massDiff': -0.032792,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 184,
            'endPos': 204,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12675',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIER',
          'molMass': 2071.05206,
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
            'mainScore': 282.85,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1036.53331,
          'correctedMolMass': 2071.05206,
          'massDiff': -0.40911,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'P',
            'startPos': 184,
            'endPos': 201,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12674',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIER',
          'molMass': 2071.05206,
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
            'mainScore': 163.41,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 691.357963,
          'correctedMolMass': 2071.0520490000004,
          'massDiff': -0.21591,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'P',
            'startPos': 184,
            'endPos': 201,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10715',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 36.637,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': -0.22834,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9615',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 36.637,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': 0.069446,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8751',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 47.726,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': -1.021,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8251',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 81.51,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': -0.42711,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7956',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 36.637,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 697.339848,
          'correctedMolMass': 2088.997704,
          'massDiff': -0.58003,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11448',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2088.96336,
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
            [],
            [],
            [],
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
            'mainScore': 122.19,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 697.328397,
          'correctedMolMass': 2088.963351,
          'massDiff': 0.072409,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11447',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2088.96336,
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
            [],
            [],
            [],
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
            'mainScore': 297.55,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1045.48896,
          'correctedMolMass': 2088.9633599999997,
          'massDiff': -0.16527,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10077',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1287.54013,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 117.03,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 644.777341,
          'correctedMolMass': 1287.5401219999999,
          'massDiff': -0.21071,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9743',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1287.54013,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 138,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 644.777341,
          'correctedMolMass': 1287.5401219999999,
          'massDiff': -0.33271,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11569',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYKTQK',
          'molMass': 2058.20637,
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
            'mainScore': 66.436,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 515.55887,
          'correctedMolMass': 2058.2063599999997,
          'massDiff': -0.57032,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 167,
            'endPos': 183,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12486',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 52.071,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 568.008995,
          'correctedMolMass': 1701.0051449999999,
          'massDiff': 0.034555,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12040',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 126.83,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 851.509854,
          'correctedMolMass': 1701.005148,
          'massDiff': -0.013257,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12032',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 130.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 568.008995,
          'correctedMolMass': 1701.0051449999999,
          'massDiff': 0.81665,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11271',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LTFLNRGEDYVMTMPYAHCK',
          'molMass': 2445.12794,
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
            'mainScore': 117.84,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 816.049924,
          'correctedMolMass': 2445.1279320000003,
          'massDiff': -0.21662,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 557,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11253',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LTFLNRGEDYVMTMPYAHCK',
          'molMass': 2445.12794,
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
            'mainScore': 52.19,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 612.289262,
          'correctedMolMass': 2445.127928,
          'massDiff': -0.67594,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 557,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13857',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 19.992,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 938.429169,
          'correctedMolMass': 2812.265667,
          'massDiff': 0.49769,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13073',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 166.28,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 938.429169,
          'correctedMolMass': 2812.265667,
          'massDiff': -0.0091457,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12648',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 155.49,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 938.429169,
          'correctedMolMass': 2812.265667,
          'massDiff': 0.31716,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12298',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 91.889,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 704.073696,
          'correctedMolMass': 2812.265664,
          'massDiff': 0.26221,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12294',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 346.07,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1407.14011,
          'correctedMolMass': 2812.26566,
          'massDiff': -0.30235,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12216',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 166.29,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 938.429169,
          'correctedMolMass': 2812.265667,
          'massDiff': 0.76772,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6935',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 154.26,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1045.50613,
          'correctedMolMass': 2088.9977,
          'massDiff': 1.1763,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7205',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 146.81,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 697.339848,
          'correctedMolMass': 2088.997704,
          'massDiff': 1.151,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6865',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 98.227,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': -1.6835,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8798',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LKPFLGSSDCVNQISGK',
          'molMass': 1848.94038,
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
            'mainScore': 71.685,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 617.320738,
          'correctedMolMass': 1848.940374,
          'massDiff': 0.75364,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 608,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8663',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LKPFLGSSDCVNQISGK',
          'molMass': 1848.94038,
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
            'mainScore': 137.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 925.477468,
          'correctedMolMass': 1848.940376,
          'massDiff': -0.83804,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 608,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12821',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DGFCLSGSILAK',
          'molMass': 1266.62782,
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
            'mainScore': 64.121,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 634.321188,
          'correctedMolMass': 1266.627816,
          'massDiff': -0.28939,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 528,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12384',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'DGFCLSGSILAK',
          'molMass': 1266.62782,
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
            'mainScore': 51.612,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 634.321188,
          'correctedMolMass': 1266.627816,
          'massDiff': -0.05954,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 528,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8463',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LKPFLGSSDCVNQISGK',
          'molMass': 1848.94038,
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
            'mainScore': 52.172,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 617.320738,
          'correctedMolMass': 1848.940374,
          'massDiff': -0.55706,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 608,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10272',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVKGPK',
          'molMass': 1849.02504,
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
            'mainScore': 36.993,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 463.263536,
          'correctedMolMass': 1849.025024,
          'massDiff': -0.24487,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 227,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12785',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 92.19,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.292559,
          'correctedMolMass': 1566.8558369999998,
          'massDiff': -0.81189,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12329',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 98.902,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.292559,
          'correctedMolMass': 1566.8558369999998,
          'massDiff': 0.38087,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11358',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 150.22,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 784.435201,
          'correctedMolMass': 1566.855842,
          'massDiff': -0.53067,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11354',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 168.83,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.292559,
          'correctedMolMass': 1566.8558369999998,
          'massDiff': 0.46197,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13031',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFELDPLTGEWHYK',
          'molMass': 1746.86172,
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
            'mainScore': 54.898,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 583.294517,
          'correctedMolMass': 1746.861711,
          'massDiff': -0.08392,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 731,
            'endPos': 744,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12057',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFELDPLTGEWHYK',
          'molMass': 1746.86172,
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
            'mainScore': 155.39,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 874.438138,
          'correctedMolMass': 1746.861716,
          'massDiff': -0.40937,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 731,
            'endPos': 744,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12051',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'LFELDPLTGEWHYK',
          'molMass': 1746.86172,
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
            'mainScore': 127.78,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 583.294517,
          'correctedMolMass': 1746.861711,
          'massDiff': 0.18389,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 731,
            'endPos': 744,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12820',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1348.65193,
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
            'mainScore': 75.819,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 675.333241,
          'correctedMolMass': 1348.651922,
          'massDiff': 0.87863,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12380',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1348.65193,
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
            'mainScore': 85.813,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 675.333241,
          'correctedMolMass': 1348.651922,
          'massDiff': -1.9987,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12285',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1364.64684,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 192.44,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 683.330698,
          'correctedMolMass': 1364.646836,
          'massDiff': 0.56841,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'CWM(1)DALELALK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7371',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 57.463,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': -1.1231,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '6578',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 102.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': -0.226,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9712',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 75.539,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 751.657116,
          'correctedMolMass': 2251.949508,
          'massDiff': 1.1471,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHSGDNFQLNDS(1)EIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 15,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9465',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 131.04,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1126.98204,
          'correctedMolMass': 2251.94952,
          'massDiff': -0.069093,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHSGDNFQLNDS(1)EIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 15,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9367',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            'mainScore': 93.371,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 751.657116,
          'correctedMolMass': 2251.949508,
          'massDiff': -1.361,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHS(1)GDNFQLNDSEIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10499',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2171.98319,
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
            'mainScore': 53.453,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 725.001672,
          'correctedMolMass': 2171.983176,
          'massDiff': -3.5796,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8312',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2171.98319,
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
            'mainScore': 132.14,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1086.99887,
          'correctedMolMass': 2171.9831799999997,
          'massDiff': 0.13542,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '7538',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'AINAKDQTEATQEKYVLEEAQR',
          'molMass': 2534.26126,
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
            'mainScore': 128.01,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 634.572591,
          'correctedMolMass': 2534.261244,
          'massDiff': 0.096148,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 693,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10389',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KTDNSEVFWNPTPDIK',
          'molMass': 1889.91594,
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
            'mainScore': 99.711,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 630.979257,
          'correctedMolMass': 1889.9159309999998,
          'massDiff': -0.6495,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 649,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10285',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KTDNSEVFWNPTPDIK',
          'molMass': 1889.91594,
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
            'mainScore': 192.85,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 945.965248,
          'correctedMolMass': 1889.9159359999999,
          'massDiff': -0.46786,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 649,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10591',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 41.242,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': -0.45129,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '8793',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 169.6,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 717.890626,
          'correctedMolMass': 1433.766692,
          'massDiff': -0.61648,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9455',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 125.72,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': 0.5655,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '13033',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 28.351,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.52578,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '12487',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 25.122,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -1.0622,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '11169',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 61.167,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': 0.29085,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10838',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 17.962,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.4474,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10476',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 30.484,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.5401,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10139',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 141,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.48834,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '10134',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 57.425,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.63812,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9464',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 57.267,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.16083,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9462',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 200.97,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.28617,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_I-7557',
        'spectrumId': {
          'id': '9109',
          'runId': 'MXQ_I-7557'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 40.941,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.47554,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7336',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'YVLEEAQR',
          'molMass': 1006.50836,
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
            'mainScore': 50.04,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 504.261456,
          'correctedMolMass': 1006.5083520000001,
          'massDiff': 0.069703,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 707,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7007',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'YVLEEAQR',
          'molMass': 1006.50836,
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
            'mainScore': 60.436,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 504.261456,
          'correctedMolMass': 1006.5083520000001,
          'massDiff': -0.080271,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 707,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6334',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'YVLEEAQR',
          'molMass': 1006.50836,
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
            'mainScore': 120.46,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 504.261456,
          'correctedMolMass': 1006.5083520000001,
          'massDiff': -0.0069984,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 707,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8765',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LKPFLGSSDCVNQISGK',
          'molMass': 1848.94038,
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
            'mainScore': 142.26,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 925.477468,
          'correctedMolMass': 1848.940376,
          'massDiff': -0.93578,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 608,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10427',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVKGPK',
          'molMass': 1849.02504,
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
            'mainScore': 37.353,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 463.263536,
          'correctedMolMass': 1849.025024,
          'massDiff': 0.15762,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 227,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12509',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 79.492,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.292559,
          'correctedMolMass': 1566.8558369999998,
          'massDiff': -0.10707,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11908',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 114.72,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.292559,
          'correctedMolMass': 1566.8558369999998,
          'massDiff': 0.94364,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11519',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFHPLEQSIWAVK',
          'molMass': 1566.85585,
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
            'mainScore': 152.16,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 784.435201,
          'correctedMolMass': 1566.855842,
          'massDiff': 0.45644,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'G',
            'startPos': 212,
            'endPos': 224,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12666',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFELDPLTGEWHYK',
          'molMass': 1746.86172,
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
            'mainScore': 106.58,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 583.294517,
          'correctedMolMass': 1746.861711,
          'massDiff': -0.10921,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 731,
            'endPos': 744,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12246',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LFELDPLTGEWHYK',
          'molMass': 1746.86172,
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
            'mainScore': 122.97,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 874.438138,
          'correctedMolMass': 1746.861716,
          'massDiff': -0.95634,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'F',
            'startPos': 731,
            'endPos': 744,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11775',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'WYLSGFYK',
          'molMass': 1062.51747,
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
            'mainScore': 52.482,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 532.26601,
          'correctedMolMass': 1062.51746,
          'massDiff': 0.20413,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 468,
            'endPos': 475,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12518',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'VVLPTFILEPR',
          'molMass': 1282.76491,
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
            'mainScore': 99.343,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 428.595579,
          'correctedMolMass': 1282.7648969999998,
          'massDiff': -1.0551,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 423,
            'endPos': 433,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12513',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'VVLPTFILEPR',
          'molMass': 1282.76491,
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
            'mainScore': 84.507,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 642.389731,
          'correctedMolMass': 1282.764902,
          'massDiff': 0.1906,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 423,
            'endPos': 433,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11372',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'VVKWYLSGFYK',
          'molMass': 1388.74926,
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
            'mainScore': 89.9,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 463.923696,
          'correctedMolMass': 1388.7492479999999,
          'massDiff': 0.38425,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 465,
            'endPos': 475,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10729',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KTDNSEVFWNPTPDIK',
          'molMass': 1889.91594,
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
            'mainScore': 110.84,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 630.979257,
          'correctedMolMass': 1889.9159309999998,
          'massDiff': -0.62887,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 649,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10570',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KTDNSEVFWNPTPDIK',
          'molMass': 1889.91594,
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
            'mainScore': 219.01,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 945.965248,
          'correctedMolMass': 1889.9159359999999,
          'massDiff': -0.56873,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 649,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13002',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 17.587,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': -0.068608,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11317',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 57.175,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': 0.12002,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10602',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 65.179,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': 0.082746,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8883',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 141.13,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 717.890626,
          'correctedMolMass': 1433.766692,
          'massDiff': -0.27712,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9552',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KPYNPILGETFR',
          'molMass': 1433.7667,
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
            'mainScore': 126.66,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 478.92951,
          'correctedMolMass': 1433.76669,
          'massDiff': 1.2534,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 482,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13248',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 58.32,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.34361,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13204',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 47.621,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.23036,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12192',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 33.304,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.35699,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11334',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 59.294,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': 1.7166,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11077',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 72.891,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.6774,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11003',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 19.527,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': -0.233,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10371',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 98.582,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.090756,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10308',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 64.798,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': 0.071817,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9952',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 80.905,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': 0.33624,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9577',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 190.41,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 698.368669,
          'correctedMolMass': 1394.7227779999998,
          'massDiff': -0.43954,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9195',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'KDGFCLSGSILAK',
          'molMass': 1394.72279,
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
            'mainScore': 48.467,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 465.914872,
          'correctedMolMass': 1394.7227759999998,
          'massDiff': 0.22721,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 527,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7028',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2608.18888,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 128.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 870.403571,
          'correctedMolMass': 2608.1888730000005,
          'massDiff': 0.34621,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11687',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GPKGEAVGSITQPLPSSYLIIR',
          'molMass': 2282.26343,
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
            'mainScore': 153.36,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 761.761754,
          'correctedMolMass': 2282.263422,
          'massDiff': 0.35569,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 225,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8566',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GLKKPYNPILGETFR',
          'molMass': 1731.96719,
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
            'mainScore': 69.878,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 578.329673,
          'correctedMolMass': 1731.9671789999998,
          'massDiff': -0.15447,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 479,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8420',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GLKKPYNPILGETFR',
          'molMass': 1731.96719,
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
            'mainScore': 90.412,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 433.999074,
          'correctedMolMass': 1731.967176,
          'massDiff': -0.30799,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 479,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5155',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1981.92625,
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
            'mainScore': 81.157,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 661.64936,
          'correctedMolMass': 1981.92624,
          'massDiff': -3.1173,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4821',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1981.92625,
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
            'mainScore': 243.23,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 991.970401,
          'correctedMolMass': 1981.926242,
          'massDiff': -0.057543,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4816',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1981.92625,
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
            'mainScore': 191.64,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 661.64936,
          'correctedMolMass': 1981.92624,
          'massDiff': 0.43885,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4512',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 70.555,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 500.487567,
          'correctedMolMass': 1997.9211480000001,
          'massDiff': 0.29651,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4335',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 164.94,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 999.967858,
          'correctedMolMass': 1997.9211559999999,
          'massDiff': -0.28982,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4322',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GKEDISQNKDESSLSMSK',
          'molMass': 1997.92116,
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
              'Oxidation'
            ],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 101.38,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 666.980998,
          'correctedMolMass': 1997.921154,
          'massDiff': 0.24344,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GKEDISQNKDESSLSM(1)SK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 16,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 77,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12522',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GILYGTMTLELGGTVNITCQK',
          'molMass': 2268.14939,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 75.533,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 757.057073,
          'correctedMolMass': 2268.149379,
          'massDiff': -0.47458,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 577,
            'endPos': 597,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11780',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIKQTQEEIKR',
          'molMass': 2600.36572,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 162.81,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 867.795851,
          'correctedMolMass': 2600.365713,
          'massDiff': 0.12172,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 824,
            'endPos': 846,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11759',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIKQTQEEIKR',
          'molMass': 2600.36572,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 108.08,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 651.098708,
          'correctedMolMass': 2600.365712,
          'massDiff': -0.050045,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 824,
            'endPos': 846,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13655',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 50.305,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -0.81613,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12361',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 160.65,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -0.093371,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12240',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 156.24,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 530.285799,
          'correctedMolMass': 1587.8355569999999,
          'massDiff': -0.42622,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11870',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GIELGDIQSSIESIK',
          'molMass': 1587.83557,
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
            'mainScore': 162.37,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 794.92506,
          'correctedMolMass': 1587.83556,
          'massDiff': -1.2105,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 824,
            'endPos': 838,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10211',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 69.361,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1053.48642,
          'correctedMolMass': 2104.95828,
          'massDiff': -0.046189,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9788',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 43.594,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': -0.93913,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9165',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 50.897,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': -0.29796,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8841',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 43.03,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': -0.28084,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7697',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 113.24,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': 0.11357,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7338',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1303.53504,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 58.098,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 652.774799,
          'correctedMolMass': 1303.535038,
          'massDiff': 0.2846,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDR'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12648',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3187.49385,
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
            'mainScore': 88.231,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1063.50523,
          'correctedMolMass': 3187.4938500000003,
          'massDiff': -0.22291,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'T(0.015)S(0.017)LLGDS(0.964)KDVLGPS(0.002)T(0.002)VVANSDES(0.004)QLLT(0.996)PGK'
          },
          'highestModifProbability': {
            'Phospho': 0.996
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 1,
                'modifProb': 0.015,
                'status': 'CONFLICT'
              },
              {
                'position': 2,
                'modifProb': 0.017,
                'status': 'CONFLICT'
              },
              {
                'position': 7,
                'modifProb': 0.964,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'position': 15,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'position': 23,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'position': 27,
                'modifProb': 0.996,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12167',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3107.52752,
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
            'mainScore': 80.693,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 777.889156,
          'correctedMolMass': 3107.5275039999997,
          'massDiff': 0.19033,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TSLLGDSKDVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 27,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12159',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3107.52752,
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
            'mainScore': 212.4,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1554.77104,
          'correctedMolMass': 3107.52752,
          'massDiff': -0.067052,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TSLLGDSKDVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 27,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12129',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3107.52752,
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
            'mainScore': 173.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1036.84978,
          'correctedMolMass': 3107.5275,
          'massDiff': 0.226,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TSLLGDSKDVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 27,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '4572',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'HRTPMVSVPK',
          'molMass': 1246.58934,
          'modificationNames': [
            [],
            [],
            [],
            [
              'Phospho'
            ],
            [],
            [
              'Oxidation'
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
            'mainScore': 45.115,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 416.537057,
          'correctedMolMass': 1246.589331,
          'massDiff': 0.34726,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'HRTPM(1)VSVPK',
            'Phospho': 'HRT(0.999)PMVS(0.001)VPK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.999
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 5,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 3,
                'modifProb': 0.999,
                'status': 'MAIN'
              },
              {
                'position': 7,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'M',
            'startPos': 772,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8938',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2768.12154,
          'modificationNames': [
            [],
            [],
            [],
            [
              'Phospho'
            ],
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 95.551,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 923.714458,
          'correctedMolMass': 2768.1215340000003,
          'massDiff': -0.59485,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYS(1)S(1)PEPDIQDSSGSEAQSVKPSTR'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 4,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8521',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2768.12154,
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
            'mainScore': 37.821,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 923.714458,
          'correctedMolMass': 2768.1215340000003,
          'massDiff': -0.35058,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYS(0.479)S(0.519)PEPDIQDS(0.456)S(0.42)GS(0.117)EAQS(0.007)VKPS(0.001)T(0.001)R'
          },
          'highestModifProbability': {
            'Phospho': 0.519
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 3,
                'modifProb': 0.479,
                'status': 'CONFLICT'
              },
              {
                'position': 4,
                'modifProb': 0.519,
                'status': 'MAIN'
              },
              {
                'position': 12,
                'modifProb': 0.456,
                'status': 'MAIN'
              },
              {
                'position': 13,
                'modifProb': 0.42,
                'status': 'CONFLICT'
              },
              {
                'position': 15,
                'modifProb': 0.117,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.007,
                'status': 'CONFLICT'
              },
              {
                'position': 23,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 24,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7681',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GYSSPEPDIQDSSGSEAQSVKPSTR',
          'molMass': 2688.15521,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 49.266,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 897.059014,
          'correctedMolMass': 2688.1552020000004,
          'massDiff': 0.085161,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GYS(0.5)S(0.5)PEPDIQDSSGSEAQSVKPSTR'
          },
          'highestModifProbability': {
            'Phospho': 0.5
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 3,
                'modifProb': 0.5,
                'status': 'MAIN'
              },
              {
                'position': 4,
                'modifProb': 0.5,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'R',
            'startPos': 796,
            'endPos': 820,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6898',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 953.42932,
          'modificationNames': [
            [],
            [
              'Phospho'
            ],
            [],
            [
              'Oxidation'
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
            'mainScore': 64.103,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 477.721936,
          'correctedMolMass': 953.4293120000001,
          'massDiff': -0.48063,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'TPM(1)VSVPK',
            'Phospho': 'T(1)PMVSVPK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7252',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1716.6946,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 36.944,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 573.238809,
          'correctedMolMass': 1716.6945869999997,
          'massDiff': 0.056332,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(0.933)TM(0.067)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 0.933
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 0.933,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 0.067,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6882',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1716.6946,
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
              'Oxidation'
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
            'mainScore': 55.724,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 859.354576,
          'correctedMolMass': 1716.6945919999998,
          'massDiff': -1.2097,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(0.044)TM(0.956)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 0.956
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 0.044,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.956,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6849',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1716.6946,
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
              'Oxidation'
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
            'mainScore': 51.726,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 573.238809,
          'correctedMolMass': 1716.6945869999997,
          'massDiff': -1.8321,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(0.043)TM(0.957)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 0.957
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 0.043,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.957,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5644',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1732.68951,
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
            [
              'Oxidation'
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
            'mainScore': 64.104,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 867.352033,
          'correctedMolMass': 1732.689506,
          'massDiff': -0.47752,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(1)TM(1)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5635',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1732.68951,
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
            [
              'Oxidation'
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
            'mainScore': 44.511,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 578.570448,
          'correctedMolMass': 1732.6895040000002,
          'massDiff': -0.12307,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'GEDYVM(1)TM(1)PYAHCK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12845',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2080.06057,
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
            'mainScore': 179.19,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1041.03756,
          'correctedMolMass': 2080.06056,
          'massDiff': 0.94244,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'GEAVGS(0.006)IT(0.994)QPLPSSYLIIR'
          },
          'highestModifProbability': {
            'Phospho': 0.994
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.006,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.994,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11738',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2979.44366,
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
            [],
            [],
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
            'mainScore': 116.7,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 994.155162,
          'correctedMolMass': 2979.443646,
          'massDiff': 0.41754,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEKDGVIQTK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11729',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2979.44366,
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
            [],
            [],
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
            'mainScore': 76.152,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 745.868191,
          'correctedMolMass': 2979.443644,
          'massDiff': -0.22242,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEKDGVIQTK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13014',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2146.12316,
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
              'Oxidation'
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
            'mainScore': 131.25,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 716.381663,
          'correctedMolMass': 2146.123149,
          'massDiff': 0.36421,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'ELLSTITDPSVIVM(1)ADWLK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 14,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13009',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2146.12316,
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
              'Oxidation'
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
            'mainScore': 179.1,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1074.06886,
          'correctedMolMass': 2146.12316,
          'massDiff': 0.16058,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'ELLSTITDPSVIVM(1)ADWLK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 14,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10321',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EAYPTPTKDLHQPSLSPASPHSQGFER',
          'molMass': 3216.33559,
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
            [
              'Phospho'
            ],
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
            'mainScore': 41.24,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 805.091174,
          'correctedMolMass': 3216.335576,
          'massDiff': 0.4935,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'EAYPT(0.794)PT(0.525)KDLHQPS(0.194)LS(0.514)PAS(0.916)PHS(0.057)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.916
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 5,
                'modifProb': 0.794,
                'status': 'MAIN'
              },
              {
                'position': 7,
                'modifProb': 0.525,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.194,
                'status': 'CONFLICT'
              },
              {
                'position': 16,
                'modifProb': 0.514,
                'status': 'MAIN'
              },
              {
                'position': 19,
                'modifProb': 0.916,
                'status': 'MAIN'
              },
              {
                'position': 22,
                'modifProb': 0.057,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11540',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGKMSQR',
          'molMass': 2824.3314,
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
            'mainScore': 114.76,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 942.451078,
          'correctedMolMass': 2824.3313940000003,
          'massDiff': -0.71237,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'DVLGPSTVVANSDESQLLTPGKM(1)SQR',
            'Phospho': 'DVLGPSTVVANSDES(0.032)QLLT(0.963)PGKMS(0.005)QR'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.963
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 23,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 15,
                'modifProb': 0.032,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.963,
                'status': 'MAIN'
              },
              {
                'position': 24,
                'modifProb': 0.005,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13158',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2386.07062,
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
            'mainScore': 212.39,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1194.04259,
          'correctedMolMass': 2386.07062,
          'massDiff': -0.14824,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DVLGPSTVVANS(1)DES(0.001)QLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 12,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 15,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12930',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2306.10429,
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
            'mainScore': 82.479,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 769.708705,
          'correctedMolMass': 2306.104275,
          'massDiff': -0.029406,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 19,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12814',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2306.10429,
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
            'mainScore': 186.43,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1154.05942,
          'correctedMolMass': 2306.10428,
          'massDiff': 0.28692,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DVLGPSTVVANSDES(0.001)QLLT(0.999)PGK'
          },
          'highestModifProbability': {
            'Phospho': 0.999
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 15,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.999,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10910',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLKETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 4952.2007,
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
            [],
            [],
            [],
            [],
            [],
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
            'mainScore': 83.002,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1239.05745,
          'correctedMolMass': 4952.20068,
          'massDiff': 0.017605,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'S',
            'startPos': 361,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12342',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2306.10429,
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
            'mainScore': 307.53,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1154.05942,
          'correctedMolMass': 2306.10428,
          'massDiff': 1.1106,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DVLGPSTVVANSDESQLLT(1)PGK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 19,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10398',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2328.89671,
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
            [
              'Phospho'
            ],
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
            'mainScore': 57.648,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 777.306179,
          'correctedMolMass': 2328.896697,
          'massDiff': 0.4477,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(1)LS(1)PAS(0.997)PHS(0.003)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 11,
                'modifProb': 0.997,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.003,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9194',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2248.93038,
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
            'mainScore': 81.763,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1125.47246,
          'correctedMolMass': 2248.93036,
          'massDiff': 0.695,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.164)LS(0.9)PAS(0.915)PHS(0.021)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.915
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.164,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.9,
                'status': 'MAIN'
              },
              {
                'position': 11,
                'modifProb': 0.915,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.021,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8155',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2168.96405,
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
            'mainScore': 87.511,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 723.995292,
          'correctedMolMass': 2168.964036,
          'massDiff': 0.20296,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'DLHQPS(0.001)LS(0.022)PAS(0.973)PHS(0.004)QGFER'
          },
          'highestModifProbability': {
            'Phospho': 0.973
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'position': 8,
                'modifProb': 0.022,
                'status': 'CONFLICT'
              },
              {
                'position': 11,
                'modifProb': 0.973,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12726',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 4473.01833,
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
            'mainScore': 91.322,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 1119.26186,
          'correctedMolMass': 4473.01832,
          'massDiff': 0.7407,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSKDVLGPSTVVANSDESQLLTPGK',
            'Phospho': 'MEGGLADGEPDRT(0.522)S(0.465)LLGDS(0.005)KDVLGPS(0.004)T(0.004)VVANSDES(0.004)QLLT(0.996)PGK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.996
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.522,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.465,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.005,
                'status': 'CONFLICT'
              },
              {
                'position': 26,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'position': 27,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'position': 35,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'position': 39,
                'modifProb': 0.996,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'M',
            'startPos': 1,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11275',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2331.91585,
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
            'mainScore': 104.6,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 778.312559,
          'correctedMolMass': 2331.915837,
          'massDiff': -0.05087,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHS(1)GDNFQLNDS(1)EIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'position': 15,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8706',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEDYVMTMPYAHCK',
          'molMass': 1700.69968,
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
            'mainScore': 65.043,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 567.907171,
          'correctedMolMass': 1700.6996729999998,
          'massDiff': -0.79024,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 563,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11939',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIRATSESDGR',
          'molMass': 2803.4352,
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
            'mainScore': 129.9,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 935.485677,
          'correctedMolMass': 2803.435191,
          'massDiff': 0.74166,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 228,
            'endPos': 254,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12688',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2000.09424,
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
            'mainScore': 116.6,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1001.0544,
          'correctedMolMass': 2000.09424,
          'massDiff': -0.60779,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12287',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2000.09424,
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
            'mainScore': 159.04,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 667.705357,
          'correctedMolMass': 2000.094231,
          'massDiff': -0.055805,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12229',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'GEAVGSITQPLPSSYLIIR',
          'molMass': 2000.09424,
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
            'mainScore': 219.01,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1001.0544,
          'correctedMolMass': 2000.09424,
          'massDiff': -0.61807,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 228,
            'endPos': 246,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '14028',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 44.252,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': -0.54856,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13630',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 64.52,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': -0.2536,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12457',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 112.17,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': -0.75556,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12239',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 127.32,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 542.942255,
          'correctedMolMass': 1625.8049250000001,
          'massDiff': -0.50406,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11957',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FYGNSLSAILEGEAR',
          'molMass': 1625.80494,
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
            'mainScore': 125.22,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 813.909744,
          'correctedMolMass': 1625.804928,
          'massDiff': 0.78519,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 542,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11921',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TSLLGDSKDVLGPSTVVANSDESQLLTPGK',
          'molMass': 3027.56119,
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
            'mainScore': 139.52,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1010.19434,
          'correctedMolMass': 3027.56118,
          'massDiff': -1.0909,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 13,
            'endPos': 42,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8654',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 937.434405,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 55.314,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 469.724479,
          'correctedMolMass': 937.434398,
          'massDiff': -0.22093,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TPMVS(1)VPK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 5,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6581',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 857.468075,
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
            'mainScore': 57.708,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 429.741314,
          'correctedMolMass': 857.468068,
          'massDiff': 0.59251,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5952',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TPMVSVPK',
          'molMass': 873.462989,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 53.493,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 437.738771,
          'correctedMolMass': 873.462982,
          'massDiff': -0.25954,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'TPM(1)VSVPK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'M',
            'startPos': 774,
            'endPos': 781,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9992',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEKLWQR',
          'molMass': 1926.87481,
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
            'mainScore': 155.57,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 964.44468,
          'correctedMolMass': 1926.8747999999998,
          'massDiff': -0.34209,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 675,
            'endPos': 689,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9970',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEKLWQR',
          'molMass': 1926.87481,
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
            'mainScore': 145.43,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 643.298878,
          'correctedMolMass': 1926.8747939999996,
          'massDiff': 2.6848,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 675,
            'endPos': 689,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8856',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 43.68,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 0.39607,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7466',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 83.182,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 0.35738,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7122',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 86.911,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': -2.1265,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6810',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FEEQGDFESEK',
          'molMass': 1343.55174,
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
            'mainScore': 134.13,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 672.783147,
          'correctedMolMass': 1343.551734,
          'massDiff': 0.5682,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 675,
            'endPos': 685,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12304',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2963.44874,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 146.2,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 988.823524,
          'correctedMolMass': 2963.4487320000003,
          'massDiff': 2.3938,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12298',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEKDGVIQTK',
          'molMass': 2963.44874,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 124.51,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 741.869462,
          'correctedMolMass': 2963.448728,
          'massDiff': -0.30335,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'V',
            'startPos': 745,
            'endPos': 769,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12541',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2222.04664,
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
            'mainScore': 156.73,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 741.68949,
          'correctedMolMass': 2222.0466300000003,
          'massDiff': 1.936,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12331',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2238.04155,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 76.176,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 747.021128,
          'correctedMolMass': 2238.041544,
          'massDiff': -0.66919,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11842',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'FADTRPWDPLNDMIQFEK',
          'molMass': 2238.04155,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 174.7,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1120.02805,
          'correctedMolMass': 2238.0415399999997,
          'massDiff': -0.053007,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'FADTRPWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 13,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 745,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13837',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 27.924,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': 0.27493,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13243',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 97.271,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': 0.0013409,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13232',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 52.185,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 580.048221,
          'correctedMolMass': 2316.163764,
          'massDiff': 0.43751,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12804',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 83.423,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': 0.98333,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11701',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 173.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 773.061869,
          'correctedMolMass': 2316.163767,
          'massDiff': 0.60284,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11699',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDKK',
          'molMass': 2316.16378,
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
            'mainScore': 54.225,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 580.048221,
          'correctedMolMass': 2316.163764,
          'massDiff': 0.24957,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 630,
            'endPos': 649,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13483',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDK',
          'molMass': 2188.06881,
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
            'mainScore': 62.617,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 730.363548,
          'correctedMolMass': 2188.068804,
          'massDiff': -0.86346,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 630,
            'endPos': 648,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12177',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EVLATLEGHWDSEVFITDK',
          'molMass': 2188.06881,
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
            'mainScore': 117.65,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 730.363548,
          'correctedMolMass': 2188.068804,
          'massDiff': -0.85273,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 630,
            'endPos': 648,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13075',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 196.55,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': 0.10439,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11952',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 214.11,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': -0.61215,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10734',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 214.11,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': 0.089837,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9668',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 247.13,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': 0.017252,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7535',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 93.166,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 804.101101,
          'correctedMolMass': 3212.3752839999997,
          'massDiff': 0.51618,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7235',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ETTYTEQSHEELGEAGEASQTETVSEENK',
          'molMass': 3212.3753,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 23.467,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1071.79904,
          'correctedMolMass': 3212.3752800000007,
          'massDiff': 0.71703,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 376,
            'endPos': 404,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11091',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TNSKTFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2992.48315,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 31.771,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 749.128065,
          'correctedMolMass': 2992.48314,
          'massDiff': 0.34422,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'K',
            'startPos': 501,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12601',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TGYSAILEFK',
          'molMass': 1127.58628,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 72.2,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 564.800414,
          'correctedMolMass': 1127.586268,
          'massDiff': -0.041201,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 598,
            'endPos': 607,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11981',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TGYSAILEFK',
          'molMass': 1127.58628,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 76.332,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 564.800414,
          'correctedMolMass': 1127.586268,
          'massDiff': -0.083792,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 598,
            'endPos': 607,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11502',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TGYSAILEFK',
          'molMass': 1127.58628,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 110.54,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 564.800414,
          'correctedMolMass': 1127.586268,
          'massDiff': 0.63606,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 598,
            'endPos': 607,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10995',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNRK',
          'molMass': 2690.36052,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 53.444,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 673.597407,
          'correctedMolMass': 2690.3605079999998,
          'massDiff': -0.034631,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 505,
            'endPos': 527,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '14533',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 24.207,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 641.573666,
          'correctedMolMass': 2562.265544,
          'massDiff': -0.52438,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '14037',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 31.067,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.049571,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12158',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2168.92969,
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
            'mainScore': 135.8,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 723.983841,
          'correctedMolMass': 2168.929683,
          'massDiff': -0.3652,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.601)S(0.399)LLGDS(0.001)K'
          },
          'highestModifProbability': {
            'Phospho': 0.601
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.601,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.399,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13261',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 41.615,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -1.069,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12821',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 51.39,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.89006,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11479',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 264.63,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1282.14006,
          'correctedMolMass': 2562.26556,
          'massDiff': -0.38574,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11384',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 106.35,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 855.095796,
          'correctedMolMass': 2562.265548,
          'massDiff': -0.54327,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11169',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TFYIAEQVSHHPPISAFYVSNR',
          'molMass': 2562.26556,
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
            'mainScore': 21.242,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 641.573666,
          'correctedMolMass': 2562.265544,
          'massDiff': -0.24783,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 505,
            'endPos': 526,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12435',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TDNSEVFWNPTPDIK',
          'molMass': 1841.78731,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 141.53,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 921.900931,
          'correctedMolMass': 1841.787302,
          'massDiff': 2.7843,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'TDNSEVFWNPT(1)PDIK'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 11,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 650,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11920',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'TDNSEVFWNPTPDIK',
          'molMass': 1761.82098,
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
            'mainScore': 51.073,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 588.280936,
          'correctedMolMass': 1761.8209679999998,
          'massDiff': -0.090009,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 650,
            'endPos': 664,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12677',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'SLIWTLLK',
          'molMass': 972.600803,
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
            'mainScore': 58.981,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 487.307678,
          'correctedMolMass': 972.6007960000001,
          'massDiff': 1.3006,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 405,
            'endPos': 412,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11521',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'SKFYGNSLSAILEGEAR',
          'molMass': 1840.93193,
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
            'mainScore': 251.56,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 921.47324,
          'correctedMolMass': 1840.93192,
          'massDiff': 0.031932,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 540,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11514',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'SKFYGNSLSAILEGEAR',
          'molMass': 1840.93193,
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
            'mainScore': 155.2,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 614.651252,
          'correctedMolMass': 1840.9319159999998,
          'massDiff': -0.062315,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 540,
            'endPos': 556,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12155',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2168.92969,
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
            'mainScore': 281.93,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1085.47212,
          'correctedMolMass': 2168.9296799999997,
          'massDiff': -0.37628,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'MEGGLADGEPDRT(0.002)S(0.998)LLGDSK'
          },
          'highestModifProbability': {
            'Phospho': 0.998
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.998,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11471',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2184.92461,
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
            'mainScore': 186.27,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1093.46958,
          'correctedMolMass': 2184.9246,
          'massDiff': -0.63522,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK',
            'Phospho': 'MEGGLADGEPDRT(0.172)S(0.828)LLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.828
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.172,
                'status': 'CONFLICT'
              },
              {
                'position': 14,
                'modifProb': 0.828,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11453',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2184.92461,
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
            'mainScore': 85.777,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 729.315479,
          'correctedMolMass': 2184.924597,
          'massDiff': -1.6834,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK',
            'Phospho': 'MEGGLADGEPDRT(0.494)S(0.494)LLGDS(0.012)K'
          },
          'highestModifProbability': {
            'Oxidation': 1,
            'Phospho': 0.494
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'position': 13,
                'modifProb': 0.494,
                'status': 'MAIN'
              },
              {
                'position': 14,
                'modifProb': 0.494,
                'status': 'CONFLICT'
              },
              {
                'position': 19,
                'modifProb': 0.012,
                'status': 'CONFLICT'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10635',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'QDDSYIEPEPVEPLK',
          'molMass': 1757.83596,
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
            'mainScore': 118.16,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 879.925257,
          'correctedMolMass': 1757.835954,
          'massDiff': -0.074442,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'E',
            'startPos': 361,
            'endPos': 375,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11462',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'PYNPILGETFR',
          'molMass': 1305.67174,
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
            'mainScore': 129.82,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 653.843145,
          'correctedMolMass': 1305.67173,
          'massDiff': -0.72208,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'C',
            'startPos': 483,
            'endPos': 493,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12673',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'PWDPLNDMIQFEK',
          'molMass': 1631.76538,
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
            'mainScore': 193.62,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 816.889966,
          'correctedMolMass': 1631.7653719999998,
          'massDiff': -0.34583,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 750,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12066',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'PWDPLNDMIQFEK',
          'molMass': 1647.76029,
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
              'Oxidation'
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
            'mainScore': 61.167,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 824.887423,
          'correctedMolMass': 1647.760286,
          'massDiff': 0.39925,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'PWDPLNDM(1)IQFEK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 750,
            'endPos': 762,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10137',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'PGVLLIYK',
          'molMass': 901.56369,
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
            'mainScore': 102.71,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 451.789121,
          'correctedMolMass': 901.5636820000001,
          'massDiff': -0.40545,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 173,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9164',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'PFLGSSDCVNQISGK',
          'molMass': 1607.76136,
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
            'mainScore': 172.82,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 804.887955,
          'correctedMolMass': 1607.76135,
          'massDiff': 0.052212,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 610,
            'endPos': 624,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9602',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NHLVSSTPATDYFLQQK',
          'molMass': 1947.96904,
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
            'mainScore': 110.12,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 974.991797,
          'correctedMolMass': 1947.969034,
          'massDiff': -0.2043,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 853,
            'endPos': 869,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9564',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NHLVSSTPATDYFLQQK',
          'molMass': 1947.96904,
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
            'mainScore': 70.41,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 650.33029,
          'correctedMolMass': 1947.96903,
          'massDiff': 0.056273,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'D',
            'startPos': 853,
            'endPos': 869,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12085',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSKK',
          'molMass': 2511.32678,
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
            'mainScore': 136.96,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 838.116202,
          'correctedMolMass': 2511.326766,
          'massDiff': 0.23961,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 184,
            'endPos': 205,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12061',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSKK',
          'molMass': 2511.32678,
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
            'mainScore': 186.06,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 628.838971,
          'correctedMolMass': 2511.326764,
          'massDiff': -0.29878,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'D',
            'startPos': 184,
            'endPos': 205,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12490',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSK',
          'molMass': 2383.23181,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 131.09,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 795.417881,
          'correctedMolMass': 2383.231803,
          'massDiff': 0.079036,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 184,
            'endPos': 204,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12455',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIERPSK',
          'molMass': 2383.23181,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 261.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1192.62318,
          'correctedMolMass': 2383.2318,
          'massDiff': 0.092723,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'K',
            'startPos': 184,
            'endPos': 204,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12870',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIER',
          'molMass': 2071.05206,
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
            'mainScore': 300.32,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1036.53331,
          'correctedMolMass': 2071.05206,
          'massDiff': 0.37389,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'P',
            'startPos': 184,
            'endPos': 201,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12864',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'NGQWVGTVLLNACEIIER',
          'molMass': 2071.05206,
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
            'mainScore': 198.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 691.357963,
          'correctedMolMass': 2071.0520490000004,
          'massDiff': 0.13288,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'P',
            'startPos': 184,
            'endPos': 201,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10550',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 89.859,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1053.48642,
          'correctedMolMass': 2104.95828,
          'massDiff': 0.33626,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13227',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2130.12824,
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
            'mainScore': 91.317,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 711.050024,
          'correctedMolMass': 2130.128232,
          'massDiff': -0.050226,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13224',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ELLSTITDPSVIVMADWLK',
          'molMass': 2130.12824,
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
            'mainScore': 169.25,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1066.0714,
          'correctedMolMass': 2130.12824,
          'massDiff': 1.1494,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'I',
            'startPos': 138,
            'endPos': 156,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13700',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 31.41,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -0.62284,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13342',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 65.423,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -0.058258,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11508',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 130.56,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 755.037835,
          'correctedMolMass': 2262.091665,
          'massDiff': -0.68544,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11489',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 112.82,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 566.530195,
          'correctedMolMass': 2262.09166,
          'massDiff': -0.071223,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11463',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EHDLSVSSDSTHVTFYGLLR',
          'molMass': 2262.09168,
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
            'mainScore': 336.3,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1132.05311,
          'correctedMolMass': 2262.09166,
          'massDiff': -0.59054,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'A',
            'startPos': 280,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13247',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 24.207,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': -0.029479,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11101',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 69.088,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': -0.48842,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10422',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 132.83,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 859.757508,
          'correctedMolMass': 2576.250684,
          'massDiff': -0.36043,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10417',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 16.593,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 516.257415,
          'correctedMolMass': 2576.2506750000002,
          'massDiff': 0.023817,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 5,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10400',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EGKEHDLSVSSDSTHVTFYGLLR',
          'molMass': 2576.25069,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 65.207,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 645.06995,
          'correctedMolMass': 2576.2506799999996,
          'massDiff': -0.25459,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'A',
            'startPos': 277,
            'endPos': 299,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10222',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2104.95828,
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
            [],
            [],
            [],
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
            'mainScore': 54.225,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 702.660036,
          'correctedMolMass': 2104.958268,
          'massDiff': -0.092602,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'M(1)EGGLADGEPDRTSLLGDSK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5689',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EDISQNKDESSLSMSK',
          'molMass': 1796.80982,
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
            'mainScore': 74.141,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 899.412188,
          'correctedMolMass': 1796.809816,
          'massDiff': 0.12939,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 79,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5680',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EDISQNKDESSLSMSK',
          'molMass': 1796.80982,
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
            'mainScore': 73.279,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 599.943884,
          'correctedMolMass': 1796.809812,
          'massDiff': 0.59237,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 79,
            'endPos': 94,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '5351',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'EAYPTPTK',
          'molMass': 985.415778,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 39.785,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 493.715166,
          'correctedMolMass': 985.4157720000001,
          'massDiff': 0.76163,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'EAYPT(0.85)PT(0.15)K'
          },
          'highestModifProbability': {
            'Phospho': 0.85
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 5,
                'modifProb': 0.85,
                'status': 'MAIN'
              },
              {
                'position': 7,
                'modifProb': 0.15,
                'status': 'CONFLICT'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11984',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2226.13796,
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
            'mainScore': 184.78,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 743.053262,
          'correctedMolMass': 2226.1379460000003,
          'massDiff': -0.78355,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11975',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DVLGPSTVVANSDESQLLTPGK',
          'molMass': 2226.13796,
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
            'mainScore': 250.38,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1114.07625,
          'correctedMolMass': 2226.13794,
          'massDiff': -0.52576,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8439',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DQTEATQEKYVLEEAQR',
          'molMass': 2036.96508,
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
            'mainScore': 124.29,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 679.995636,
          'correctedMolMass': 2036.9650679999997,
          'massDiff': 0.53014,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'Q',
            'startPos': 698,
            'endPos': 714,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7370',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 39.905,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 523.256705,
          'correctedMolMass': 2088.9977,
          'massDiff': 0.57261,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7063',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DLHQPSLSPASPHSQGFER',
          'molMass': 2088.99772,
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
            'mainScore': 79.489,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 697.339848,
          'correctedMolMass': 2088.997704,
          'massDiff': 0.55293,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
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
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '13060',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DGFCLSGSILAK',
          'molMass': 1266.62782,
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
            'mainScore': 75.115,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 634.321188,
          'correctedMolMass': 1266.627816,
          'massDiff': -0.23297,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 528,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12600',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'DGFCLSGSILAK',
          'molMass': 1266.62782,
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
            'mainScore': 93.614,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 634.321188,
          'correctedMolMass': 1266.627816,
          'massDiff': 0.29791,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'S',
            'startPos': 528,
            'endPos': 539,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12554',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1348.65193,
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
            'mainScore': 60.255,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 675.333241,
          'correctedMolMass': 1348.651922,
          'massDiff': -3.3898,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12908',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1364.64684,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 92.866,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 683.330698,
          'correctedMolMass': 1364.646836,
          'massDiff': 0.38118,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'CWM(1)DALELALK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12462',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CWMDALELALK',
          'molMass': 1364.64684,
          'modificationNames': [
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 124.42,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 683.330698,
          'correctedMolMass': 1364.646836,
          'massDiff': -0.49265,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Oxidation': 'CWM(1)DALELALK'
          },
          'highestModifProbability': {
            'Oxidation': 1
          },
          'modificationInfos': {
            'Oxidation': [
              {
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'C',
            'startPos': 255,
            'endPos': 265,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8108',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 51.572,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': -0.26381,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '7328',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 52.683,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': -0.61671,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6921',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 118.06,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': -1.092,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '6589',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'CLWIHPR',
          'molMass': 980.501441,
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
            'mainScore': 121.68,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 491.257997,
          'correctedMolMass': 980.501434,
          'massDiff': 0.041445,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'T',
            'startPos': 494,
            'endPos': 500,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9818',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 130.83,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 751.657116,
          'correctedMolMass': 2251.949508,
          'massDiff': -0.30192,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHSGDNFQLNDS(1)EIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 15,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9483',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            'mainScore': 51.301,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1126.98204,
          'correctedMolMass': 2251.94952,
          'massDiff': 0.39807,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHS(1)GDNFQLNDSEIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9462',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            'mainScore': 101.41,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 751.657116,
          'correctedMolMass': 2251.949508,
          'massDiff': -0.39273,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHS(1)GDNFQLNDSEIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8904',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2251.94952,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 69.27,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 751.657116,
          'correctedMolMass': 2251.949508,
          'massDiff': -0.59154,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationProbabilities': {
            'Phospho': 'ANNLHSGDNFQLNDS(1)EIER'
          },
          'highestModifProbability': {
            'Phospho': 1
          },
          'modificationInfos': {
            'Phospho': [
              {
                'position': 15,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8498',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2171.98319,
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
            'mainScore': 180.02,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 725.001672,
          'correctedMolMass': 2171.983176,
          'massDiff': -2.3843,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8403',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2171.98319,
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
            'mainScore': 172.3,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1086.99887,
          'correctedMolMass': 2171.9831799999997,
          'massDiff': 0.66041,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '8065',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'ANNLHSGDNFQLNDSEIER',
          'molMass': 2171.98319,
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
            'mainScore': 84.946,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1086.99887,
          'correctedMolMass': 2171.9831799999997,
          'massDiff': -0.0016122,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'Q',
            'startPos': 300,
            'endPos': 318,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11607',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2088.96336,
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
            [],
            [],
            [],
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
            'mainScore': 148.69,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 697.328397,
          'correctedMolMass': 2088.963351,
          'massDiff': -0.53514,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11605',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDRTSLLGDSK',
          'molMass': 2088.96336,
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
            [],
            [],
            [],
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
            'mainScore': 313.81,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 1045.48896,
          'correctedMolMass': 2088.9633599999997,
          'massDiff': -0.42978,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'D',
            'startPos': 1,
            'endPos': 20,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '10064',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1287.54013,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 103.2,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 644.777341,
          'correctedMolMass': 1287.5401219999999,
          'massDiff': 0.13355,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '9814',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'MEGGLADGEPDR',
          'molMass': 1287.54013,
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
            [],
            [],
            [],
            [],
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 54.343,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 644.777341,
          'correctedMolMass': 1287.5401219999999,
          'massDiff': -0.011823,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false,
          'modificationInfos': {
            'Acetyl': [
              {
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ]
          }
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': '-',
            'nextAA': 'T',
            'startPos': 1,
            'endPos': 12,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11722',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYKTQK',
          'molMass': 2058.20637,
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
            'mainScore': 83.37,
            'scoreMap': {}
          },
          'numMissedCleavages': 2,
          'correctedMoz': 515.55887,
          'correctedMolMass': 2058.2063599999997,
          'massDiff': -0.51527,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'N',
            'startPos': 167,
            'endPos': 183,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12667',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 66.023,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 568.008995,
          'correctedMolMass': 1701.0051449999999,
          'massDiff': -0.84876,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12217',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 141.13,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 851.509854,
          'correctedMolMass': 1701.005148,
          'massDiff': -0.7092,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12208',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LWCVLKPGVLLIYK',
          'molMass': 1701.00516,
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
            'mainScore': 156.36,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 568.008995,
          'correctedMolMass': 1701.0051449999999,
          'massDiff': 0.25235,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'T',
            'startPos': 167,
            'endPos': 180,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11425',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LTFLNRGEDYVMTMPYAHCK',
          'molMass': 2445.12794,
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
            'mainScore': 98.175,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 816.049924,
          'correctedMolMass': 2445.1279320000003,
          'massDiff': 1.2233,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 557,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '11421',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LTFLNRGEDYVMTMPYAHCK',
          'molMass': 2445.12794,
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
            'mainScore': 38.377,
            'scoreMap': {}
          },
          'numMissedCleavages': 1,
          'correctedMoz': 612.289262,
          'correctedMolMass': 2445.127928,
          'massDiff': -0.70619,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'R',
            'nextAA': 'G',
            'startPos': 557,
            'endPos': 576,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12476',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 65.954,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 704.073696,
          'correctedMolMass': 2812.265664,
          'massDiff': 0.76885,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 4,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12474',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 308.98,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 1407.14011,
          'correctedMolMass': 2812.26566,
          'massDiff': -0.47936,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 2,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      },
      {
        'searchId': 'MXQ_M-7558',
        'spectrumId': {
          'id': '12461',
          'runId': 'MXQ_M-7558'
        },
        'pep': {
          'sequence': 'LSDYYYHADFLSEAALEENPYFR',
          'molMass': 2812.26568,
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
            []
          ]
        },
        'matchInfo': {
          'score': {
            'mainScore': 174.82,
            'scoreMap': {}
          },
          'numMissedCleavages': 0,
          'correctedMoz': 938.429169,
          'correctedMolMass': 2812.265667,
          'massDiff': -0.23264,
          'massDiffUnit': 'ppm',
          'rank': 1,
          'chargeState': 3,
          'isRejected': false
        },
        'proteinList': [
          {
            'proteinRef': {
              'AC': 'Q9BZF1',
              'identifiers': [],
              'source': 'UP000005640_9606.fasta'
            },
            'previousAA': 'K',
            'nextAA': 'L',
            'startPos': 439,
            'endPos': 461,
            'isDecoy': false
          }
        ]
      }
    ]

  };
});

