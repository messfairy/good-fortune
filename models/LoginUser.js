define('models.LoginUser', ['backbone'], function(Backbone){
    'use strict';
    var LoginUser = Backbone.Model.extend({
        initialize: function(){
            this.urls = {'user' : 'cgi/getLoginUser.txt',
                'award' : 'cgi/queryAward.txt'};
            this.on('sync', this.readAward);
        },
        url: function(){
            return this.urls['user'];
        },
        readAward: function(){
            var self = this;
            this.sync('read', this, {
                url: this.urls['award']
            }).done(function(response){
                if(response.code === 0) {
                    self.isAward(response.isGetAward);
                }
            });
        },
        isAward: function(isAward){
            var salary = this.get('salary');
            this.trigger('isAward', isAward&&salary>8000)
        },
        parse: function (response) {
            if(response.code === 0){
                return response;
            }else{
                return null;
            }
        }
    });
    return LoginUser;
});