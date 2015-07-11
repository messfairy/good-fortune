define('specs.UserList', ['models.UserList'], function(UserList){
    describe('UserList', function(){
        var userList;
        beforeEach(function(){
            userList = new UserList;
        });
        it('UserList第一页和第二页的大小', function(done){
            userList.on('sync', function(){
                var firstPageSize = userList.firstPage().length;
                var secondPageSize = userList.secondPage().length;
                expect(firstPageSize).toBe(userList.pageSize);
                expect(secondPageSize).toBe(userList.pageSize);
                done();
            });
            userList.fetch();
        });
        it('UserList 计数薪水比例', function(done){
            userList.on('sync', function(){
                var counts = userList.counts(userList.models);
                expect(1).toBe(counts['less'] + counts['grant']);
                done();
            });
            userList.fetch();
        });
    });
});