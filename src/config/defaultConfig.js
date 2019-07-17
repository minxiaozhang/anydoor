module.exports={
  root:process.cwd(),  //得到的是当前项目运行文件目录
  hostname:'127.0.0.1',
  port:"12345",
  compress: /\.(html|js|css|md)/, //需要压缩的文件
  cache:{
    maxAge:600,
    expires:true,
    cacheControl:true,
    lastModified:true,
    etag:true,
  }
}
