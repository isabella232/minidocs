var el = require('bel')
var css = require('sheetify')
var sidebar = require('./sidebar')
var content = require('./content')

module.exports = function (params, state, send) {
  var prefix = css`
    :host {
      width: 58%;
      height: 529.5px;
      padding: 125.9px 10% 70.6px 6%;
      vertical-align: top;
      display: inline-block;
      margin-left: 24%;
    }
  `

  if (typeof document !== 'undefined' && document.body.scrollTop > 0) {
    document.body.scrollTop = 0
  }

  return el`<div id="choo-root" class="minidocs">
    ${sidebar(params, state, send)}
    <div class="${prefix} minidocs-main">
      <div class="markdown-body">
        ${content(params, state, send)}
      </div>
    </div>
  </div>`
}
