var h = require('hyperscript')
var com = require('../com')

module.exports = function () {
  return h('html',
    h('head',
      h('title', 'pubto.us'),
      h('link', { rel: 'stylesheet', href: '/css/index.css' }),
      h('meta', { charset: 'utf8' })
    ),
    h('body',
      com.heading(),
      h('#docsdiv', h('em', 'Login to see your network\'s library')),
      h('script', { src: '/js/index.js' })
    )
  )
}