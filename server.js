/**
 * Created by s.zhitenev on 05.08.2015.
 */

'use strict';

var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(port, function () {
    console.log('server started at', port);
});