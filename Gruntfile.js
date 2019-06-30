module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({
      less: {
          development: {
              options: {
                  compress: true,
                  yuicompress: true,
                  optimization: 2
              },
              files: {
                  "build/css/main.min.css": ["components/**/*.less", "containers/**/*.less"]
              }
          }
      },
      watch: {
          styles: {
              files: ["components/**/*.less", "containers/**/*.less"],
              tasks: ["less", "inline"],
              options: {
                  nospawn: true
              }
          },
      }
  });
  grunt.registerTask("default", ["less", "watch"]);
};
