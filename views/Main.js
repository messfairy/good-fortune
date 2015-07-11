define('views.Main', function(require){
    'use strict';
    var Backbone = require('backbone');
    var LoginUserModel = require('models.LoginUser');
    var LoginUser = require('views.LoginUser');
    var UserList = require('views.UserList');
    var Main = Backbone.View.extend({
        el: 'main#J_Main',
        events: {
            'touchmove': 'touchmove'
        },
        initialize: function(router){
            this.model = new LoginUserModel;
            this.router = router;
            new LoginUser(this.router, this.model);
            this.userListView = new UserList(this.router, this.model);
            this.lastY = 0;
        },
        touchmove: function(event){
            var currentY = event.touches[0].clientY;
            var scrollTop = $('body').scrollTop();
            if(currentY > this.lastY){
                // moved down
                if (scrollTop === 0) {
                    this.userListView.firstPage();
                }
            }else if(currentY < this.lastY){
                // moved up
                var windowHeight = $(window).height();
                var bodyHeight = $('body').height();
                if (scrollTop + windowHeight >= bodyHeight) {
                    this.userListView.secondPage();
                }
            }
            this.lastY = currentY;
            //return false;

        },
        render: function(){
            return this;
        }
    });
    return Main;
});