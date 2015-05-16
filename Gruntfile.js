module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
              'src/init.js',
              'src/hooks.js', 
              'src/scene/geometries.js', 
              'src/scene/renderer.js', 
              'src/utils/colors.js',
              'src/utils/units.js',
              'src/utils/observers.js',
              'src/teardown.js'
              ],
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
        files: ['src/*.js', 'src/**/*.js'],
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
