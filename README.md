###使用须知
    ```访问js模块压缩版index.min.html, 访问源码版index.html，请自行准备web代理服务器，推荐nginx
        自行压缩请定位到根目录下，运行 node r.js -o build.js，有需要修改请编辑build.js
    ```为方便手机局域网内通过ip访问该项目, 可以通过配置nginx代理, 达到静态资源和动态请求分离的目的
    (实际生产环境中，直接在html和js中分别访问static.fortune.com server.fortune.com即可)
    代理配置如下：
    http{
        gzip  on;
        server {
            listen       80;
            server_name  192.168.1.103;
            location / {
                proxy_pass   http://server.fortune.com:8282;
            }
            location ~* .(ico|gif|bmp|jpg|jpeg|png|swf|js|css|mp3) {
                proxy_pass   http://static.fortune.com:8282;
            }
        }
        server {
            listen 8282;
            server_name static.fortune.com;
            location / {
                root  C:/Users/CaoLijuan/WebstormProjects/good-fortune;
                expires 30d;
            }
        }
        server {
            listen 8282;
            server_name server.fortune.com;
            location / {
                root  C:/Users/CaoLijuan/WebstormProjects/good-fortune;
                index  index.html index.htm;
            }
        }
    }

###业务需求分析
    ````静态资源
    如banner图片，js，css，用户图片，中奖图片，需要使用静态服务器nginx

    ````动态请求
    登录信息和中奖信息请求多
    活动用户信息userinfolist查询多，消耗多，压力大
    只依赖活动信息提交，而提交相对少
    userinfolist数据只有20条可缓存后台
    update info提交后，数据库保存info并查询userinfo，更新hashmap
    取userinfolist列表信息只要读该hashmap缓存即可

###保证高可用高性能高并发

    目标：减少请求，减少请求时间，减少带宽

    前端采用单页面，一方面增强用户体验，一方面减少请求数量，
    静态资源启用html5离线缓存，用户登录信息的ajax可缓存
    图片、js和css压缩，nginx传输gzip压缩开启

    动静服务器主机分离 static.server 采用nginx
    后台和中间层支持
    后台集群负载均衡

    jpg图片格式改为png格式
    dynamic.server 选用高并发服务器
    由于业务简单，请求虽密集但cpu运算不密集，所以单线程不会阻塞。因此后台可采用node，单线程资源消耗少，node事件机制阻塞小，再采用node cluster通过多进程充分利用CPU。可惜木有异步io，不然node完美
    详细信息ajax可缓存

    ````后台程序缓存
    最近活动用户userinfolist，在后台程序里维护一个20大小的集合全局变量，写入加锁，读取自由
    当用户参加活动，提交修改信息post请求，后台访问数据库，
    修改活动信息并获取当前用户信息，成功后修改程序中的20集合，修改集合时加状态锁
    ajax请求userinfolist时，由于确定是20条记录，故不分页，请求到后台直接读取全局集合返回。

###提高维护性
    面向对象抽象，封装数据结构
    js模块化，依赖管理，减少全局变量污染
    backbone mv*数据层和视图层分离，保证高內聚，低耦合，减少重复代码。尽可能减少API。
    渲染采用模版和json数据分离，隔离变化
    model与视图、视图与视图之间通信，采用事件订阅模式，隔离变化
    利用underscore函数式API简化model层数据处理逻辑，降低重复代码
    
###类结构
    用户信息视图loginuserview
    绑定loginusermodel
    用户列表视图userlistview
    绑定usercollection的加载等事件
    用户详细信息视图detailuserview
    绑定detailusermodel
    用户活动信息修改视图detaileditview
    绑定detailusermodel
    Backbone router模拟url的变化
    请求登录信息，返回后请求中奖状态，一次渲染

###中间4位*代替
    Math.floor(mobile/100000000)+'****'+mobile%10000;



加载和渲染工程树
正则区分page list tpl后缀
刷新工程树
打开页面

拉取工程树

http://syawlaus.com/sicp-chapter-1-solutions/

前端架构设计

删除文件时
filesystem delete
git repository delete
dispatch delete action
file tree reducer
observe and file tree delete
observe and file store delete
redux delete
views delete

fetch file
PAGE ActivE action
actived状态保存下来
每次都有新的

每次文件系统操作都由file system发布action
所有tree store和file store更新状态
各个数据层监听file system的状态更新

active状态存到file system
关闭状态存到file store
删除状态存到file system
新增状态存到file system
删除成功后发起关闭
关闭成功后发起active
page active
状态存于 file sys panel state nav item state
menu item state等
observe file system page状态
更新tree store file store views

关闭时更新了打开id序列状态，nav view需要ob file store该序列是否为空

现在编辑区只有一个了
要有一个基类editor board

基础模块前端架构设计基本考虑清楚了
保证流程清晰、接口简洁、粒度合理
理想版本
现实版本
在考虑如何与业务模块衔接
数据层对整体引起的改动还是很大的，尽量保证接口不变但不能保证结构不变







