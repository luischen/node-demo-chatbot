var express = require('express');
var router = express.Router();
var fs = require("fs");

var multer  = require('multer');
var upload = multer({dest:'/resource/'});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('fileupload', { title: 'File Reader Sample'});
});

router.post('/upload', upload.single('fileImage'),function(req, res, next) {
    if(req.file){
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(req.file.path)
        });
        var result = "";
        lineReader.on('line', function (line) {
            result += line + "<br>";
        });
        lineReader.on('close', function () {
            res.render('file', { title: 'File read successfully', fd: result,fn:req.file.originalname});
        });
    }else{
        res.render('fileupload', { title: 'File Reader Sample', message:"请选择上传的文件"});
    }



});

module.exports = router;