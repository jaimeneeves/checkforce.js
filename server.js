var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var client = process.env.NODE_APP_DIRECTORY === 'production' ? '/client/dist' : '/';

console.log('Directory: ', client);
console.log('Environment: ', process.env.NODE_APP_DIRECTORY);
var port = process.env.PORT || 8001;

app.use(serveStatic(__dirname + client));
app.listen(port,function(){
    console.log('localhost:8001');
});
