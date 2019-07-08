//console.log(123)
const http=require('http');
const chalk=require('chalk');
const path=require('path');
const  conf=require('./config/defaultConfig');
const route = require('./helper/route');


const  server=http.createServer((req,res)=>{
      const filePath=path.join(conf.root,req.url);
      route(req, res, filePath, filePath);

});

server.listen(conf.port,conf.hostname,()=>{
  const addr=`http://${conf.hostname}:${conf.port}`;
  console.info(`server start at ${chalk.green(addr)}`)
})

