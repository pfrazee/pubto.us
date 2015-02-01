var h = require('hyperscript')
var nicedate = require('nicedate')

module.exports = function (msg) {
  try {
    var c = msg.value.content
    return h('.doc', 
      h('div', h('small', nicedate(new Date(msg.value.timestamp), true))),
      h('div', c.title || c.name || 'untitled')
    )
  }
  catch (e) {
    console.error('Failed to render message summary', e, msg)
  }
}