/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

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
                banner: '/*** svelte - 1.3.0 ***/'
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

      watch: {
          scripts: {
            files: ['*svelte.js'],
            tasks: ['uglify','jshint','jsdoc','qunit'],
            options: {
              spawn: false,
            },
          },
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default Tasks
    grunt.registerTask('default', ['uglify','jshint','qunit','watch']); 

};