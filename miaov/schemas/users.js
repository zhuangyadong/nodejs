/**
 * Created by Admin on 2017/6/28.
 */
var mongoose = require('mongoose');

//用户的表结构

module.exports = new mongoose.Schema({
    //用户名
    uesrname:String,
    //密码
    password:String
})