var pull = require('pull-stream')
var multicb = require('multicb')
var sbot = require('./lib/scuttlebot')
var doclib = require('./lib/doc')
var dec = require('./decorators')
var com = require('../../views/com')

var docDiv = document.getElementById('doc')
var key = window.location.pathname.slice(5)

// setup ui
dec.login(document.getElementById('sessiondiv'))

// sbot interactions
sbot.on('ready', function() {
  var done = multicb({ pluck: 1 })
  sbot.ssb.whoami(done())
  sbot.ssb.get(key, done())
  done(function (err, values) {
    var prof = values[0]
    var doc = { key: key, value: values[1], unlisted: false }

    // fetch blob and any update messages
    var done = multicb({ pluck: 1 })
    doclib.pullBlob(sbot, doc, done())
    doclib.pullUpdates(sbot, doc, done())
    done(function (err, v) {
      // render doc
      var docEl = com.doc(doc, v[0], sbot)
      docDiv.appendChild(docEl)
      dec.docSummary(docDiv.querySelector('.doc-summary'), doc)
    })

    // fetch and render comments
    var commentsDiv = document.querySelector('.comments')
    dec.commentForm(document.querySelector('.comment-form'), commentsDiv, doc.key)
    pull(sbot.ssb.messagesLinkedToMessage({ id: doc.key, rel: 'replies-to', keys: true }), pull.drain(function (comment) {
      commentsDiv.appendChild(com.comment(comment, sbot))
    }))
  })

})