module.exports = function(config) {
    config.set({

        frameworks: ['mocha', 'sinon-chai'],

        files: [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-route.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-resource.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-mocks.js',
            'public/js/springbok.js',
            'public/js/**/*.js',
            'tests/frontend/**/*.js'
        ],

        preprocessors: {
            '**/public/js/tickets/*.js': 'coverage',
            '**/public/js/environments/*.js': 'coverage',
            '**/public/js/events/*.js': 'coverage',
            '**/public/js/users/*.js': 'coverage'
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'generated/frontend-coverage/'
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 5000,
        reportSlowerThan: 500,
        plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-sinon-chai', 'karma-coverage']
    });
};
