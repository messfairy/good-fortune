define('router', function (require) {
    'use strict';
    require('deferred');
    require('touch');
    var Backbone = require('backbone');

    var Router = Backbone.Router.extend({
        routes: {
            'main': 'main',
            'user/list': 'userList',
            'user/list/:name': 'userDetail',
            'user/list/:name/edit': 'userEdit'
        },
        initialize: function () {
            var UserEdit = require('views.UserEdit');
            var DetailUser = require('views.DetailUser');
            this.userEditView = new UserEdit(this);
            this.detailUserView = new DetailUser(this);
            //Backbone.history.start({pushState: true});
            Backbone.history.start();
            return this;
        },
        main: function(){
            var Main = require('views.Main');
            new Main(this);
        },
        userList: function(){
            alert('userList');
        },
        userDetail: function(name){
            this.detailUserView.details(name);
        },
        userEdit: function(name){
            this.userEditView.details(name);
        }
    });
    return new Router;
});