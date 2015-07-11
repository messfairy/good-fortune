define('models.UserList', ['backbone'], function (Backbone) {
    'use strict';
    var UserList = Backbone.Collection.extend({
        url: 'cgi/getUserlist.txt',
        pageSize: 10,
        awardSalary: 8000,
        parse: function (response) {
            if (response.code === 0)
                return response.list;
        },
        secondPage: function () {
            var pageSize = this.pageSize;
            return this.filter(function (model, index) {
                return index >= pageSize && index < pageSize * 2;
            });
        },
        firstPage: function () {
            var pageSize = this.pageSize;
            return this.filter(function (model, index) {
                return index < pageSize;
            });
        },
        counts: function (models) {
            var size = models.length, self = this;
            var result = _.countBy(models, function (model) {
                if (model.get('salary') > self.awardSalary) {
                    return 'grant';
                } else {
                    return 'less';
                }
            });
            return {'grant': result['grant'] / size, 'less': result['less'] / size}
        }
    });
    return UserList;
});