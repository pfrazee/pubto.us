var multicb = require('multicb')
var s = require('../lib/static')
var newView = require('../views/pages/new')

module.exports = function (req, res, next) {

  // Doc page
  if (req.url == '/new') {
    s.type(res, 'text/html')
    res.writeHead(200)
    return res.end(newView().outerHTML)
  }

  next()
}