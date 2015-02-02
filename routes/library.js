var multicb = require('multicb')
var s = require('../lib/static')
var libraryView = require('../views/pages/library')

module.exports = function (req, res, next) {

  // User library
  if (s.pathStarts(req, '/library/')) {
    s.type(res, 'text/html')
    res.writeHead(200)
    return res.end(libraryView().outerHTML)
  }

  next()
}