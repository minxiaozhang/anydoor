const fs=require('fs')
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const Handlebars=require('handlebars');
const path=require('path');
const mime=require('./mime')//设置返回请求头
const compress=require('./compress') //压缩文件
const isFresh=require('./cache')
const  conf=require('../config/defaultConfig'); //使用require 的时候可以放心的时候相对路径
//读取页面模板，只执行一次
const tplPath=path.join(__dirname,'../template/dir.tpl')
const  source=fs.readFileSync(tplPath);
const template=Handlebars.compile(source.toString())
const range=require('./range')
module.exports = async function(req,res,filePath) {
  try {
    const stats= await stat(filePath)
    if(stats.isFile()){
      const contentType=mime(filePath)
      res.statusCode=200;
      res.setHeader('Content-Type',contentType+';charset=utf-8');
      if(isFresh(stats,req,res)){
        res.statusCode=304;
        res.end();
        return;
      }
     let rs;
      /**请求范围range*/
     const {code,start,end}=range(stats.size,req,res)
      if(code===200){
        res.statusCode=200;
        rs=fs.createReadStream(filePath)
      }else{
        res.statusCode=206;
        rs=fs.createReadStream(filePath,{start,end});
      }
     // let rs=fs.createReadStream(filePath);
      //压缩
      if(filePath.match(conf.compress)){
        rs= compress(rs,req,res);
      }
      rs.pipe(res);
     // fs.createReadStream(filePath).pipe(res); //建议用流的方式写
    }else if(stats.isDirectory()){
      const files= await readdir(filePath);
      res.statusCode=200;
      res.setHeader('Content-Type','text/html;charset=utf-8');
      const dir=path.relative(conf.root,filePath);//一个路径相对于另一个路径的相对路径
      const data={
        title:path.basename(filePath),
        dir:dir?`/${dir}`:'',
        files:files.map(file=>{

              return {file,
              icon:mime(file)}
        })
      }
      res.end(template(data));
    }
  }catch (e) {
    console.error(e)
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.end(`${filePath}不存在 \n ${e.toString()}` );
  }
}
