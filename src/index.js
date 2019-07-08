//console.log(123)
const http=require('http')
const  conf=require('./config/defaultConfig')
const chalk=require('chalk')
const path=require('path')
const fs=require('fs')

const  server=http.createServer((req,res)=>{
      const url=req.url;
      const filePath=path.join(conf.root,req.url);
      fs.stat(filePath,(err,stats)=>{
        if(err){
          res.statusCode=404;
          res.setHeader('Content-Type','text/plain;charset=utf-8');
          res.end(`${filePath}不存在` );
          return
        }
        if(stats.isFile()){
          res.statusCode=200;
          res.setHeader('Content-Type','text/plain;charset=utf-8');
          /*fs.readFile(filePath,(err,data)=>{ //不建议这么写，很慢
            res.end(data)
          })*/
          fs.createReadStream(filePath).pipe(res); //建议用流的方式写
        }else if(stats.isDirectory()){
          fs.readdir(filePath,(err,files)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            files.map(v=>{
             console.info(v)
            })
            res.end(files.join(','))
          })
        }
      })
});
server.listen(conf.port,conf.hostname,()=>{
  const addr=`http://${conf.hostname}:${conf.port}`;
  console.info(`server start at ${chalk.green(addr)}`)
})

