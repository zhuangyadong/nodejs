/**
 * Created by Admin on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');



//统一返回格式
var responseData;

router.use(function (req,res,next) {
    responseData = {
        code:0,
        message:''
    }

    next();
})
/*
用户注册：
    注册逻辑

    1.用户名是否为空
    2.密码不能为空
    3.两次密码输入必须一致

    1.用户名是否已经被注册
            数据库查询
* */
router.post('/user/register',function (req,res,next) {

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    //用户名是否为空
    if (username == '' ){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    };
    //密码是否为空
    if (password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    };
    //两次密码输入不一致
    if(password != repassword){
        responseData.code = 3;
        responseData.message = '两次密码输入不一致';
        res.json(responseData);
        return;
    }

    //用户名是否已经被注册，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户已经被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if(userInfo){
            //表示数据库中有该记录
            responseData.code= 4;
            responseData.message = '该用户名已被注册';
            res.json(responseData);
            return;
        }
        //保存用户注册信息到数据库中
        var user = new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });

});
//登陆
router.post('/user/login',function (req,res) {
   var username = req.body.username;
   var password = req.body.password;
   if(username == '' || password == ''){
       responseData.code = 1;
       responseData.message = '用户名或密码不能为空';
       res.json(responseData);
       return;
   }
   //查询数据库中相同用户名是否存在
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if (!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        //用户名和密码是正确的
        responseData.message = '登陆成功';
        responseData.userInfo = {
            _id:userInfo._id,
            username:userInfo.username
        }
        res.json(responseData);
        return;
    })
})

module.exports = router;
