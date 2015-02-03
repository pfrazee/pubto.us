var h = require('hyperscript')
var pull = require('pull-stream')
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
      h('#doc'),
      h('.comments'),
      com.commentForm(),
      h('script', { src: '/js/document.js' })
    )
  )
}