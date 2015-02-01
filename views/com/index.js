var h = require('hyperscript')

exports.doc = require('./doc')
exports.docSummary = require('./doc-summary')
exports.docForm = require('./doc-form')

exports.heading = function () {
  return h('.heading',
    h('h1', h('a', { href: '/' }, 'pubto.us'), ' ', h('small', h('a', { href: '/new'}, 'new'))),
    h('p', h('button#loginbtn', 'Login'), ' ', h('button#logoutbtn', 'Logout'))
  )
}