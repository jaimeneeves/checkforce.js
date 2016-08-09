'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    uglify:{
      dist:{
        src:['checkforce.js'],
        dest:'dist/checkforce.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('dist',['uglify']);

};
