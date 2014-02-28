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

  // Run this task before starting in production
  grunt.registerTask('production', [
    'clean',
    'shell:precompile'
  ]);

  // This is Sails's default task when launching the app in production.
  // But Sails runs this task in a different order, and we need to
  // precompile our assets before any middleware is run
  // therefore we run grunt production manually instead
  grunt.registerTask('prod', function() {
    return;
  });

  // Nothing needs to happen in a dev environment :)
  grunt.registerTask('default', function() {
    return;
  });
};