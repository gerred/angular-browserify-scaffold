module.exports = function(config) {
    config.set({
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine', 'browserify'],

        files: ['unit/**/*_spec.js'],
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        runnerPort: 9100,

        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: false,

        // Browserify config
        browserify: {
            watch: true
        },

        // Add browserify to preprocessors
        preprocessors: {'unit/**/*.js': ['browserify']}
    });
};