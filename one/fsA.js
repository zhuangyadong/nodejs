'use strict';


var fs = require('fs');
fs.readFile('timg.jpg',function (err,data) {
	if(err){
		console.log(err);
	}else{
		console.log(data);
		console.log(data.length+'bytes');
	}
})
