define('views.UserList', ['backbone', 'models.UserList', 'views.DetailUser', 'views.UserEdit'], function(Backbone, UserList, DetailUser, UserEdit){
    'use strict';
    var UserListView = Backbone.View.extend({
        template: _.template(Backbone.$('#J_UserListTpl').html()),
        el: 'section#J_UserList',
        events: {
            'tap li.J_Details,a.J_Details': 'details',
            'tap a.J_DetailEdit': 'edit',
            'swipeRight': 'firstPage',
            'swipeLeft': 'secondPage',
            'tap p>a.J_FirstPage' : 'firstPage',
            'tap p>a.J_SecondPage' : 'secondPage'
        },
        initialize: function(router, loginUserModel){
            this.models = new UserList;
            this.models.on({
                'sync': this.firstPage
            }, this);
            var self = this;
            this.listenTo(loginUserModel, 'sync', function(){
                self.loginName = loginUserModel.get('username');
                self.models.fetch({reset: true});
            });
            this.router = router;
        },
        firstPage: function(){
            var models = this.models.firstPage();
            this.render(models, 0, 1);
            return false;
        },
        secondPage: function(){
            var models = this.models.secondPage();
            models.page = 2;
            this.render(models, 10, 2);
            this.router.navigate('user/list', false);
            return false;
        },
        details: function(event){
            var name = $(event.currentTarget).attr('name');
            this.router.navigate('user/list/'+name, true);
            event.preventDefault();
        },
        edit: function(event){
            var name = $(event.currentTarget).attr('name');
            this.router.navigate('user/list/'+name+'/edit', true);
            event.preventDefault();
        },
        render: function(models, count, page){
            var result = this.models.counts(models);
            var html = this.template({page: page, grant: result.grant, less: result.less,
                models: models, loginName: this.loginName, count: count});
            this.$el.html(html);
            return this;
        }
    });
    return UserListView;
});