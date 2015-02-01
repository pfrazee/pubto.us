var h = require('hyperscript')
var com = require('../com')

module.exports = function () {
  return h('html',
    h('head',
      h('title', 'pub.doc - new document'),
      h('link', { rel: 'stylesheet', href: '/css/index.css' }),
      h('meta', { charset: 'utf8' })
    ),
    h('body',
      com.heading(),
      com.docForm(),
      h('script', { src: '/js/new.js' })
    )
  )
}