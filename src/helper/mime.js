//MIME  根据文件后缀匹配相应的contentType
const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
};

module.exports = (filePath) => {
  let ext = path.extname(filePath) //获取文件扩展名
    .split('.')
    .pop() //获取最后一个.后的东西
    .toLowerCase();

  if (!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes['txt'];
};
