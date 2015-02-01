var dec = require('./decorators')

// setup ui
dec.login(document.getElementById('loginbtn'), document.getElementById('logoutbtn'))
dec.docForm(document.querySelector('form.doc-form'))