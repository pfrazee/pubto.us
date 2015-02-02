var dec = require('./decorators')

// setup ui
dec.login(document.getElementById('sessiondiv'))
dec.docForm(document.querySelector('form.doc-form'))