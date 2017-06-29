/**
 * Created by Admin on 2017/6/28.
 */

var express = require('express');
var router = express.Router();

router.get('/User',function (req,res,next) {
    res.send('admin - User');
});

module.exports = router;
