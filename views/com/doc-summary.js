var h = require('hyperscript')
var nicedate = require('nicedate')
var com = require('./')

module.exports = function (msg, sbot) {
  try {
    var c = msg.value.content
    var title = c.title || c.name || 'untitled'

    return h('.doc-summary', 
      h('h2', h('a', { href: '/doc/'+msg.key }, title), (msg.unlisted ? h('small', ' UNLISTED') : '')),
      (c.desc ? h('.desc', c.desc) : ''),
      h('div', h('small',
        nicedate(new Date(msg.value.timestamp), true),
        ' by ',
        h('a', { href: '/library/'+msg.value.author }, com.name(msg.value.author, sbot))
      ))
    )
  }
  catch (e) {
    console.error('Failed to render doc summary', e, msg)
  }
}