var h = require('hyperscript')
var summary = require('./doc-summary')
var ext = require('./ext')

module.exports = function (msg, blob, sbot) {
  try {
    var c = msg.value.content
    return h('.doc',
      h('.ext', { 'data-name': c.name || c.ext }, ext(msg, blob)),
      summary(msg, sbot)
    )
  }
  catch (e) {
    console.error('Failed to render message summary', e, msg)
  }
}