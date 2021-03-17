(() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS((exports, module) => {
    (function(window2, factory) {
      var lazySizes = factory(window2, window2.document, Date);
      window2.lazySizes = lazySizes;
      if (typeof module == "object" && module.exports) {
        module.exports = lazySizes;
      }
    })(typeof window != "undefined" ? window : {}, function l(window2, document2, Date2) {
      "use strict";
      var lazysizes2, lazySizesCfg;
      (function() {
        var prop;
        var lazySizesDefaults = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          fastLoadedClass: "ls-is-cached",
          iframeLoadMode: 0,
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: true,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: true,
          ricTimeout: 0,
          throttleDelay: 125
        };
        lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
        for (prop in lazySizesDefaults) {
          if (!(prop in lazySizesCfg)) {
            lazySizesCfg[prop] = lazySizesDefaults[prop];
          }
        }
      })();
      if (!document2 || !document2.getElementsByClassName) {
        return {
          init: function() {
          },
          cfg: lazySizesCfg,
          noSupport: true
        };
      }
      var docElem = document2.documentElement;
      var supportPicture = window2.HTMLPictureElement;
      var _addEventListener = "addEventListener";
      var _getAttribute = "getAttribute";
      var addEventListener2 = window2[_addEventListener].bind(window2);
      var setTimeout2 = window2.setTimeout;
      var requestAnimationFrame = window2.requestAnimationFrame || setTimeout2;
      var requestIdleCallback = window2.requestIdleCallback;
      var regPicture = /^picture$/i;
      var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
      var regClassCache = {};
      var forEach = Array.prototype.forEach;
      var hasClass = function(ele, cls) {
        if (!regClassCache[cls]) {
          regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        }
        return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
      };
      var addClass = function(ele, cls) {
        if (!hasClass(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
        }
      };
      var removeClass = function(ele, cls) {
        var reg;
        if (reg = hasClass(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
        }
      };
      var addRemoveLoadEvents = function(dom, fn, add) {
        var action = add ? _addEventListener : "removeEventListener";
        if (add) {
          addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt) {
          dom[action](evt, fn);
        });
      };
      var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
        var event = document2.createEvent("Event");
        if (!detail) {
          detail = {};
        }
        detail.instance = lazysizes2;
        event.initEvent(name, !noBubbles, !noCancelable);
        event.detail = detail;
        elem.dispatchEvent(event);
        return event;
      };
      var updatePolyfill = function(el, full) {
        var polyfill;
        if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
          if (full && full.src && !el[_getAttribute]("srcset")) {
            el.setAttribute("srcset", full.src);
          }
          polyfill({reevaluate: true, elements: [el]});
        } else if (full && full.src) {
          el.src = full.src;
        }
      };
      var getCSS = function(elem, style) {
        return (getComputedStyle(elem, null) || {})[style];
      };
      var getWidth = function(elem, parent, width) {
        width = width || elem.offsetWidth;
        while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
          width = parent.offsetWidth;
          parent = parent.parentNode;
        }
        return width;
      };
      var rAF = function() {
        var running, waiting;
        var firstFns = [];
        var secondFns = [];
        var fns = firstFns;
        var run = function() {
          var runFns = fns;
          fns = firstFns.length ? secondFns : firstFns;
          running = true;
          waiting = false;
          while (runFns.length) {
            runFns.shift()();
          }
          running = false;
        };
        var rafBatch = function(fn, queue) {
          if (running && !queue) {
            fn.apply(this, arguments);
          } else {
            fns.push(fn);
            if (!waiting) {
              waiting = true;
              (document2.hidden ? setTimeout2 : requestAnimationFrame)(run);
            }
          }
        };
        rafBatch._lsFlush = run;
        return rafBatch;
      }();
      var rAFIt = function(fn, simple) {
        return simple ? function() {
          rAF(fn);
        } : function() {
          var that = this;
          var args = arguments;
          rAF(function() {
            fn.apply(that, args);
          });
        };
      };
      var throttle = function(fn) {
        var running;
        var lastTime = 0;
        var gDelay = lazySizesCfg.throttleDelay;
        var rICTimeout = lazySizesCfg.ricTimeout;
        var run = function() {
          running = false;
          lastTime = Date2.now();
          fn();
        };
        var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
          requestIdleCallback(run, {timeout: rICTimeout});
          if (rICTimeout !== lazySizesCfg.ricTimeout) {
            rICTimeout = lazySizesCfg.ricTimeout;
          }
        } : rAFIt(function() {
          setTimeout2(run);
        }, true);
        return function(isPriority) {
          var delay;
          if (isPriority = isPriority === true) {
            rICTimeout = 33;
          }
          if (running) {
            return;
          }
          running = true;
          delay = gDelay - (Date2.now() - lastTime);
          if (delay < 0) {
            delay = 0;
          }
          if (isPriority || delay < 9) {
            idleCallback();
          } else {
            setTimeout2(idleCallback, delay);
          }
        };
      };
      var debounce = function(func) {
        var timeout, timestamp;
        var wait = 99;
        var run = function() {
          timeout = null;
          func();
        };
        var later = function() {
          var last = Date2.now() - timestamp;
          if (last < wait) {
            setTimeout2(later, wait - last);
          } else {
            (requestIdleCallback || run)(run);
          }
        };
        return function() {
          timestamp = Date2.now();
          if (!timeout) {
            timeout = setTimeout2(later, wait);
          }
        };
      };
      var loader = function() {
        var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;
        var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
        var shrinkExpand = 0;
        var currentExpand = 0;
        var isLoading = 0;
        var lowRuns = -1;
        var resetPreloading = function(e2) {
          isLoading--;
          if (!e2 || isLoading < 0 || !e2.target) {
            isLoading = 0;
          }
        };
        var isVisible = function(elem) {
          if (isBodyHidden == null) {
            isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
          }
          return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
        };
        var isNestedVisible = function(elem, elemExpand) {
          var outerRect;
          var parent = elem;
          var visible = isVisible(elem);
          eLtop -= elemExpand;
          eLbottom += elemExpand;
          eLleft -= elemExpand;
          eLright += elemExpand;
          while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
            visible = (getCSS(parent, "opacity") || 1) > 0;
            if (visible && getCSS(parent, "overflow") != "visible") {
              outerRect = parent.getBoundingClientRect();
              visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
            }
          }
          return visible;
        };
        var checkElements = function() {
          var eLlen, i2, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
          var lazyloadElems = lazysizes2.elements;
          if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
            i2 = 0;
            lowRuns++;
            for (; i2 < eLlen; i2++) {
              if (!lazyloadElems[i2] || lazyloadElems[i2]._lazyRace) {
                continue;
              }
              if (!supportScroll || lazysizes2.prematureUnveil && lazysizes2.prematureUnveil(lazyloadElems[i2])) {
                unveilElement(lazyloadElems[i2]);
                continue;
              }
              if (!(elemExpandVal = lazyloadElems[i2][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                elemExpand = currentExpand;
              }
              if (!defaultExpand) {
                defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                lazysizes2._defEx = defaultExpand;
                preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                hFac = lazySizesCfg.hFac;
                isBodyHidden = null;
                if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                  currentExpand = preloadExpand;
                  lowRuns = 0;
                } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                  currentExpand = defaultExpand;
                } else {
                  currentExpand = shrinkExpand;
                }
              }
              if (beforeExpandVal !== elemExpand) {
                eLvW = innerWidth + elemExpand * hFac;
                elvH = innerHeight + elemExpand;
                elemNegativeExpand = elemExpand * -1;
                beforeExpandVal = elemExpand;
              }
              rect = lazyloadElems[i2].getBoundingClientRect();
              if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i2])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i2], elemExpand))) {
                unveilElement(lazyloadElems[i2]);
                loadedSomething = true;
                if (isLoading > 9) {
                  break;
                }
              } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i2][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                autoLoadElem = preloadElems[0] || lazyloadElems[i2];
              }
            }
            if (autoLoadElem && !loadedSomething) {
              unveilElement(autoLoadElem);
            }
          }
        };
        var throttledCheckElements = throttle(checkElements);
        var switchLoadingClass = function(e2) {
          var elem = e2.target;
          if (elem._lazyCache) {
            delete elem._lazyCache;
            return;
          }
          resetPreloading(e2);
          addClass(elem, lazySizesCfg.loadedClass);
          removeClass(elem, lazySizesCfg.loadingClass);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass);
          triggerEvent(elem, "lazyloaded");
        };
        var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
        var rafSwitchLoadingClass = function(e2) {
          rafedSwitchLoadingClass({target: e2.target});
        };
        var changeIframeSrc = function(elem, src) {
          var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
          if (loadMode2 == 0) {
            elem.contentWindow.location.replace(src);
          } else if (loadMode2 == 1) {
            elem.src = src;
          }
        };
        var handleSources = function(source) {
          var customMedia;
          var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
          if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
            source.setAttribute("media", customMedia);
          }
          if (sourceSrcset) {
            source.setAttribute("srcset", sourceSrcset);
          }
        };
        var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
          var src, srcset, parent, isPicture, event, firesLoad;
          if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
            if (sizes) {
              if (isAuto) {
                addClass(elem, lazySizesCfg.autosizesClass);
              } else {
                elem.setAttribute("sizes", sizes);
              }
            }
            srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
            src = elem[_getAttribute](lazySizesCfg.srcAttr);
            if (isImg) {
              parent = elem.parentNode;
              isPicture = parent && regPicture.test(parent.nodeName || "");
            }
            firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
            event = {target: elem};
            addClass(elem, lazySizesCfg.loadingClass);
            if (firesLoad) {
              clearTimeout(resetPreloadingTimer);
              resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
            }
            if (isPicture) {
              forEach.call(parent.getElementsByTagName("source"), handleSources);
            }
            if (srcset) {
              elem.setAttribute("srcset", srcset);
            } else if (src && !isPicture) {
              if (regIframe.test(elem.nodeName)) {
                changeIframeSrc(elem, src);
              } else {
                elem.src = src;
              }
            }
            if (isImg && (srcset || isPicture)) {
              updatePolyfill(elem, {src});
            }
          }
          if (elem._lazyRace) {
            delete elem._lazyRace;
          }
          removeClass(elem, lazySizesCfg.lazyClass);
          rAF(function() {
            var isLoaded = elem.complete && elem.naturalWidth > 1;
            if (!firesLoad || isLoaded) {
              if (isLoaded) {
                addClass(elem, lazySizesCfg.fastLoadedClass);
              }
              switchLoadingClass(event);
              elem._lazyCache = true;
              setTimeout2(function() {
                if ("_lazyCache" in elem) {
                  delete elem._lazyCache;
                }
              }, 9);
            }
            if (elem.loading == "lazy") {
              isLoading--;
            }
          }, true);
        });
        var unveilElement = function(elem) {
          if (elem._lazyRace) {
            return;
          }
          var detail;
          var isImg = regImg.test(elem.nodeName);
          var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
          var isAuto = sizes == "auto";
          if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
            return;
          }
          detail = triggerEvent(elem, "lazyunveilread").detail;
          if (isAuto) {
            autoSizer.updateElem(elem, true, elem.offsetWidth);
          }
          elem._lazyRace = true;
          isLoading++;
          lazyUnveil(elem, detail, isAuto, sizes, isImg);
        };
        var afterScroll = debounce(function() {
          lazySizesCfg.loadMode = 3;
          throttledCheckElements();
        });
        var altLoadmodeScrollListner = function() {
          if (lazySizesCfg.loadMode == 3) {
            lazySizesCfg.loadMode = 2;
          }
          afterScroll();
        };
        var onload = function() {
          if (isCompleted) {
            return;
          }
          if (Date2.now() - started < 999) {
            setTimeout2(onload, 999);
            return;
          }
          isCompleted = true;
          lazySizesCfg.loadMode = 3;
          throttledCheckElements();
          addEventListener2("scroll", altLoadmodeScrollListner, true);
        };
        return {
          _: function() {
            started = Date2.now();
            lazysizes2.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
            preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
            addEventListener2("scroll", throttledCheckElements, true);
            addEventListener2("resize", throttledCheckElements, true);
            addEventListener2("pageshow", function(e2) {
              if (e2.persisted) {
                var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                if (loadingElements.length && loadingElements.forEach) {
                  requestAnimationFrame(function() {
                    loadingElements.forEach(function(img) {
                      if (img.complete) {
                        unveilElement(img);
                      }
                    });
                  });
                }
              }
            });
            if (window2.MutationObserver) {
              new MutationObserver(throttledCheckElements).observe(docElem, {childList: true, subtree: true, attributes: true});
            } else {
              docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
              docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
              setInterval(throttledCheckElements, 999);
            }
            addEventListener2("hashchange", throttledCheckElements, true);
            ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
              document2[_addEventListener](name, throttledCheckElements, true);
            });
            if (/d$|^c/.test(document2.readyState)) {
              onload();
            } else {
              addEventListener2("load", onload);
              document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
              setTimeout2(onload, 2e4);
            }
            if (lazysizes2.elements.length) {
              checkElements();
              rAF._lsFlush();
            } else {
              throttledCheckElements();
            }
          },
          checkElems: throttledCheckElements,
          unveil: unveilElement,
          _aLSL: altLoadmodeScrollListner
        };
      }();
      var autoSizer = function() {
        var autosizesElems;
        var sizeElement = rAFIt(function(elem, parent, event, width) {
          var sources, i2, len;
          elem._lazysizesWidth = width;
          width += "px";
          elem.setAttribute("sizes", width);
          if (regPicture.test(parent.nodeName || "")) {
            sources = parent.getElementsByTagName("source");
            for (i2 = 0, len = sources.length; i2 < len; i2++) {
              sources[i2].setAttribute("sizes", width);
            }
          }
          if (!event.detail.dataAttr) {
            updatePolyfill(elem, event.detail);
          }
        });
        var getSizeElement = function(elem, dataAttr, width) {
          var event;
          var parent = elem.parentNode;
          if (parent) {
            width = getWidth(elem, parent, width);
            event = triggerEvent(elem, "lazybeforesizes", {width, dataAttr: !!dataAttr});
            if (!event.defaultPrevented) {
              width = event.detail.width;
              if (width && width !== elem._lazysizesWidth) {
                sizeElement(elem, parent, event, width);
              }
            }
          }
        };
        var updateElementsSizes = function() {
          var i2;
          var len = autosizesElems.length;
          if (len) {
            i2 = 0;
            for (; i2 < len; i2++) {
              getSizeElement(autosizesElems[i2]);
            }
          }
        };
        var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
        return {
          _: function() {
            autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
            addEventListener2("resize", debouncedUpdateElementsSizes);
          },
          checkElems: debouncedUpdateElementsSizes,
          updateElem: getSizeElement
        };
      }();
      var init = function() {
        if (!init.i && document2.getElementsByClassName) {
          init.i = true;
          autoSizer._();
          loader._();
        }
      };
      setTimeout2(function() {
        if (lazySizesCfg.init) {
          init();
        }
      });
      lazysizes2 = {
        cfg: lazySizesCfg,
        autoSizer,
        loader,
        init,
        uP: updatePolyfill,
        aC: addClass,
        rC: removeClass,
        hC: hasClass,
        fire: triggerEvent,
        gW: getWidth,
        rAF
      };
      return lazysizes2;
    });
  });

  // node_modules/lazysizes/plugins/noscript/ls.noscript.js
  var require_ls_noscript = __commonJS((exports, module) => {
    (function(window2, factory) {
      var globalInstall = function() {
        factory(window2.lazySizes);
        window2.removeEventListener("lazyunveilread", globalInstall, true);
      };
      factory = factory.bind(null, window2, window2.document);
      if (typeof module == "object" && module.exports) {
        factory(require_lazysizes());
      } else if (typeof define == "function" && define.amd) {
        define(["lazysizes"], factory);
      } else if (window2.lazySizes) {
        globalInstall();
      } else {
        window2.addEventListener("lazyunveilread", globalInstall, true);
      }
    })(window, function(window2, document2, lazySizes) {
      "use strict";
      var dummyParent = {nodeName: ""};
      var supportPicture = !!window2.HTMLPictureElement && "sizes" in document2.createElement("img");
      var config = window2.lazySizes && lazySizes.cfg;
      var handleLoadingElements = function(e2) {
        var i2, isResponsive, hasTriggered, onload, loading;
        var loadElements = e2.target.querySelectorAll("img, iframe");
        for (i2 = 0; i2 < loadElements.length; i2++) {
          isResponsive = loadElements[i2].getAttribute("srcset") || (loadElements[i2].parentNode || dummyParent).nodeName.toLowerCase() == "picture";
          if (!supportPicture && isResponsive) {
            lazySizes.uP(loadElements[i2]);
          }
          if (!loadElements[i2].complete && (isResponsive || loadElements[i2].src)) {
            e2.detail.firesLoad = true;
            if (!onload || !loading) {
              loading = 0;
              onload = function(evt) {
                loading--;
                if ((!evt || loading < 1) && !hasTriggered) {
                  hasTriggered = true;
                  e2.detail.firesLoad = false;
                  lazySizes.fire(e2.target, "_lazyloaded", {}, false, true);
                }
                if (evt && evt.target) {
                  evt.target.removeEventListener("load", onload);
                  evt.target.removeEventListener("error", onload);
                }
              };
              setTimeout(onload, 3500);
            }
            loading++;
            loadElements[i2].addEventListener("load", onload);
            loadElements[i2].addEventListener("error", onload);
          }
        }
      };
      config.getNoscriptContent = function(noScript) {
        return noScript.textContent || noScript.innerText;
      };
      window2.addEventListener("lazybeforeunveil", function(e2) {
        if (e2.detail.instance != lazySizes || e2.defaultPrevented || e2.target.getAttribute("data-noscript") == null) {
          return;
        }
        var noScript = e2.target.querySelector('noscript, script[type*="html"]') || {};
        var content = config.getNoscriptContent(noScript);
        if (content) {
          e2.target.innerHTML = content;
          handleLoadingElements(e2);
        }
      });
    });
  });

  // node_modules/lazysizes/plugins/bgset/ls.bgset.js
  var require_ls_bgset = __commonJS((exports, module) => {
    (function(window2, factory) {
      var globalInstall = function() {
        factory(window2.lazySizes);
        window2.removeEventListener("lazyunveilread", globalInstall, true);
      };
      factory = factory.bind(null, window2, window2.document);
      if (typeof module == "object" && module.exports) {
        factory(require_lazysizes());
      } else if (typeof define == "function" && define.amd) {
        define(["lazysizes"], factory);
      } else if (window2.lazySizes) {
        globalInstall();
      } else {
        window2.addEventListener("lazyunveilread", globalInstall, true);
      }
    })(window, function(window2, document2, lazySizes) {
      "use strict";
      if (!window2.addEventListener) {
        return;
      }
      var lazySizesCfg = lazySizes.cfg;
      var regWhite = /\s+/g;
      var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
      var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
      var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
      var regBgUrlEscape = /\(|\)|'/;
      var allowedBackgroundSize = {contain: 1, cover: 1};
      var proxyWidth = function(elem) {
        var width = lazySizes.gW(elem, elem.parentNode);
        if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
          elem._lazysizesWidth = width;
        }
        return elem._lazysizesWidth;
      };
      var getBgSize = function(elem) {
        var bgSize;
        bgSize = (getComputedStyle(elem) || {getPropertyValue: function() {
        }}).getPropertyValue("background-size");
        if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
          bgSize = elem.style.backgroundSize;
        }
        return bgSize;
      };
      var setTypeOrMedia = function(source, match) {
        if (match) {
          var typeMatch = match.match(regType);
          if (typeMatch && typeMatch[1]) {
            source.setAttribute("type", typeMatch[1]);
          } else {
            source.setAttribute("media", lazySizesCfg.customMedia[match] || match);
          }
        }
      };
      var createPicture = function(sets, elem, img) {
        var picture = document2.createElement("picture");
        var sizes = elem.getAttribute(lazySizesCfg.sizesAttr);
        var ratio = elem.getAttribute("data-ratio");
        var optimumx = elem.getAttribute("data-optimumx");
        if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
          elem.removeChild(elem._lazybgset);
        }
        Object.defineProperty(img, "_lazybgset", {
          value: elem,
          writable: true
        });
        Object.defineProperty(elem, "_lazybgset", {
          value: picture,
          writable: true
        });
        sets = sets.replace(regWhite, " ").split(regSplitSet);
        picture.style.display = "none";
        img.className = lazySizesCfg.lazyClass;
        if (sets.length == 1 && !sizes) {
          sizes = "auto";
        }
        sets.forEach(function(set) {
          var match;
          var source = document2.createElement("source");
          if (sizes && sizes != "auto") {
            source.setAttribute("sizes", sizes);
          }
          if (match = set.match(regSource)) {
            source.setAttribute(lazySizesCfg.srcsetAttr, match[1]);
            setTypeOrMedia(source, match[2]);
            setTypeOrMedia(source, match[3]);
          } else {
            source.setAttribute(lazySizesCfg.srcsetAttr, set);
          }
          picture.appendChild(source);
        });
        if (sizes) {
          img.setAttribute(lazySizesCfg.sizesAttr, sizes);
          elem.removeAttribute(lazySizesCfg.sizesAttr);
          elem.removeAttribute("sizes");
        }
        if (optimumx) {
          img.setAttribute("data-optimumx", optimumx);
        }
        if (ratio) {
          img.setAttribute("data-ratio", ratio);
        }
        picture.appendChild(img);
        elem.appendChild(picture);
      };
      var proxyLoad = function(e2) {
        if (!e2.target._lazybgset) {
          return;
        }
        var image = e2.target;
        var elem = image._lazybgset;
        var bg = image.currentSrc || image.src;
        if (bg) {
          var useSrc = regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg;
          var event = lazySizes.fire(elem, "bgsetproxy", {
            src: bg,
            useSrc,
            fullSrc: null
          });
          if (!event.defaultPrevented) {
            elem.style.backgroundImage = event.detail.fullSrc || "url(" + event.detail.useSrc + ")";
          }
        }
        if (image._lazybgsetLoading) {
          lazySizes.fire(elem, "_lazyloaded", {}, false, true);
          delete image._lazybgsetLoading;
        }
      };
      addEventListener("lazybeforeunveil", function(e2) {
        var set, image, elem;
        if (e2.defaultPrevented || !(set = e2.target.getAttribute("data-bgset"))) {
          return;
        }
        elem = e2.target;
        image = document2.createElement("img");
        image.alt = "";
        image._lazybgsetLoading = true;
        e2.detail.firesLoad = true;
        createPicture(set, elem, image);
        setTimeout(function() {
          lazySizes.loader.unveil(image);
          lazySizes.rAF(function() {
            lazySizes.fire(image, "_lazyloaded", {}, true, true);
            if (image.complete) {
              proxyLoad({target: image});
            }
          });
        });
      });
      document2.addEventListener("load", proxyLoad, true);
      window2.addEventListener("lazybeforesizes", function(e2) {
        if (e2.detail.instance != lazySizes) {
          return;
        }
        if (e2.target._lazybgset && e2.detail.dataAttr) {
          var elem = e2.target._lazybgset;
          var bgSize = getBgSize(elem);
          if (allowedBackgroundSize[bgSize]) {
            e2.target._lazysizesParentFit = bgSize;
            lazySizes.rAF(function() {
              e2.target.setAttribute("data-parent-fit", bgSize);
              if (e2.target._lazysizesParentFit) {
                delete e2.target._lazysizesParentFit;
              }
            });
          }
        }
      }, true);
      document2.documentElement.addEventListener("lazybeforesizes", function(e2) {
        if (e2.defaultPrevented || !e2.target._lazybgset || e2.detail.instance != lazySizes) {
          return;
        }
        e2.detail.width = proxyWidth(e2.target._lazybgset);
      });
    });
  });

  // ns-hugo:/Users/regisphilibert/Boulot/tnd/sophiamcclennen.com/assets/js/forms.js
  var formScripts = {
    contact: function() {
      let selectReason = document.querySelector('[name="reason"]');
      selectReason.addEventListener("change", (event) => {
        console.log(`You chose ${selectReason.value} as a Reason`);
      });
    }
  };
  var forms = document.querySelectorAll("form[data-js-use]");
  Array.prototype.forEach.call(forms, function(form, i2) {
    let toUse = form.getAttribute("data-js-use");
    if (typeof formScripts[toUse] == "function") {
      formScripts[toUse]();
    }
  });

  // ns-hugo:/Users/regisphilibert/Boulot/tnd/sophiamcclennen.com/assets/js/lazysizes.js
  var lazysizes = require_lazysizes();
  var noscript = require_ls_noscript();
  var bgset = require_ls_bgset();

  // node_modules/quicklink/dist/quicklink.mjs
  function n(n2) {
    return new Promise(function(e2, t2, r2) {
      (r2 = new XMLHttpRequest()).open("GET", n2, r2.withCredentials = true), r2.onload = function() {
        r2.status === 200 ? e2() : t2();
      }, r2.send();
    });
  }
  var e;
  var t = (e = document.createElement("link")).relList && e.relList.supports && e.relList.supports("prefetch") ? function(n2) {
    return new Promise(function(e2, t2, r2) {
      (r2 = document.createElement("link")).rel = "prefetch", r2.href = n2, r2.onload = e2, r2.onerror = t2, document.head.appendChild(r2);
    });
  } : n;
  var r = window.requestIdleCallback || function(n2) {
    var e2 = Date.now();
    return setTimeout(function() {
      n2({didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - e2));
      }});
    }, 1);
  };
  var o = new Set();
  function i(n2) {
    if (n2 || (n2 = {}), window.IntersectionObserver) {
      var e2 = function(n3) {
        n3 = n3 || 1;
        var e3 = [], t3 = 0;
        function r2() {
          t3 < n3 && e3.length > 0 && (e3.shift()(), t3++);
        }
        return [function(n4) {
          e3.push(n4) > 1 || r2();
        }, function() {
          t3--, r2();
        }];
      }(n2.throttle || 1 / 0), t2 = e2[0], i2 = e2[1], u = n2.limit || 1 / 0, a = n2.origins || [location.hostname], f = n2.ignores || [], s = n2.timeoutFn || r, l = new IntersectionObserver(function(e3) {
        e3.forEach(function(e4) {
          e4.isIntersecting && (l.unobserve(e4 = e4.target), o.size < u && t2(function() {
            c(e4.href, n2.priority).then(i2).catch(function(e5) {
              i2(), n2.onError && n2.onError(e5);
            });
          }));
        });
      });
      return s(function() {
        (n2.el || document).querySelectorAll("a").forEach(function(n3) {
          a.length && !a.includes(n3.hostname) || function n4(e3, t3) {
            return Array.isArray(t3) ? t3.some(function(t4) {
              return n4(e3, t4);
            }) : (t3.test || t3).call(t3, e3.href, e3);
          }(n3, f) || l.observe(n3);
        });
      }, {timeout: n2.timeout || 2e3}), function() {
        o.clear(), l.disconnect();
      };
    }
  }
  function c(e2, r2, i2) {
    if (!(i2 = navigator.connection) || !i2.saveData && !/2g/.test(i2.effectiveType))
      return Promise.all([].concat(e2).map(function(e3) {
        if (!o.has(e3))
          return o.add(e3), (r2 ? function(e4) {
            return window.fetch ? fetch(e4, {credentials: "include"}) : n(e4);
          } : t)(new URL(e3, location.href).toString());
      }));
  }

  // ns-hugo:/Users/regisphilibert/Boulot/tnd/sophiamcclennen.com/assets/js/quicklink.js
  i({
    ignores: [
      /\/api\/?/,
      (uri) => uri.includes(".zip"),
      (uri) => uri.includes(".pdf"),
      (uri, elem) => elem.hasAttribute("noprefetch")
    ]
  });

  // ns-hugo:/Users/regisphilibert/Boulot/tnd/sophiamcclennen.com/assets/js/nojs.js
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, "js");
})();
