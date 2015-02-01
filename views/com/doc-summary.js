var h = require('hyperscript')
var nicedate = require('nicedate')
var com = require('./')


module.exports = function (msg) {
  try {
    var c = msg.value.content
    var title = c.title || c.name || 'untitled'

    return h('.doc-summary', 
      h('div', h('a', { href: '/'+msg.key }, title)),
      h('div', h('small', nicedate(new Date(msg.value.timestamp), true)))      
    )
  }
  catch (e) {
    console.error('Failed to render doc summary', e, msg)
  }
}