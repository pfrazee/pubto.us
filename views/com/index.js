var h = require('hyperscript')

exports.doc         = require('./doc')
exports.docSummary  = require('./doc-summary')
exports.docForm     = require('./doc-form')
exports.comment     = require('./comment')
exports.commentForm = require('./comment-form')

exports.heading = function () {
  return h('.heading',
    h('h1', h('a', { href: '/' }, 'pubto.us'), ' ', h('small', h('a', { href: '/new'}, 'add document'))),
    h('p.tagline', 'create and share a library of articles and e-books'),
    h('p#sessiondiv',
      h('button.login', { disabled: true }, 'Login'), ' ',
      h('button.logout', { disabled: true }, 'Logout'), ' ',
      h('span.info.hidden',
        'You must have ',
        h('a', { href: 'https://github.com/ssbc/scuttlebot', target: '_blank' }, 'secure scuttlebutt'),
        ' installed and active to log in.'
      )
    )
  )
}

exports.name = function (id, sbot) {
  return (sbot && sbot.names && sbot.names[id]) ? sbot.names[id] : shortStr(id, 8)
}

function shortStr (s, n) {
  s = s || ''
  n = n || 15
  if (s.length > n)
    s = s.slice(0, n) + '...'
  return s
}