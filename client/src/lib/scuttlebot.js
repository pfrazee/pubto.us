var muxrpc = require('muxrpc')
var Serializer = require('pull-serializer')
var chan = require('ssb-channel')
var auth = require('ssb-domain-auth')
var events = require('events')

var sbot = module.exports = new events.EventEmitter()
var sbotFound = false
sbot.available = localStorage.sbotAvailable === '1'
sbot.hasAccess = localStorage.sbotHasAccess === '1'

var ssb = sbot.ssb = muxrpc(require('./ssb-manifest'), false, serialize)()
var ssbchan = chan.connect(ssb, 'localhost')
ssbchan.on('connect', function() {
  console.log('Connected')
  sbotFound = true
  sbot.available = localStorage.sbotAvailable = 1
  auth.getToken('localhost', function(err, token) {
    if (err) return ssbchan.close(), console.log('Token fetch failed', err)
    ssb.auth(token, function(err) {
      if (err) return ssbchan.close(), console.log('Auth failed')
      sbot.hasAccess = localStorage.sbotHasAccess = 1
      sbot.emit('ready')
    })
  })
})
ssbchan.on('reconnecting', function () {
  console.log('Reconnecting')
  sbot.emit('reconnecting')
})
ssbchan.on('error', function (err) {
  console.log('Connection failed')
  sbot.hasAccess = localStorage.sbotHasAccess = 0
  if (!sbotFound) // not detected, assume not availabe
    sbot.available = localStorage.sbotAvailable = 0
  sbot.emit('error', err)
})

sbot.login = function () {
  auth.openAuthPopup('localhost', {
    title: 'paste.space',
    perms: ['whoami', 'add', 'messagesByType', 'createLogStream', 'blobs.add', 'blobs.get']
  }, function(err, granted) {
    if (granted)
      ssbchan.reconnect({ wait: 0 })
  })
}
sbot.logout = function () {
  auth.deauth('localhost')
  ssbchan.close()
}

function serialize (stream) {
  return Serializer(stream, JSON, {split: '\n\n'})
}