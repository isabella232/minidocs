var url = require('url')
var css = require('sheetify')
var html = require('choo/html')

module.exports = function (state, prev, send) {
  var prefix = css('./sidebar.css')

  return html`
    <div class="${prefix} minidocs-menu pa3">
      ${createMenu(state.contents)}
    </div>
  `

  function createMenu (contents) {
    return contents.map(function (item) {
      // TODO: figure out a better way to get current page in state based on link click
      var current
      var location

      if (state.location && state.location.pathname) {
        location = url.parse(state.location.pathname)
        var sliceBy = state.basedir.length + 1
        current = location.pathname.slice(sliceBy)
      }

      if (!current || current.length <= 1) {
        current = state.current
      }

      if (isActive(current, item.key) && item.toc.length > 1) {
        return html`
          <div>
            <a href="${item.link}" class="content-link ${isActive(current, item.key)}">${item.name}</a>
            <div class="minidocs-menu-toc">
              ${item.toc.map(function (tocItem) {
                return (tocItem.level === 2) ? createTocItem(tocItem) : ''
              })}
            </div>
          </div>
        `
      }

      if (item.link) {
        return html`<div><a href="${item.link}" class="content-link ${isActive(current, item.key)}">${item.name}</a></div>`
      }

      return html`<div class="f3 pt2">${item.name}</div>`

      function createTocItem (tocItem) {
        if (tocItem.level === 1) return '' // Don't put title
        var depth = item.depth + (tocItem.level - 1) + 2
        return html`<a href="#${tocItem.slug}" class="f${depth} content-link">${tocItem.title}</a>`
      }
    })
  }

  function isActive (current, item) {
    return current === item ? 'active' : ''
  }
}
