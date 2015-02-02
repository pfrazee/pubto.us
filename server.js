var http = require('http')
var stack = require('stack')
var PORT = process.env.port || 8050

http.createServer(stack(
  function (req, res, next) {
    // CSPs
    res.setHeader('Content-Security-Policy', 'default-src \'self\' data:; connect-src \'self\' ws://localhost:2000 http://localhost:2000')
    next()
  },
  require('./routes/index'),
  require('./routes/new'),
  require('./routes/document'),
  require('./routes/static')
)).listen(PORT)
console.log('listening on', PORT)