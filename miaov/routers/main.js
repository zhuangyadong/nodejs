/**
 * Created by Admin on 2017/6/28.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    res.render('main/index');
});

module.exports = router;
