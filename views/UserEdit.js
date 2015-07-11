define('views.UserEdit', ['backbone', 'models.DetailUser'], function (Backbone, DetailUser) {
    'use strict';
    var UserEditView = Backbone.View.extend({
        el: 'section#J_UserEdit',
        events: {
            'tap button#J_EditClose': 'close',
            'tap button#J_PostEdit': 'postEdit'
        },
        template: _.template(Backbone.$('#J_UserEditTpl').html()),
        initialize: function (router) {
            this.router = router;
            this.model = new DetailUser;
            this.model.on({
                sync: this.render,
                edit: this.editPost
            }, this);
        },
        details: function(name){
            this.model.setName(name);
            this.model.fetch({reset: true});
        },
        postEdit: function(){
            this.model.postEdit();
        },
        editPost: function (success) {
            if(success){
                this.$el.hide();
                this.router.navigate('main');
            }else{
                alert('用户信息后台修改失败');
            }
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
    return UserEditView;
});