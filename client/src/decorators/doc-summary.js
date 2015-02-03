'use strict'
var h = require('hyperscript')
var sbot = require('../lib/scuttlebot')

module.exports = function (summaryEl, msg) {
  sbot.ssb.whoami(function (err, prof) {
    if (msg.value.author !== prof.id)
      return

    var btn = h('button')
    if (!msg.unlisted) {
      btn.innerText = 'Unlist Document'
      btn.onclick = function (e) {
        e.preventDefault()
        if (!confirm('Unlist this document?'))
          return
        btn.setAttribute('disabled', true)
        btn.innerText = 'Unlisting, please wait...'

        sbot.ssb.add({
          type: 'library-update',
          rel: 'updates',
          msg: msg.key,
          unlisted: true
        }, function (err, res) {
          if (err) {
            console.error(err)
            alert('Failed to unlist, please see the console for error details.')
          } else {
            window.location = '/'
          }
        })
      }
    } else {
      btn.innerText = 'Re-list Document'
      btn.onclick = function (e) {
        e.preventDefault()
        if (!confirm('Re-list this document?'))
          return
        btn.setAttribute('disabled', true)
        btn.innerText = 'Re-listing, please wait...'

        sbot.ssb.add({
          type: 'library-update',
          rel: 'updates',
          msg: msg.key,
          unlisted: false
        }, function (err, res) {
          if (err) {
            console.error(err)
            alert('Failed to re-list, please see the console for error details.')
          } else {
            window.location.reload()
          }
        })
      }
    }
    summaryEl.appendChild(h('div', h('hr'), btn))
  })
}
