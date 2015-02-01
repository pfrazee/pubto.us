var h = require('hyperscript')
var com = require('../com')

module.exports = function () {
  return h('html',
    h('head',
      h('title', 'pub.doc'),
      h('link', { rel: 'stylesheet', href: '/css/index.css' }),
      h('meta', { charset: 'utf8' })
    ),
    h('body',
      h('h1', h('a', { href: '/' }, 'pub.doc')),
      h('p', h('button#loginbtn', 'Login'), ' ', h('button#logoutbtn', 'Logout')),
      h('#doc'),
      h('script', { src: '/js/document.js' })
    )
  )
}