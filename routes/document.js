var multicb = require('multicb')
var s = require('../lib/static')
var docView = require('../views/pages/doc')

module.exports = function (req, res, next) {

  // Doc page
  if (s.pathStarts(req, '/doc/')) {
    s.type(res, 'text/html')
    res.writeHead(200)
    res.end(docView().outerHTML)
  }

  next()
}