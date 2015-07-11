define('views.DetailUser', ['backbone', 'models.DetailUser'], function (Backbone, DetailUser) {
    'use strict';
    var DetailUserView = Backbone.View.extend({
        el: 'section#J_DetailUser',
        events: {
            'tap button#J_DetailClose': 'close',
            'touchmove': 'noMove'
        },
        template: _.template(Backbone.$('#J_DetailUserTpl').html()),
        url: function(){
            return 'getUserDetailInfo.txt?name=' + this.name;
        },
        initialize: function (router) {
            this.router = router;
            this.model = new DetailUser;
            this.model.on({
                sync: this.render
            }, this);
        },
        noMove: function(event){
            //event.preventDefault();
        },
        details: function(name){
            this.model.setName(name);
            this.model.fetch({reset: false});
        },
        close: function(){
            this.$el.hide();
            this.router.navigate('main');
        },
        render: function () {
            var html = this.template(this.model.attributes);
            var scrollTop = $('body').scrollTop();
            this.$el.html(html).css({top: scrollTop}).show();
            return this;
        }
    });
    return DetailUserView;
});