'use strict'
var h = require('hyperscript')
var com = require('../../../views/com')
var sbot = require('../lib/scuttlebot')

module.exports = function (formEl, commentsDiv, parentKey) {
  formEl.onsubmit = function (e) {
    e.preventDefault()
    var formEl = this
    var submitBtn = formEl.querySelector('button')

    var msg = {
      type: 'post',
      text: formEl.text.value,
      rel: 'replies-to',
      msg: parentKey
    }

    // validate
    if (!(msg.text||'').trim())
      return

    // disable submit btn
    setBtn(submitBtn, false, 'Adding...')

    // post
    sbot.ssb.add(msg, function (err, comment) {
      setBtn(submitBtn, true, 'Add Comment')      
      if (err) {
        console.error(err)
        alert('Failed to save, please see the console for error details.')
        return
      }
      formEl.reset()
      commentsDiv.insertBefore(com.comment(comment, sbot), commentsDiv.firstChild)
    })
  }
}

function setBtn (btn, enabled, str) {
  if (enabled) {
    btn.removeAttribute('disabled')
  } else {
    btn.setAttribute('disabled', true)
  }
  btn.innerText = str
}