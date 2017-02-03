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
        expect(featurePsms.length).toEqual(4);

        var first = featurePsms[1];
        expect(first.modif.length).toEqual(2);

        var modif = first.modif[0];
        var expected = {pos: 3, modifNames: 'Phospho', text: 'Phospho', modifRank: 'first', selectedModif: true};
        expect(modif).toEqual(expected);

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
                'name': 'Phospho',
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
                'name': 'Oxidation',
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
                'name': 'Phospho',
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
                'name': 'Oxidation',
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
                'name': 'Phospho',
                'position': 5,
                'modifProb': 0.85,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
          'isRejected': false
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
          'isRejected': false
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
          'isRejected': false
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
          'isRejected': false
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.522,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.465,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 19,
                'modifProb': 0.005,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 26,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 27,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 35,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 39,
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
                'name': 'Phospho',
                'position': 1,
                'modifProb': 0.015,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 2,
                'modifProb': 0.017,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 7,
                'modifProb': 0.964,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 15,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 23,
                'modifProb': 0.004,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Oxidation',
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.601,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.399,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 19,
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
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.002,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.998,
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
                'name': 'Oxidation',
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.172,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.828,
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
                'name': 'Oxidation',
                'position': 1,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.494,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.494,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 19,
                'modifProb': 0.012,
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 5,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
                'position': 3,
                'modifProb': 0.999,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 3,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 3,
                'modifProb': 0.479,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 4,
                'modifProb': 0.519,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 12,
                'modifProb': 0.456,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 13,
                'modifProb': 0.42,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 15,
                'modifProb': 0.117,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 19,
                'modifProb': 0.007,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 23,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 3,
                'modifProb': 0.5,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 6,
                'modifProb': 0.933,
                'status': 'MAIN'
              },
              {
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 6,
                'modifProb': 0.044,
                'status': 'CONFLICT'
              },
              {
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 6,
                'modifProb': 0.043,
                'status': 'CONFLICT'
              },
              {
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Oxidation',
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
                'name': 'Oxidation',
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Oxidation',
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
                'name': 'Phospho',
                'position': 6,
                'modifProb': 0.006,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Oxidation',
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
                'name': 'Phospho',
                'position': 5,
                'modifProb': 0.794,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 7,
                'modifProb': 0.525,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 14,
                'modifProb': 0.194,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 16,
                'modifProb': 0.514,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 19,
                'modifProb': 0.916,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Oxidation',
                'position': 23,
                'modifProb': 1,
                'status': 'MAIN'
              }
            ],
            'Phospho': [
              {
                'name': 'Phospho',
                'position': 15,
                'modifProb': 0.032,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 19,
                'modifProb': 0.963,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 12,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 15,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 15,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 8,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 11,
                'modifProb': 0.997,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 6,
                'modifProb': 1,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 6,
                'modifProb': 0.164,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 8,
                'modifProb': 0.9,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
                'position': 11,
                'modifProb': 0.915,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
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
                'name': 'Phospho',
                'position': 6,
                'modifProb': 0.001,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 8,
                'modifProb': 0.022,
                'status': 'CONFLICT'
              },
              {
                'name': 'Phospho',
                'position': 11,
                'modifProb': 0.973,
                'status': 'MAIN'
              },
              {
                'name': 'Phospho',
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
      }
    ]
  };
});

