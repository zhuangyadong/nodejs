/**
 * Created by Admin on 2017/6/27.
 * 应用程序的启动（入口）文件
 */

//加载express模块

var express = require('express');


//加载模板
var swig = require('swig');

//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载数据库模块
var mongoose = require('mongoose');

//创建app应用
var app = express();

//设置静态文件托管
app.use('/public',express.static(__dirname + '/public'));
app.engine('html',swig.renderFile);

app.set('views','./views');

app.set('view engine','html');
//监听http请求
//取消缓存
swig.setDefaults({cache:false});
// app.get('/',function (req,res,next) {
//     // res.send('<h1 style="color: #583;">欢迎访问我的博客<h1>');
//
//
//     //读取views目录下的指定文件，解析并返回给客户端
//     res.render('index');
// })

//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));
//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//监听http请求
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/miaov',function (err) {
    if(err){
        console.log('数据库连接失败');
    }else {
        console.log('数据库连接成功');
        app.listen(8081);

    }
});


/*
用户发送http请求 -》 url -》 解析路由 -》 找到匹配规则 -》 执行指定的绑定函数，返回对应内容至用户
/public -》 静态 -》直接读取指定目录下的文件，返回给用户

-》 动态 -》 处理业务逻辑，加载模板，解析模板 -》 返回数据给用户
*/