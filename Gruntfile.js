module.exports = function(grunt) {

  grunt.initConfig({
    shell: {
      precompile: {
        command: 'node precompile.js',
        options: {
          stdout: true,
          failOnError: true
        }
      }
    },

    clean: {
      temp: ['.temp']
    }
  });
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('prod', [
    'clean',
    'shell:precompile'
  ]);

  grunt.registerTask('default', function() {
    grunt.log('Grunt not required to do anything in a dev environment.');
  });
};