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
                sourceMap: true,
                banner: '/*** svelte - 1.1.0 ***/'
            },
            files: {
                'svelte.min.js': ['svelte.js'],
            }
        }
      },

      jshint: {
        all: ['svelte.js']
      }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default Tasks
    grunt.registerTask('default', ['uglify','jshint','jsdoc']);

};