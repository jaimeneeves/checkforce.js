var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var client = process.env.NODE_APP_DIRECTORY === 'production' ? '/client/dist' : '/app';
console.log('environment: ', process.env.NODE_APP_DIRECTORY);
app.use(serveStatic(__dirname + client));
app.listen(process.env.PORT || 8081,function(){
    console.log('localhost:8081');
});
