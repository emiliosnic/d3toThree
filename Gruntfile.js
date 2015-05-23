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
              'src/setup.js', 
              'src/scene/materials.js', 
              'src/scene/geometries.js', 
              'src/scene/cameras.js', 
              'src/scene/renderers.js', 
              'src/scene/groups.js', 
              'src/scene/controls.js', 
              'src/views/base.js', 
              'src/views/line.js', 
              'src/views/axis.js', 
              'src/views/text.js', 
              'src/views/wireframe.js', 
              'src/views/circle.js', 
              'src/scene/lights.js', 
              'src/scene/parser.js', 
              'src/controller.js', 
              'src/utils/colors.js',
              'src/utils/helpers.js',
              'src/utils/units.js',
              'src/teardown.js',
              'src/dependencies/OrbitControls.js', 
              'src/dependencies/TrackballControls.js', 
              'src/dependencies/CanvasRenderer.js', 
              'src/dependencies/helvetiker_regular.typeface.js', 
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
    }
  });

  // Grunt Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Grunt Tasks
  grunt.registerTask('default', ['concat', 'uglify','watch']);
};
