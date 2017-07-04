var express = require('express');
var router = express.Router();
var fs = require("fs");
var markdown = require("markdown").markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
    var result = fs.readFileSync("../README.md").toString();
    res.render('index', { title: 'Node Demo with Express' ,md:markdown.toHTML(result)});
});

module.exports = router;
