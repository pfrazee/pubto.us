var pull = require('pull-stream')

exports.pullBlob = function (sbot, doc, cb) {
  var blob = ''
  function concat (chunk) { blob += atob(chunk) }
  pull(sbot.ssb.blobs.get(doc.value.content.ext), pull.drain(concat, function (err) {
    cb(err, blob)
  }))
}

exports.pullUpdates = function (sbot, doc, cb) {
  var ts
  pull(sbot.ssb.messagesLinkedToMessage({ id: doc.key, rel: 'updates' }), pull.drain(function (update) {
    if (update.author !== doc.value.author)
      return
    if (ts > update.timestamp)
      return
    ts = update.timestamp
    if (typeof update.content.unlisted == 'boolean')
      doc.unlisted = update.content.unlisted
  }, cb))
}