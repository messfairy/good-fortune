define('specs.MobileTest', function(){
    var mobile;
    beforeEach(function(){
        mobile = function (mobile){
            return Math.floor(mobile/100000000)+'****'+mobile%10000;
        };
    });
    describe('mobile', function(){
        it('mobile添加掩码', function(){
            expect(mobile(12345678343)).toEqual('123****8343');
        });
    });
});