var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('chat', { title: '小柚子机器人'});
});

router.get('/send', function(req, res0, next) {
    var reqData={
        key:'c5a00787ba864e8a877356285028d883',
        info:req.query.question
    };

    reqData = require('querystring').stringify(reqData);
    var post_options = {
        host: 'www.tuling123.com',
        port:80,
        path: '/openapi/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Length": reqData.length
        }
    };
    var req = http.request(post_options, function(res) {
        var body = '';
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            res0.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});
            console.log(body);
            res0.write(JSON.parse(body)["text"]);
            res0.end();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    req.write(reqData+"\n");
    req.end();


});

module.exports = router;