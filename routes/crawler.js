var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    var search_url = "http://www.robot-china.com/buy/search.php?kw=";
    var keyword = "扫地机器人";

    //var index_url = "http://www.robot-china.com/buy/";
    request(search_url+encodeURIComponent(keyword), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            var all_data="";
            $('.xieceprolit').each(function(){
                all_data += $.html(this);
            })
            res.render('crawler', { title: '机器人网求购数据',keyword:keyword,all_data:all_data});
        }
    })
});


module.exports = router;