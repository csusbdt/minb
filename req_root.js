var url    = require('url');
var fs     = require('fs');
var cookie = require('./app_cookie');

var template,
    noCredsHtml;

exports.init = function(cb) {
  fs.readFile('templates/root.html', 'utf8', function(err, file) {
    if (err) throw err;
    template = file;
    noCredsHtml = new Buffer(template.replace('MODEL', '{}'), 'utf8');
    cb();
  });
};

function error(req, res, err) {
  console.log(err.message);
  res.statusCode = 500;
  res.end(err.message);
}

exports.handle = function(req, res) {
  var body, 
      model = {},
      creds = cookie.creds(req);
  if (creds) {
    model.creds = creds;
    // TODO: get more of model to send to client
    body = new Buffer(template.replace("MODEL", JSON.stringify(model)), 'utf8');
  } else {
    body = noCredsHtml;
  }
  res.writeHead(200, {
    'Content-Type'   : 'text/html',
    'Content-Length' : body.length,
    'Pragma'         : 'no-cache',
    'Cache-Control'  : 'no-cache, no-store'
  });
  res.end(body);
};

