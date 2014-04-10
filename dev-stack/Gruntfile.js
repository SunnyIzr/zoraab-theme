module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    less: {
      css: {
        // options: {
        //   sourceMap: true,
        //   sourceMapFilename: 'custom-bootstrap.map'
        // },
        files: {
          'dist/css/shopping-cart.css': ['less/shopping-cart.less'],
        },
      },

      minify: {
        options: {
          cleancss: true,
        },
        files: {
          'dist/css/shopping-cart.min.css': ['less/shopping-cart.less'],
        },
      }
    },

    copy: {
      distCss: {
        expand: true,
        src: ['dist/css/*'],
        dest: 'build/css/',
        filter: 'isFile',
      },
    },

    watch: {
      //watch 'less/' directory for changes; if changed, recompile and re-minify custom-boostrap.less 
      less: {
        files: ['less/**/*.less'],
        tasks: ['less:css'],
        options: {
          // spawn: false,
          reload: true,
        },
      },
      // watch for changes to minified files in the 'dist/' directory; if changed, copy the files that changed to the 'pub/dist/' directory
      // dist: {
      //   files: ['dist/css/**/*.min.css'],
      //   tasks: ['copy'],
      //   options: {
      //     spawn: false,
      //     event: ['changed'],
      //   },
      // },
    },
  });

  //TASKS

  // grunt.registerTask('css', ['newer:less', 'watch:less']);

  // Default task. -- Watch LESS files. Compile to CSS. Send compiled 'shopping-cart.css' to 'dist/css'
  grunt.registerTask('default', ['less', 'watch:less']);

  //Minify updated 'shopping-cart.css' in 'dist/css'. Output minified file to 'dist/css'. Copy both minified unminifed CSS to 'build/css'
  grunt.registerTask('build-css', ['less:minify', 'copy:dist-css', 'watch:dist']);

  grunt.registerTask('css-pub', ['css', 'css-copy']);

  // grunt.registerTask('dist-css', ['newer:less', 'newer:copy', 'watch']);

  grunt.registerTask('pub-css', ['newer:less', 'newer:copy:css']);

  grunt.registerTask('watch-all', ['less', 'newer:copy:css', 'jekyll', 'watch']);

  grunt.registerTask('pub-push', ['pub-css', 'gh-pages']);





};

