var sbot = require('../lib/scuttlebot')

module.exports = function (el) {
  var loginBtn  = el.querySelector('.login')
  var logoutBtn = el.querySelector('.logout')
  var infoEl    = el.querySelector('.info')
  var ready     = sbot.hasAccess
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
      infoEl.classList.add('hidden')      
    } else if (sbot.available) {
      loginBtn.removeAttribute('disabled')
      logoutBtn.setAttribute('disabled', true)
      infoEl.classList.add('hidden')      
    } else {
      loginBtn.setAttribute('disabled', true)      
      logoutBtn.setAttribute('disabled', true)
      infoEl.classList.remove('hidden')
    }
  }
}