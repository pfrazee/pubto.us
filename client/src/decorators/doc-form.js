'use strict'
var h = require('hyperscript')
var createHash = require('multiblob/util').createHash
var pull = require('pull-stream')
var pushable = require('pull-pushable')
var sbot = require('../lib/scuttlebot')

var SIZE_5MB = 5 * 1024 * 1024

module.exports = function (formEl) {
  formEl.onsubmit = onsubmit
}

function setError (el, desc) {
  el.previousSibling.dataset.after = desc
}

function validate (desc, el, passes) {
  if (!passes) {
    setError(el, desc)
    return true
  } else {
    setError(el, '')
    return false
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

function onsubmit (e) {
  e.preventDefault()
  var formEl = this
  var submitBtn = formEl.querySelector('button')
  var file = formEl.document.files[0]

  var msg = {
    type: 'library-add',
    title: formEl.title.value,
    desc: formEl.description.value,
    rel: 'document',
    ext: null,
    name: null,
    size: null
  }

  // validate
  var hasErrors = 
    validate('required', formEl.title, !!(msg.title||'').trim()) || 
    validate('required', formEl.document, !!formEl.document.files.length) ||
    validate('must be less than 5mb', formEl.document, file.size <= SIZE_5MB)
  if (hasErrors)
    return

  // disable submit btn
  setBtn(submitBtn, false, 'Saving...')

  // read file
  var ps = pushable()
  var reader = new FileReader()
  reader.onload = function () {
    ps.push(new Buffer(new Uint8Array(reader.result)))
    ps.end()
  }
  reader.onerror = function (e) {
    console.error(e)
    ps.end(new Error('Failed to upload '+file.name))
  }
  reader.readAsArrayBuffer(file)

  // hash and store
  var hasher = createHash()
  pull(
    ps,
    hasher,
    pull.map(function (buf) { return new Buffer(new Uint8Array(buf)).toString('base64') }),
    sbot.ssb.blobs.add(function (err) {
      if(err) return fileStored(err)
      msg.ext  = hasher.digest
      msg.name = file.name
      msg.size = file.size || hasher.size
      fileStored()
    })
  )

  function fileStored (err) {
    if (err) {
      console.error(err)
      alert('Failed to save, please see the console for error details.')
      setBtn(submitBtn, true, 'Save')
      return
    }
    sbot.ssb.add(msg, function (err, res) {
      if (err) {
        console.error(err)
        alert('Failed to save, please see the console for error details.')
        setBtn(submitBtn, true, 'Save')
        return
      }
      window.location = '/doc/'+res.key
    })
  }
}