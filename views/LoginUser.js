define('views.LoginUser', ['backbone'], function (Backbone) {
    'use strict';
    var LoginUserView = Backbone.View.extend({
        el: 'section#J_LoginUser',
        events: {
            'tap a.J_DetailEdit': 'edit'
        },
        template: _.template(Backbone.$('#J_LoginUserTpl').html()),
        initialize: function (router, loginUserModel) {
            this.router = router;
            this.model = loginUserModel;
            this.model.on({
                sync: this.render,
                isAward: this.award
            }, this);
            this.model.fetch({reset: true});
        },
        edit: function(event){
            var name = event.target['name'];
            this.router.navigate('user/list/'+name+'/edit', true);
        },
        award: function (isAward) {
            var fortuneTpl = _.template(Backbone.$('#J_AwardTpl').html());
            var html = fortuneTpl({isAward: isAward});
            this.$el.prepend(html);
        },
        render: function () {
            var html = this.template(this.model.attributes);
            this.$el.append(html);
            return this;
        }
    });
    return LoginUserView;
});