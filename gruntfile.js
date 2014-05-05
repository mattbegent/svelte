/* ==========================================================================
// Gruntfile.js
// =========================================================================*/

module.exports = function(grunt) {

    grunt.initConfig({

      jsdoc : {
        dist : {
            src: ['bscript.js'], 
            options: {
                destination: 'docs'
            }
        }
      },

      uglify : {
        dist : {
            options: {
                sourceMap: true,
                banner: '/*** bScript - 1.0.0 ***/'
            },
            files: {
                'bScript.min.js': ['bScript.js'],
            }
        }
      }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default Tasks
    grunt.registerTask('default', ['uglify','jsdoc']);

};