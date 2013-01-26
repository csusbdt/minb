var url      = require('url');
var fs       = require('fs');
var app_http = require('./app_http');

var body,
    etag;

exports.init = function(cb) {
  fs.readFile('templates/screen_container.html', 'utf8', function(err, file) {
    if (err) throw err;
    var html = file.replace("FB_APP_ID", process.env.FB_APP_ID);
    body = new Buffer(html, 'utf8');
    etag = app_http.etag(body);
    cb();
  });
};

exports.handle = function(req, res) {
  app_http.replyCached(res, body, 'text/html', etag);
};

