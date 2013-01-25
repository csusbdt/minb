var url    = require('url');
var fs     = require('fs');
var crypto = require('crypto');

exports.etag = function(buffer) {
  var shasum = crypto.createHash('sha1');
  shasum.update(data, 'binary');
  return shasum.digest('hex');
}

exports.replyNoCache = function(res, buffer) {
  res.writeHead(200, {
    'Content-Type'   : 'text/html',
    'Content-Length' : buffer.length,
    'Pragma'         : 'no-cache',
    'Cache-Control'  : 'no-cache, no-store'
  });
  res.end(buffer);
};

exports.replyCache = function(res, buffer, contentType, etag) {
  res.writeHead(200, {
    'Content-Type'   : contentType,
    'Content-Length' : buffer.length,
    'Pragma'         : 'public',
    'Cache-Control'  : 'max-age=31536000',
    'Vary'           : 'Accept-Encoding',
    'Expires'        : new Date(Date.now() + 31536000000).toUTCString(),
    'ETag'           : etag
  });
  res.end(file.data);
};

