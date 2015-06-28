module.exports = function(config) {
    config.set({

        frameworks: ['mocha', 'sinon-chai'],

        files: [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js">',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-mocks.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.min.js',
            'public/components/d3-3.5.5.min.js',
            'public/components/pie-chart-1.0.0.min.js',
            'public/js/springbok.js',
            'public/js/**/*.js',
            'public/views/partials/*.html',
            'tests/frontend/**/*.js'
        ],

        preprocessors: {
            '**/public/js/tickets/*.js': 'coverage',
            '**/public/js/environments/*.js': 'coverage',
            '**/public/js/events/*.js': 'coverage',
            '**/public/js/users/*.js': 'coverage',
            '**/public/views/partials/*.html': 'ng-html2js'
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'generated/frontend-coverage/'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '.*public',
            prependPrefix: '../..',
            moduleName: 'templates'
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 5000,
        reportSlowerThan: 500,
        plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-sinon-chai', 'karma-coverage', 'karma-ng-html2js-preprocessor']
    });
};
