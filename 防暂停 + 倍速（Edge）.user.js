// ==UserScript==
// @name         防暂停 + 倍速（Edge）
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  防暂停 + 1.5倍速
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  ;['blur', 'visibilitychange', 'pagehide'].forEach(name => {
    window.addEventListener(name, e => {
      e.stopImmediatePropagation()
      e.stopPropagation()
    }, true)
  })

  const SPEED = 3

  setInterval(() => {
    document.querySelectorAll('video').forEach(v => {
      if (v.playbackRate !== SPEED) {
        v.playbackRate = SPEED
      }
      if (v.paused && v.readyState >= 2) {
        v.play().catch(() => {})
      }
    })
  }, 800)
})()