var html = require('choo/html')
var css = require('sheetify')
var header = require('./header')
var sidebar = require('./sidebar')
var content = require('./content')

module.exports = function (state, prev, send) {
  css('tachyons')
  var prefix = css('./main.css')

  return html`
    <div id="choo-root" class="${prefix} minidocs flex flex-column m0 h-100" onclick=${(e) => { checkMenu(e) }}>
      <div class="minidocs-header-flex flex">
        ${header(state, prev, send)}
      </div>
      <main class="minidocs-main-flex flex">
        ${createSidebar()}
        <div class="minidocs-content-flex order-1 overflow-auto">
          ${content(state, prev, send)}
        </div>
      </main>
    </div>`

  function createSidebar () {
    if (typeof window !== 'undefined' && window.innerWidth <= 800) {
      if (!state.menu.open) return ''
    }

    return html`
      <div class="minidocs-sidebar-flex open order-0 overflow-auto bg-near-white">
        ${sidebar(state, prev, send)}
      </div>
    `
  }

  function checkMenu (e) {
    if (state.menu.open) return send('menu:set', { open: false })
  }
}
