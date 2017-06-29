/**
 * Created by Admin on 2017/6/28.
 */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);