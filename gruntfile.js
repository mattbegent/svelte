/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    var browsers = [
    {
        browserName: "chrome",
        platform: "Windows 8.1",
        version: "41"
    }, 
    {
        browserName: "firefox",
        platform: "Windows 8.1",
        version: "36"
    }, 
    {
        browserName: "internet explorer",
        platform: "Windows 8.1",
        version: "11"
    }, 
    {
        browserName: "internet explorer",
        platform: "Windows 8",
        version: "10"
    }, 
    { 
        browserName: 'safari', 
        version: '8', 
        platform: 'OS X 10.10' 
    }
    ];

    grunt.initConfig({

      jsdoc : {
        dist : {
            src: ['svelte.js'], 
            options: {
                destination: 'docs'
            }
        }
      },

      uglify : {
        dist : {
            options: {
                sourceMap: false,
                banner: '/* svelte - 1.4.3 */'
            },
            files: {
                'svelte.min.js': ['svelte.js'],
            }
        }
      },

      jshint: {
        all: ['svelte.js']
      },

      qunit: {
        all: ['test/index.html']
      },

      connect: {
        server: {
          options: {
            port: 5005,
            base: '.'
          }
        }
      },

      watch: {
          scripts: {
            files: ['*svelte.js'],
            tasks: ['uglify','jshint','qunit'], 
            options: {
              spawn: false,
            },
          },
        },

      'saucelabs-qunit': {
        all: {
            options: {
                urls: ["http://localhost:5005/test/index.html"],
                tunnelTimeout: 5,
                build: 'build-142', //process.env.TRAVIS_JOB_ID
                concurrency: 3,
                browsers: browsers,
                testname: "qunit tests",
                tags: ["master"]
            }
        }

      }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-saucelabs');

    // Default Tasks
    grunt.registerTask('default', ['uglify','jshint','qunit','connect','watch']); 

    // test
    grunt.registerTask("test", ["connect", "saucelabs-qunit"]);

};