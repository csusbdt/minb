var url    = require('url');
var fs     = require('fs');
var cookie = require('./app_cookie');

var template;

exports.init = function(cb) {
  fs.readFile('templates/root.html', 'utf8', function(err, file) {
    if (err) throw err;
    template = file;
    cb();
  });
};

TODO: move this into error.js

// Use the following error function to report errors that
// may be generated in the request handler function.
function error(req, res, err) {
  console.log(err.message);
  res.statusCode = 500;
  res.end(err.message);
}

TODO: rebuild following

exports.handle = function(req, res) {
  var body, 
      creds = cookie.creds(req),
      model = { date: new Date() };
  if (creds) {
    model.creds = creds;
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

