const fs=require('fs')
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);

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
      res.setHeader('Content-Type','text/plain;charset=utf-8');
      res.end(files.join(','));
    }
  }catch (e) {
    console.error(e)
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.end(`${filePath}不存在 \n ${e.toString()}` );
  }
}
