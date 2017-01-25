;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-ellipsis" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M255.9 512 255.9 512c-35.6 0-64.5-28.9-64.5-64.5l0 0c0-35.6 28.9-64.5 64.5-64.5l0 0c35.6 0 64.5 28.9 64.5 64.5l0 0C320.4 483.1 291.5 512 255.9 512z"  ></path>' +
    '' +
    '<path d="M512.9 512 512.9 512c-35.6 0-64.5-28.9-64.5-64.5l0 0c0-35.6 28.9-64.5 64.5-64.5l0 0c35.6 0 64.5 28.9 64.5 64.5l0 0C577.4 483.1 548.6 512 512.9 512z"  ></path>' +
    '' +
    '<path d="M770 512 770 512c-35.6 0-64.5-28.9-64.5-64.5l0 0c0-35.6 28.9-64.5 64.5-64.5l0 0c35.6 0 64.5 28.9 64.5 64.5l0 0C834.5 483.1 805.6 512 770 512z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-folder" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M981.162667 366.933333 921.6 366.933333l0-106.973867c0-25.719467-20.923733-46.626133-46.626133-46.626133L452.522667 213.333333l-85.333333-119.466667L46.626133 93.866667C20.923733 93.866667 0 114.7904 0 140.4928l0 745.591467 0.1024 0c-0.085333 9.608533 2.901333 19.012267 8.9088 26.88C17.373867 923.886933 30.037333 930.133333 43.776 930.133333l763.886933 0c19.729067 0 37.102933-13.294933 41.813333-30.941867L1024 420.676267l0-3.0208C1024 388.266667 1005.9776 366.933333 981.162667 366.933333zM34.133333 140.4928C34.133333 133.597867 39.748267 128 46.626133 128l302.984533 0 85.333333 119.466667 440.0128 0c6.894933 0 12.4928 5.597867 12.4928 12.4928L887.4496 366.933333 217.275733 366.933333c-2.4576 0-4.898133 0.2048-7.2704 0.6144-16.605867 2.781867-30.4128 14.8992-34.525867 30.3104L34.133333 783.342933 34.133333 140.4928zM816.964267 888.8832c-1.1264 4.181333-4.9664 7.1168-9.301333 7.1168L43.776 896c-4.1472 0-6.570667-2.372267-7.645867-3.7888-1.0752-1.399467-2.730667-4.369067-2.0992-6.9632l173.9264-477.064533c1.1264-4.181333 4.9664-7.1168 9.301333-7.1168L921.6 401.066667l59.562667 0c6.485333 0 8.1408 9.3184 8.567467 13.9776L816.964267 888.8832z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)