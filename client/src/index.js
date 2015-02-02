var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var dec = require('./decorators')
var com = require('../../views/com')

var docsDiv = document.getElementById('docsdiv')
dec.login(document.getElementById('loginbtn'), document.getElementById('logoutbtn'))

if (!sbot.hasAccess)
  noAccess()
sbot.on('error', noAccess)

sbot.on('ready', function () {
  // :TODO: this should include a challenge for the server to sign, proving ownership of the keypair
  sbot.ssb.whoami(function(err, id) {
    console.log('whoami', err, id)
  })

  docsDiv.innerHTML = ''
  pull(sbot.ssb.messagesByType({ type: 'library-add', limit: 30, live: true }), pull.drain(function (doc) {
    docsDiv.insertBefore(com.docSummary(doc), docsDiv.firstChild)
  }))
})


function noAccess () {
  docsDiv.innerHTML = '<em>Login to see your network\'s library</em>'
}