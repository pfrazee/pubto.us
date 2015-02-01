var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var dec = require('./decorators')
var com = require('../../views/com')

var docsDiv = document.getElementById('docsdiv')
dec.login(document.getElementById('loginbtn'), document.getElementById('logoutbtn'))

sbot.on('ready', function() {
  // :TODO: this should include a challenge for the server to sign, proving ownership of the keypair
  sbot.ssb.whoami(function(err, id) {
    console.log('whoami', err, id)
  })

  docsDiv.innerHTML = ''
  pull(sbot.ssb.messagesByType({ type: 'doc', limit: 30, reverse: true, live: true }), pull.drain(function (post) {
    docsDiv.insertBefore(com.docSummary(post), docsDiv.firstChild)
  }))
})