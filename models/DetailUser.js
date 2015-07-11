define('models.DetailUser', ['backbone'], function(Backbone){
    'use strict';
    var DetailUser = Backbone.Model.extend({
        url: function(){
            return 'cgi/getUserDetailInfo.txt?name=' + this.name;
        },
        setName: function(name){
          this.name = name;
        },
        postEdit: function(){
            var self = this;
            this.sync('read', this, {
                url: 'cgi/updateUserInfo.txt'
            }).done(function(response){
                self.trigger('edit', response.code === 0);
            });
        },
        mobile: function(mobile){
            try{
                var num = parseInt(mobile);
            }catch (error){
                console.error('转化数值失败：' + mobile + '\n' + error.stack);
            }
            var divider = 10000;
            return Math.floor(num/divider/divider) + '****' + num%divider;
        },
        parse: function (response) {
            if(response.code === 0){
                response.mobile = this.mobile(response.mobile);
                return response;
            }else{
                return null;
            }
        }
    });
    return DetailUser;
});