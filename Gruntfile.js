module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
        options: {
            mangle: false
        },
        QueueApp: {
            files: {
                'public/QueueApp.min.js': [
                    'public/bower_components/angularjs/angular.js',
                    'public/QueueApp.js',
                    'public/add-customer/AddCustomer.js',
                    'public/customer/Customer.js'
                ]
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);

};
