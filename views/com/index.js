var h = require('hyperscript')

exports.doc = require('./doc')
exports.docSummary = require('./doc-summary')
exports.docForm = require('./doc-form')

exports.heading = function () {
  return h('.heading',
    h('h1', h('a', { href: '/' }, 'pubto.us'), ' ', h('small', h('a', { href: '/new'}, 'add document'))),
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