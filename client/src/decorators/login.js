var sbot = require('../lib/scuttlebot')

module.exports = function (loginBtn, logoutBtn) {
  var ready = sbot.hasAccess
  render()

  sbot.on('ready', function() {
    ready = true
    render()
  })
  sbot.on('error', function() {
    ready = false
    render()
  })

  loginBtn.onclick = function(e){
    e.preventDefault()
    sbot.login()
  }
  logoutBtn.onclick = function(e){
    e.preventDefault()
    sbot.logout()
    ready = false
    render()
  }

  function render () {
    if (ready) {
      loginBtn.setAttribute('disabled', true)
      logoutBtn.removeAttribute('disabled')
    } else if (sbot.available) {
      loginBtn.removeAttribute('disabled')
      logoutBtn.setAttribute('disabled', true)
    } else {
      loginBtn.setAttribute('disabled', true)      
      logoutBtn.setAttribute('disabled', true)
    }
  }
}