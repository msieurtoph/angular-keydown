'use strict';

var loadGruntTasks = require('load-grunt-tasks'),
  timeGrunt = require('time-grunt'),
  jsHintStylish = require('jshint-stylish')
;

module.exports = function (grunt) {

  // Load grunt tasks automatically
  loadGruntTasks(grunt);

  // Time how long tasks take. Can help when optimizing build times
  timeGrunt(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: jsHintStylish
      },
      all: [
        '*.js',
        'spec/**/*.js'
      ]
    },

    watch: {
      js: {
        files: [
          '.jshintrc',
          '*.js',
          'spec/**/*.spec.js'
        ],
        tasks: [
          'test'
        ]
      }
    },

    karma: {
      options: {
        files: [
          'node_modules/angular/angular.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'angular-keydown.js',
          'spec/angular-keydown.spec.js'
        ]
      },
      unit: {
        frameworks: ['jasmine'],
        singleRun: true,
        browsers: ['PhantomJS','Firefox'/*, 'Chrome'*/],
        reporters: ['spec', 'coverage'],
        // logLevel: 'DEBUG',
        plugins: [
          'karma-spec-reporter',
          'karma-jasmine',
          'karma-phantomjs-launcher',
          // 'karma-chrome-launcher',
          'karma-firefox-launcher',
          'karma-coverage'
        ],
        preprocessors: {
          './angular-keydown.js': ['coverage']
        },
        coverageReporter: {
          dir: 'coverage',
          reporters: [
            { type: 'lcov', subdir: 'report-lcov' }
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', [
    'jshint:all',
    'karma:unit',
  ]);


};