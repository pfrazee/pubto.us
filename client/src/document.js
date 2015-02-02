var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var dec = require('./decorators')
var com = require('../../views/com')

var docDiv = document.getElementById('doc')
var key = window.location.pathname.slice(5)

// setup ui
dec.login(document.getElementById('loginbtn'), document.getElementById('logoutbtn'))

// sbot interactions
sbot.on('ready', function() {
  sbot.ssb.get(key, function (err, value) {
    var blob = ''
    var msg = { key: key, value: value }
    function concat (chunk) { blob += atob(chunk) }
    pull(sbot.ssb.blobs.get(msg.value.content.ext), pull.drain(concat, function (err) {
      docDiv.appendChild(com.doc(msg, blob))
    }))
  })
})