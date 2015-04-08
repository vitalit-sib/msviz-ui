'use strict';
angular.module('thirdparties', [])
/**
 * provide lodash as '_'
 */
  .service('_', function ($window) {
    return $window._;
  })
/**
 * provide d3 as 'd3'
 */
  .service('d3', function ($window) {
    return $window.d3;
  })
/**
 * provide fishtones as 'fishtones'
 */
  .service('fishtones', function ($window) {
    return $window.fishtones;
  })
/**
 * provide pviz as 'pviz'
 */
  .service('pviz', function ($window) {
    return $window.pviz;
  })
;
