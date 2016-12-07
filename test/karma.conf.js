// Karma configuration
// Generated on Thu Feb 05 2015 09:58:05 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-aria/angular-aria.min.js',
      'bower_components/angular-cookies/angular-cookies.min.js',
      'bower_components/angular-messages/angular-messages.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-touch/angular-touch.min.js',
      'bower_components/angularytics/dist/angularytics.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/sib-fishtones-js/dist/fishtones-js-bundle-min.js',
      'bower_components/sib-pviz/dist/sib-pviz-bundle.min.js',
      'app/scripts/**/*.js',
      'test/spec/unit/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Original setting:
    browsers: ['PhantomJS'],

    /*
    // ###########################
    // Local settings:
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS'], //'XXChrome'
    browsers: ['Chrome'],
    // Local setting stops here
    // ###########################
    */

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
