var h = require('hyperscript')

var imageTypes = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml'  
}
var markdownTypes = {
  md: 'text/x-markdown',
  txt: 'text/plain'
}
var objectTypes = {
  pdf: 'application/pdf'
}

module.exports = function (msg, blob) {
  var ext = getExt(msg.value.content.name)
  if (ext in imageTypes)    return imageExt(msg, blob)
  if (ext in markdownTypes) return markdownExt(msg, blob)
  if (ext in objectTypes)   return objectExt(msg, blob)    
  return h('div.ext-unknown', blob)
}

function getExt (name) {
  return (name||'').split('.').slice(-1)[0]
}

function imageExt (msg, blob) {
  var name = msg.value.content.name
  return h('img.ext-img', { alt: name, title: name, src: 'data:'+imageTypes[getExt(name)]+';base64,'+btoa(blob) })
}

function objectExt (msg, blob) {
  var type = objectTypes[getExt(msg.value.content.name)]
  return h('object.ext-obj', { data: 'data:'+type+';charset=utf-8;base64,'+btoa(blob), type: type })
}

function markdownExt (msg, blob) {
  var ext = getExt(msg.value.content.name)
  return (ext == 'md') ?
    h('.ext-txt', blob) : // h('.ext-markdown', { innerHTML: markdown.block(blob, msg.value.content.names) }) :
    h('.ext-txt', blob)
}