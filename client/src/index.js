var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var doclib = require('./lib/doc')
var dec = require('./decorators')
var com = require('../../views/com')

var docsDiv = document.getElementById('docsdiv')
dec.login(document.getElementById('sessiondiv'))

if (!sbot.hasAccess)
  noAccess()
sbot.on('error', noAccess)

sbot.on('ready', function () {
  docsDiv.innerHTML = ''
  pull(sbot.ssb.messagesByType({ type: 'library-add', limit: 30, live: true }), pull.drain(function (doc) {
    doclib.pullUpdates(sbot, doc, function () {
      if (!doc.unlisted)
        docsDiv.insertBefore(com.docSummary(doc, sbot), docsDiv.firstChild)
    })
  }))
})

function noAccess () {
  docsDiv.innerHTML = '<em>Login to see your network\'s library</em>'
}