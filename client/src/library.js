var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var dec = require('./decorators')
var com = require('../../views/com')

var userId = window.location.pathname.slice('/library/'.length)
var subheading = document.querySelector('.subheading')
var docsDiv = document.getElementById('docsdiv')
dec.login(document.getElementById('sessiondiv'))

if (!sbot.hasAccess)
  noAccess()
sbot.on('error', noAccess)

sbot.on('ready', function () {
  var name = com.name(userId, sbot)
  subheading.textContent = name+'\'s library'
  document.title = 'pubto.us - ' + name+'\'s library'

  docsDiv.innerHTML = ''
  pull(sbot.ssb.messagesByType({ type: 'library-add', limit: 30, live: true }), pull.drain(function (doc) {
    if (doc.value.author === userId)
      docsDiv.insertBefore(com.docSummary(doc, sbot), docsDiv.firstChild)
  }))
})

function noAccess () {
  docsDiv.innerHTML = '<em>Login to see your network\'s library</em>'
}
