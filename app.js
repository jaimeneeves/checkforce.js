const express = require('express');
const serveStatic = require('serve-static');
const app = express();


const client = '/';
const port = process.env.PORT || 8081;
app.use(serveStatic(__dirname + client));

app.listen(port,function(){
  console.log("http://localhost:" + port);
});
