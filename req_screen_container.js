var url    = require('url');
var fs     = require('fs');

var html;

exports.init = function(cb) {
  fs.readFile('templates/screen_container.html', 'utf8', function(err, file) {
    if (err) throw err;
    html = file.replace("FB_APP_ID", process.env.FB_APP_ID);
    cb();
  });
};



TODO: in the following, just return the html and set to cache 1 year


exports.handle = function(req, res) {
  var body;
  if (creds) {
    body = new Buffer(titleScreen.replace("MODEL", JSON.stringify(model)), 'utf8');
  } else {
    body = new Buffer(loginScreen.replace("MODEL", JSON.stringify(model)), 'utf8');
  }
  res.writeHead(200, {
    'Content-Type'   : 'text/html',
    'Content-Length' : body.length,
    'Pragma'         : 'no-cache',
    'Cache-Control'  : 'no-cache, no-store'
  });
  res.end(body);
};

