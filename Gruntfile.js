'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    uglify:{
      dist:{
        src:['src/checkforce.js'],
        dest:'dist/CheckForce.js'
      }
    },
    copy:{
      dist:{
        src:['dist/CheckForce.js'],
        dest:'dist/checkforce.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('dist',['uglify','copy']);

};
