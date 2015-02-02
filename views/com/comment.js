var h = require('hyperscript')
var nicedate = require('nicedate')
var com = require('./')

module.exports = function (comment, sbot) {
  var c = comment.value.content
  if (!c.text)
    return h('div')
  return h('.comment',
    c.text,
    h('br'), h('br'),
    h('small',
      'by ',
      h('a', { href: '/library/'+comment.value.author }, com.name(comment.value.author, sbot)),
      ' ', 
      nicedate(new Date(comment.value.timestamp), true)
    )
  )
}