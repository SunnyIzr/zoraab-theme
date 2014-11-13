module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  
  watch: {
    sass: {
      files: 'styles/*.scss',
      tasks: ['sass','cssmin']
    },
    scripts: {
      files: 'scripts/*',
      tasks: ['uglify']
    },
    images: {
      files: 'images/*',
      tasks: ['copy:images']
    },
    videos: {
      files: 'videos/*',
      tasks: ['copy:videos']
    }
    ,
    fonts: {
      files: 'fonts/*',
      tasks: ['copy:fonts']
    }
  },
  clean: ['deploy/assets/*'],
  sass: {                             
      dist:{                       
        options: {
          style: 'expanded'
        },
      files: {
        'styles/style.css' : 'styles/style.scss'
      }
    }
  },
  cssmin: {
    minify: {
      files: {
        'deploy/assets/style.min.css' : 'styles/style.css' 
      }
    }
  },
  uglify: {
     my_target: {
      files: {
        'deploy/assets/script.min.js': 'scripts/*'
      }
    }
  },
  copy: {
    images: {
      expand: true,
      cwd: 'images/',
      src: '**',
      dest: 'deploy/assets/',
      flatten: true,
      filter: 'isFile'
    },
    videos: {
      expand: true,
      cwd: 'videos/',
      src: '**',
      dest: 'deploy/assets/',
      flatten: true,
      filter: 'isFile'
    },
    fonts: {
      expand: true,
      cwd: 'fonts/',
      src: '**',
      dest: 'deploy/assets/',
      flatten: true,
      filter: 'isFile'
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('build', [
    'clean',
    'sass',
    'cssmin',
    'uglify',
    'copy'
    ]);
  
  grunt.registerTask('default', ['sass']);

};
