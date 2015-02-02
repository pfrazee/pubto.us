var h = require('hyperscript')
var summary = require('./doc-summary')
var ext = require('./ext')
var commentForm = require('./comment-form')

module.exports = function (msg, blob, sbot) {
  try {
    var c = msg.value.content
    return h('.doc', 
      h('.ext', { 'data-name': c.name || c.ext }, ext(msg, blob)),
      summary(msg, sbot),
      h('.comments'),
      commentForm()
    )
  }
  catch (e) {
    console.error('Failed to render message summary', e, msg)
  }
}