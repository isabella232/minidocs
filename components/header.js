var html = require('choo/html')
var css = require('sheetify')

module.exports = (state, prev, send) => {
  var prefix = css('./header.css')

  return html`
  <header class="${prefix} minidocs-header ph4 w-100 bg-black-90">
    <nav class="flex justify-between">
      <div class="flex items-center">
        <div class="menu-button">
          <a class=" menu-toggle" onclick=${() => {send('menu:toggle')} }></a>
        </div>
        ${logo()}
      </div>
      <div class="minidocs-header-nav flex-grow flex items-center tr ttu">
        <a class="minidocs-header-link white dim link dn dib-ns mr3-ns" href="/install" title="Install">Install</a>
        <a class="minidocs-header-link white dim link dib mr3-ns" href="http://datproject.org/explore" title="Explore">Explore</a>
      </a>
    </nav>
  </header>`

  function logo () {
    if (!state.logo) {
      return html`
        <a class="inline-flex items-center" href="/" title="${state.title}">
          <span class="minidocs-header-title ml2 pr2 white">${state.title}</span>
        </a>
      `
    }

    return html`
      <a class="inline-flex items-center" href="/" title="${state.title}">
        <img class="minidocs-header-logo dib w2 h2" src="${state.basedir + '/' + state.logo}" alt="${state.title}"/>
        <span class="minidocs-header-title ml2 pr2 white">${state.title}</span>
      </a>
    `
  }
}
