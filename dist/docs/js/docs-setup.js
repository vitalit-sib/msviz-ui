NG_DOCS={
  "sections": {
    "api": "API Documentation"
  },
  "pages": [
    {
      "section": "api",
      "id": "environment.service:EnvConfig",
      "shortName": "EnvConfig",
      "type": "function",
      "moduleName": "environment",
      "shortDescription": "EnvConfig",
      "keywords": "api backendurl configure current depending envconfig environment function handler localhost location moment pointer service set swissqt url"
    },
    {
      "section": "api",
      "id": "environment.service:httpProxy",
      "shortName": "httpProxy",
      "type": "service",
      "moduleName": "environment",
      "shortDescription": "wrap common call (GET ...) to the backend , prefixing backendUrl and getting data out of response",
      "keywords": "$http absolute api backend backendurl call common data environment method options opts pass prefixing response returned service uri wrap"
    },
    {
      "section": "api",
      "id": "experimental.service:spectrumService",
      "shortName": "spectrumService",
      "type": "service",
      "moduleName": "experimental",
      "shortDescription": "Access to MS/MS basket",
      "keywords": "access api based basket experimental expmsmsspectrum findspbyrunidandid findsprefbyrunidandid method ms pid reference runid service spectrum spextrum"
    },
    {
      "section": "api",
      "id": "fishtones-wrapper.service:fishtonifyService",
      "shortName": "fishtonifyService",
      "type": "service",
      "moduleName": "fishtones-wrapper",
      "shortDescription": "convert spectrum, matches etc. into fishTones ready object",
      "keywords": "api buildrichseq convert convertspectrum expmsmspectrum fishtones fishtones-wrapper info input matches method msviz object pep psm ready received rich richsequence sequence serialized service spectrum wet"
    },
    {
      "section": "api",
      "id": "matches.controller:detailedMatchCtrl",
      "shortName": "detailedMatchCtrl",
      "type": "controller",
      "moduleName": "matches",
      "shortDescription": "controller to handled the detailed item (moused over",
      "keywords": "api args bean controller detailed handled item map matches object type"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesFishtonesPsmSpectrum",
      "shortName": "matchesFishtonesPsmSpectrum",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "display a fishtones PSM spectrum view",
      "keywords": "api directive display fishtones matches psm spectrum view"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesFishtonesPsmSpectrum",
      "shortName": "matchesFishtonesPsmSpectrum",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "display a fishtones PSM spectrum view",
      "keywords": "api directive display fishtones matches psm spectrum view"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesPsmBox",
      "shortName": "matchesPsmBox",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "psm box",
      "keywords": "api box directive matches psm"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesPsmListDetails",
      "shortName": "matchesPsmListDetails",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "show the list of the selected peptides",
      "keywords": "api directive list matches peptides selected"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesPsmOneLiner",
      "shortName": "matchesPsmOneLiner",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "psm super short summary",
      "keywords": "api directive matches psm short summary super"
    },
    {
      "section": "api",
      "id": "matches.directive:matchesPsmPviz",
      "shortName": "matchesPsmPviz",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "pviz one protein among multiple searches",
      "keywords": "api directive matches multiple protein pviz searches"
    },
    {
      "section": "api",
      "id": "matches.directive:xicPopover",
      "shortName": "xicPopover",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "the popover when moving over the precursors in the XIC",
      "keywords": "api directive matches moving popover precursors xic"
    },
    {
      "section": "api",
      "id": "matches.directive:xicTable",
      "shortName": "xicTable",
      "type": "directive",
      "moduleName": "matches",
      "shortDescription": "the table showing the xic values after quantitation",
      "keywords": "api directive matches quantitation showing table values xic"
    },
    {
      "section": "api",
      "id": "matches.ModifFilter:ModifFilter",
      "shortName": "ModifFilter",
      "type": "object",
      "moduleName": "matches",
      "shortDescription": "A bean to restrict a search results on modification",
      "keywords": "active api arguments bean call clean field function getselectedmodification init launches matches modif modiffilter modification modifications object oncomplete optinal opts populate process promise properties protein restrict search searches selected selecting set setselectedmodification setting trigger values"
    },
    {
      "section": "api",
      "id": "matches.object:ProteinMatchesGlobalPvizView",
      "shortName": "ProteinMatchesGlobalPvizView",
      "type": "object",
      "moduleName": "matches",
      "shortDescription": "the proteinMatchOverview",
      "keywords": "aa acid amino api buid build count features getfeaturesaainfos getfeaturesaatargetmodif getfeaturespsmisomodifs getfeaturespsms getfeaturespsmscount info level list matches modif modified object proteinmatchoverview psm psmisomodif psms pviz ready target"
    },
    {
      "section": "api",
      "id": "matches.object:PSMIsoModif",
      "shortName": "PSMIsoModif",
      "type": "object",
      "moduleName": "matches",
      "shortDescription": "contains a list of psms who have the same sequence and set of modifications",
      "keywords": "api appearing args build built check combinations compulsory contained course description equivalent fixmodif format grouped i2 iso list lower map matches method modif modification modifications multiple nb number object peptides pos position positions potential properties proteinlist psm psmisomodif psms return sequence set undefined underlying varmodif"
    },
    {
      "section": "api",
      "id": "matches.service:psmIsoModifBuilder",
      "shortName": "psmIsoModifBuilder",
      "type": "service",
      "moduleName": "matches",
      "shortDescription": "take a list of psms, group them by equivalent sequence number of modifications and build an array of PSMIsoModif",
      "keywords": "api array build equivalent group list matches method modif modifications number psm psmisomodif psms sequence service set single"
    },
    {
      "section": "api",
      "id": "matches.service:psmService",
      "shortName": "psmService",
      "type": "service",
      "moduleName": "matches",
      "shortDescription": "Access to PSMS",
      "keywords": "access add addfishtonesobjects api based count evenutally findallbysearchidandspectrumid findallbysearchidsandproteinid findallmodificationsbysearchids findallproteinrefsbysearchids fishtones ids list map matches method modification modifications modifname optional property protein proteinid psm psms richrseq search searchid searchids service set specrtum spectrumid unique withmodif"
    },
    {
      "section": "api",
      "id": "matches.service:searchService",
      "shortName": "searchService",
      "type": "service",
      "moduleName": "matches",
      "shortDescription": "Access to Searches",
      "keywords": "access api array findallsearchids list matches method searches searchids service string"
    },
    {
      "section": "api",
      "id": "matches.view:MatchesFishtonesPsmSpectrumView",
      "shortName": "MatchesFishtonesPsmSpectrumView",
      "type": "object",
      "moduleName": "matches",
      "shortDescription": "wrapper around the fisthones/d3 view for psm",
      "keywords": "api fisthones matches object psm view wrapper"
    },
    {
      "section": "api",
      "id": "multi-matches.service:multiSearchService",
      "shortName": "multiSearchService",
      "type": "service",
      "moduleName": "multi-matches",
      "shortDescription": "Access to Searches",
      "keywords": "ac access amount api array data findbymultisearchid html list method multi-matches object prepare prepareamountproteins prepareproteininfos protein proteinidents proteinrefs proteins searches searchid searchids service"
    },
    {
      "section": "api",
      "id": "proteinMatches.object:ProteinMatch",
      "shortName": "ProteinMatch",
      "type": "object",
      "moduleName": "proteinMatches",
      "shortDescription": "a match with a protein decription and a list of PSM",
      "keywords": "ac acid amino api best coverage covered decription depth enhanced eventually getaminoacidinfo getmybestpsms getmypsms getprotein getpsms gettargetaminoacidwithtargetmodif gettargetmodification info list match matched method modif modificaiton modification object objects optional parameters pointing position protein proteinmatch proteinmatches proteinref psm psms selectedmodification sequence string target targeted targetmodification tweak valid"
    },
    {
      "section": "api",
      "id": "proteinMatches.service:proteinMatchesService",
      "shortName": "proteinMatchesService",
      "type": "service",
      "moduleName": "proteinMatches",
      "shortDescription": "Access proteinIds via the matches spaces (no sequence, but the list of protein Ids etc.)",
      "keywords": "access api array based findbysearchid ids list matches method names protein proteinids proteinmatches search searchid sequence service spaces"
    },
    {
      "section": "api",
      "id": "sequences.service:sequenceService",
      "shortName": "sequenceService",
      "type": "service",
      "moduleName": "sequences",
      "shortDescription": "Access sequence definition (from AC/source to sequence)",
      "keywords": "ac access api definition getsource method object protein sequence sequences service"
    }
  ],
  "apis": {
    "api": true
  },
  "html5Mode": false,
  "editExample": true,
  "startPage": "/api",
  "scripts": [
    "angular.min.js"
  ]
};