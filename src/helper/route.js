const fs=require('fs')
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const Handlebars=require('handlebars');
const path=require('path');
const  conf=require('../config/defaultConfig'); //使用require 的时候可以放心的时候相对路径
//读取页面模板，只执行一次
const tplPath=path.join(__dirname,'../template/dir.tpl')
const  source=fs.readFileSync(tplPath);
const template=Handlebars.compile(source.toString())

module.exports = async function(req,res,filePath) {
  try {
    const stats= await stat(filePath)
    if(stats.isFile()){
      res.statusCode=200;
      res.setHeader('Content-Type','text/plain;charset=utf-8');
      fs.createReadStream(filePath).pipe(res); //建议用流的方式写
    }else if(stats.isDirectory()){
      const files= await readdir(filePath);
      res.statusCode=200;
      res.setHeader('Content-Type','text/html;charset=utf-8');
      const dir=path.relative(conf.root,filePath);//一个路径相对于另一个路径的相对路径
      const data={
        title:path.basename(filePath),
        dir:dir?`/${dir}`:'',
        files,
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
