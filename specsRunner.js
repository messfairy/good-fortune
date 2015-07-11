(function() {
    'use strict';

    require.config({
        baseUrl: '.',
        paths: {
            'jasmine': 'bower_components/jasmine/lib/jasmine-core/jasmine',
            'jasmine-html': 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
            'boot': 'bower_components/jasmine/lib/jasmine-core/boot',
            //依赖模块
            'zepto': 'bower_components/zepto/zepto',
            'callbacks': 'bower_components/zepto/callbacks',
            'deferred': 'bower_components/zepto/deferred',
            'touch': 'bower_components/zepto/touch',
            'underscore': 'bower_components/underscore/underscore',
            'backbone': 'bower_components/backbone/backbone',
            //测试模块
            'models.UserList': 'models/UserList',
            'specs.MobileTest': 'specs/MobileTest',
            'specs.UserList': 'specs/UserList'
        },
        shim: {
            'jasmine': {
                exports: 'window.jasmineRequire'
            },
            'jasmine-html': {
                deps: ['jasmine'],
                exports: 'window.jasmineRequire'
            },
            'boot': {
                deps: ['jasmine', 'jasmine-html'],
                exports: 'window.jasmineRequire'
            }
        }
    });

    var specs = [
        'specs.MobileTest',
        'specs.UserList'
    ];

    require(['boot'], function () {
        require(specs, function () {
            window.onload();
        });
    });
})();