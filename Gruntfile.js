module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/module1.js', 'src/module2.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },    
    uglify: {
      options: {
        compress: true,
        mangle: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true
        },
      },
    },
  });

  // Grunt Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Grunt Tasks
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};
