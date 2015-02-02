var pull = require('pull-stream')
var sbot = require('./lib/scuttlebot')
var dec = require('./decorators')
var com = require('../../views/com')

var docDiv = document.getElementById('doc')
var key = window.location.pathname.slice(5)

// setup ui
dec.login(document.getElementById('sessiondiv'))

// sbot interactions
sbot.on('ready', function() {
  sbot.ssb.get(key, function (err, value) {
    var msg = { key: key, value: value }

    var blob = ''
    function concat (chunk) { blob += atob(chunk) }
    pull(sbot.ssb.blobs.get(msg.value.content.ext), pull.drain(concat, function (err) {

      var docEl = com.doc(msg, blob, sbot)
      docDiv.appendChild(docEl)

      var commentsDiv = docDiv.querySelector('.comments')
      dec.commentForm(document.querySelector('.comment-form'), commentsDiv, msg.key)
      pull(sbot.ssb.messagesLinkedToMessage({ id: msg.key, rel: 'replies-to', keys: true }), pull.drain(function (comment) {
        commentsDiv.appendChild(com.comment(comment, sbot))
      }))
    }))
  })
})