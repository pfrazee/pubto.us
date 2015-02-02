var h = require('hyperscript')

module.exports = function () {
  return h('form.comment-form', 
    h('.input-group',
      h('textarea', { type: 'text', name: 'text', rows: 6 })
    ),
    h('.input-group',
      h('button', { type: 'submit' }, 'Add Comment')
    )
  )
}